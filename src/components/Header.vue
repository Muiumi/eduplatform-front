<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "Header",
  mixins: [globalStorageAccess],
  methods: {
    loggedOut() {
      this.currentUser.clearCurrentUser();
      localStorage.removeItem("userData");
      this.$cookies.remove("accessToken");
      this.$cookies.remove("refreshToken");
      this.$router.push("/auth");
    }
  },

  computed: {
    isUserLoggedIn() {
      return this.currentUser.email != null;
    },

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
        <div class="navbar-nav">
          <div class="dropdown-center btn-group" v-if="isUserLoggedIn">
            <router-link to="/user" class="btn btn-primary"> Пользователь {{ getUserFullName }} </router-link>
            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <router-link to="/user" class="dropdown-item">Личный кабинет</router-link>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item" @click="loggedOut">Выйти из системы</button></li>
            </ul>
          </div>
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