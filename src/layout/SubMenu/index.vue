<template>
  <template v-if="!item.isHide">
    <!-- 没有子路由 -->
    <template v-if="!item.children && item.meta">
      <el-menu-item :index="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 大于1个子路由 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归组件 -->
        <SubMenu v-for="child in item.children" :key="child.path" :item="child"></SubMenu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup name="SubMenu">
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
