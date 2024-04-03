<template>
  <div class="parent">
    <MainLayout>
    <!-- <HomeView/> -->
    <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";

export default {
  name: "App",
  components: {
    MainLayout,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
.primary{
  background-color: #2980b9;
}
.info{
  background-color: #f1c40f;
}
.dangerous{
  background-color: #e74c3c;
}
.btn {
  width: auto;
  padding: 5px 10px;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
