<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "App",
  mixins: [globalStorageAccess],

  mounted() {
    const user = this.currentUser;
    const userData = JSON.parse(localStorage.getItem("userData"));
    Object.assign(user, userData);
  },
}
</script>

<template>
  <router-view></router-view>
</template>
<style></style>
