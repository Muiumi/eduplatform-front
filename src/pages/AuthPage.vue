<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "AuthPage",
  components: {Footer, Header},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    }
  },
  methods: {
    login() {
      const signInRequest = {
        email: this.user.email,
        password: this.user.password,
      }
      fetch(`${this.$eduPlatformApi}/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInRequest),
      })
          .then(response => response.json())
          .then(responseContent => {
            this.parseAuthResponse(responseContent);
            console.info(`Пользователь ${this.user.email} авторизовался.`);
            setTimeout(() => {
              this.$router.push("/");
            }, 3000);
          })
          .catch(exception => {
                console.error(`Ошибка при авторизации пользователя: ${exception}`);
                // TODO сделать уведомление для пользователя?
              }
          )
    },
    parseAuthResponse(content) {
      let user = this.$globalStorage.currentUser;
      user.setEmail(content.email);
      user.setFirstName(content.firstName);
      user.setLastName(content.lastName);
      user.setRole(content.role);

      const expDateAccess = new Date(content.accessExpiration);
      const refreshDateAccess = new Date(content.refreshExpiration);

      this.$cookies.set("accessToken", `${content.accessToken}`, expDateAccess);
      this.$cookies.set("refreshToken", `${content.refreshToken}`, refreshDateAccess);
    }
  },
}

</script>

<template>
  <div class="root background">
    <Header></Header>
    <div class="row justify-content-center text-center">
      <div class="col-sm-5">
        <div class="container-sm rounded-3 p-3 m-3 bg-light bg-opacity-25">
          <h2 class="mb-4">Авторизация</h2>
          <div class="row g-2 m-3 justify-content-center">
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-sm-2">
                <label for="emailInput" class="col-form-label">Email:</label>
              </div>
              <div class="col-sm-8">
                <input type="email" id="emailInput" class="form-control" aria-describedby="emailHelpInline"
                       v-model="user.email">
              </div>
            </div>
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-sm-2">
                <label for="passwordInput" class="col-form-label">Пароль:</label>
              </div>
              <div class="col-sm-8">
                <input type="password" id="passwordInput" class="form-control" aria-describedby="passwordHelpInline"
                       v-model="user.password">
              </div>
            </div>
            <div class="row mt-3">
              <button type="button" class="btn btn-primary" @click="login">Войти</button>
            </div>
            <p class="small mt-2 pt-1 mb-0">
              Нет аккаунта?
              <a class="link-danger" @click="$router.push('/register')">Зарегистрироваться</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>