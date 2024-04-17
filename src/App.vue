<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "App",
  mixins: [globalStorageAccess],

  mounted() {
    const user = this.currentUser;
    const userData = JSON.parse(localStorage.getItem("userData"));
    Object.assign(user, userData);
    this.currentUser.setAccessToken(this.$cookies.get("accessToken"));
    this.currentUser.setRefreshToken(this.$cookies.get("refreshToken"));
  },
}
</script>

<template>
  <router-view></router-view>
</template>
<style></style>
