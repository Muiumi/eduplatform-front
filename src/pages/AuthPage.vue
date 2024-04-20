<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "AuthPage",
  components: {Footer, Header},
  mixins: [globalStorageAccess],
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
          .then(response => {
            if (!response.ok) {
              throw new Error("Нет пользователя с таким паролем и email");
            }
            console.info(`Пользователь ${this.user.email} авторизовался.`);
            return response.json();
          })
          .then(responseContent => {
            this.parseAuthResponse(responseContent);
            this.$bvToast.toast(`Вы успешно авторизовались как ${this.currentUser.lastName} ${this.currentUser.firstName}`, {
              variant: "success"
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 3000);
          })
          .catch(exception => {
                this.$bvToast.toast("Неверные почта или пароль, проверьте вводимые данные и попробуйте снова.", {
                  variant: "danger"
                })
                console.error(`Ошибка при авторизации пользователя: ${exception.message}`);
              }
          )
    },
    parseAuthResponse(content) {
      const user = this.currentUser;
      Object.assign(user, content);
      const {firstName, lastName, email, role} = user;
      const dataToStore = {firstName, lastName, email, role};
      localStorage.setItem("userData", JSON.stringify(dataToStore));

      const expDateAccess = new Date(content.accessExpiration);
      const expDateRefresh = new Date(content.refreshExpiration);
      this.$cookies.set("accessToken", `${content.accessToken}`, expDateAccess);
      this.$cookies.set("refreshToken", `${content.refreshToken}`, expDateRefresh);
    }
  },
}

</script>

<template>
  <div class="root background">
    <Header/>
    <div class="row justify-content-center text-center">
      <div class="col-sm-5">
        <div class="container-sm rounded-3 p-3 m-3 bg-light bg-opacity-25">
          <h2 class="mb-4">Авторизация</h2>
          <div class="row g-2 m-3 justify-content-center">
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-xxl-2">
                <label for="emailInput" class="col-form-label">Email:</label>
              </div>
              <div class="col-xxl-8">
                <input type="email" id="emailInput" class="form-control" aria-describedby="emailHelpInline"
                       v-model="user.email">
              </div>
            </div>
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-xxl-2">
                <label for="passwordInput" class="col-form-label">Пароль:</label>
              </div>
              <div class="col-xxl-8">
                <input type="password" id="passwordInput" class="form-control" aria-describedby="passwordHelpInline"
                       v-model="user.password">
              </div>
            </div>
            <div class="row mt-3">
              <button type="button" class="btn btn-primary" @click="login">Войти</button>
            </div>
            <p class="small mt-2 pt-1 mb-0">
              Нет аккаунта?
              <router-link to="/register" class="link-danger">Зарегистрироваться</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style>
</style>