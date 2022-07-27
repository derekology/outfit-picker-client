<template>
  <div id="footer">
    <p>
      © {{ currentYear }} Derek Woo - All Rights Reserved | Outfit Picker is a
      <a href="https://wooprojects.com/">woo!project</a> to learn Vue.js.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(), // 2020
    };
  },
};
</script>

<style scoped>
#footer {
  bottom: 0;
  height: 30px;
  background: #ffffff;
  padding: 0px 10px 5px 10px;
}

#footer p {
  font-size: smaller;
  color: #8d8d8d;
}
</style>
