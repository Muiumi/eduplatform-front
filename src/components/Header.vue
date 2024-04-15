<script>
export default {
  name: "Header",
  methods: {
    goToMain() {
      if (this.$route.name !== "MainPage" && this.$route.name !== "AuthPage" && this.$route.name !== "RegistrationPage") {
        this.$router.push('/');
      }
    }
  },
  computed: {
    getUserFullName() {
      return `${this.$globalStorage.currentUser.lastName} ${this.$globalStorage.currentUser.firstName}`;
    }
  },
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md mb-2">
      <div class="container-fluid">
        <a href="#" class="navbar-brand text-light fs-3 stretched-link" @click="goToMain">
          <img src="../assets/logo.png" width="50rem" height="50rem" alt="EduPlatform">
          Образовательная платформа
        </a>
        <p>Добро пожаловать, {{ getUserFullName }}</p>
        <div class="navbar-nav">
          <a class="nav-link bg-body rounded-3" aria-current="page" href="#">Личный кабинет</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
.stretched-link {
  position: relative;
}

</style>