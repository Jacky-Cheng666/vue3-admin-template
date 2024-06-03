<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryRef" v-show="showSearch" label-width="68px" inline>
      <el-form-item label="用户名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download">导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="用户编号" align="center" prop="userId" v-if="columns[0].visible" />
      <el-table-column label="用户名称" align="center" prop="username" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <el-table-column label="用户昵称" align="center" prop="desc" v-if="columns[2].visible" :show-overflow-tooltip="true" />
      <el-table-column label="部门" align="center" prop="dept" v-if="columns[3].visible" :show-overflow-tooltip="true" />
      <el-table-column label="手机号码" align="center" prop="phonenumber" v-if="columns[4].visible" width="120" />
      <el-table-column label="状态" align="center" v-if="columns[5].visible">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="170"></el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top" v-if="scope.row.userId !== 1">
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" v-if="scope.row.userId !== 1">
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="重置密码" placement="top" v-if="scope.row.userId !== 1">
            <el-button link type="primary" icon="Key" @click="handleResetPwd(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="分配角色" placement="top" v-if="scope.row.userId !== 1">
            <el-button link type="primary" icon="CircleCheck" @click="handleAuthRole(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue';
import { userListAPI } from '@/api/acl/user/index';
import { ElMessage, ElMessageBox } from 'element-plus';

const showSearch = ref(true);
const dateRange = ref([]);
const userList = ref([]);
const loading = ref(false);
const total = ref(0);
// 列显隐信息
const columns = ref([
  { key: 0, label: `用户编号`, visible: true },
  { key: 1, label: `用户名称`, visible: true },
  { key: 2, label: `用户昵称`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true },
  { key: 5, label: `状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true },
]);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
  },
});

const { queryParams } = toRefs(data);

const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
const resetQuery = () => {};
const getList = async () => {
  loading.value = true;
  const res = await userListAPI();
  loading.value = false;
  userList.value = res.rows;
  total.value = res.total;
};
const handleSelectionChange = () => {};

/** 角色状态修改 */
function handleStatusChange(row) {
  let text = row.status === 0 ? '停用' : '启用';
  ElMessageBox.confirm('确认要"' + text + '""' + row.username + '"用户吗?', '警告', {
    type: 'warning',
  })
    .then(function () {
      ElMessage.success('操作成功');
      getList();
    })
    .catch(() => {});
}

const handleResetPwd = (row) => {
  ElMessageBox.prompt('请输入"' + row.username + '"的新密码', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: '用户密码长度必须介于 5 和 20 之间',
  })
    .then(() => {
      ElMessage.success('修改成功');
      getList();
    })
    .catch(() => {});
};

const handleDelete = (row) => {
  ElMessageBox.confirm('确认要删除该用户吗?', '警告', {
    type: 'warning',
  })
    .then(function () {
      ElMessage.success('操作成功');
      userList.value = userList.value.filter((t) => row.userId !== t.userId);
    })
    .catch(() => {});
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
