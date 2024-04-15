<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "Header",
  mixins: [globalStorageAccess],
  methods: {
    // goToMain() {
    //   if (this.$route.name !== "MainPage" && this.$route.name !== "AuthPage" && this.$route.name !== "RegistrationPage") {
    //     this.$router.push('/');
    //   }
    // }
  },
  computed: {
    getUserFullName() {
      return `${this.$globalStorage.currentUser.lastName} ${this.$globalStorage.currentUser.firstName}`;
    },
  },
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md mb-2">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-light fs-3">
          <img src="../assets/logo.png" class="logo" alt="EduPlatform">
          Образовательная платформа
        </router-link>
        <p>Добро пожаловать, {{ getUserFullName }}</p>
        <div class="navbar-nav">
          <router-link to="/user" class="nav-link bg-body rounded-3" aria-current="page">
            Личный кабинет
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
.logo {
  width: 3.5rem;
  height: 3.5rem;
}

</style>