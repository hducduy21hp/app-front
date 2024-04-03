<template>
    <div class="parent">
    <div class="header">
      <div class="navbar">
        <span>Home</span>
        <span>Employee</span>
        <span>About</span>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
.navbar{
  display: flex
}
.navbar>*{
  padding: 10px 20px;
  font-size: 26px;
}
.content{
  margin: 20px 30px;
}
</style>