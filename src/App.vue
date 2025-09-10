<!-- <template>
  <div id="app">
    <h1>Fertilizer Recommendation System</h1>
    <FertilizerForm />
  </div>
</template> -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import FertilizerForm from "./components/FertilizerForm.vue";

// export default {
//   components: { FertilizerForm },
// };
export default {
  name: "App"
};
</script>

<style>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 50px;
}
</style>
