<template>
  <div class="result-container">
    <h3>Recommended Fertilizer:</h3>
    <p>{{ data.fertilizer }}</p>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped>
.result-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px dashed #4caf50;
  border-radius: 5px;
}
</style>
