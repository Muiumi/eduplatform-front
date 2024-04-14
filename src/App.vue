<script>
export default {
  name: "App",

  mounted() {
    const user = this.$globalStorage.currentUser;
    const userData = JSON.parse(localStorage.getItem("userData"));
    Object.assign(user, userData);
  }

}
</script>

<template>
  <router-view></router-view>
</template>
<style></style>
