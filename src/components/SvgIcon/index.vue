<template>
  <svg :style="{ width, height }" style="vertical-align: middle">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup>
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '20px',
  },
  height: {
    type: String,
    default: '20px',
  },
  color: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
