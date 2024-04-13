<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "RegistrationPage",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    }
  },
  methods: {
    register() {
      const signUpRequest = {
        firstName: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      }
      fetch(`${this.$eduPlatformApi}/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpRequest),
      })
          .then(response => {
                response.json();
                setTimeout(() => {
                  this.$router.push("/auth");
                }, 3000);
                console.log(`Пользователь ${this.user.email} зарегистрировался в системе.`)
                // TODO сделать уведомление для пользователя?
              }
          )
          .catch(exception => {
                console.error(`Ошибка при регистрации пользователя: ${exception}`);
                // TODO сделать уведомление для пользователя?
              }
          )
    }
  },
  components: {Footer, Header}
}
</script>

<template>
  <div class="root background">
    <Header></Header>
    <div class="row justify-content-center text-center">
      <div class="col-sm-5">
        <div class="container-sm rounded-3 p-3 m-3 bg-light bg-opacity-25">
          <h2 class="mb-4">Регистрация</h2>
          <div class="row g-2 m-3 justify-content-center">
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-xl-2">
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
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-xxl-2">
                <label for="inputSurname" class="col-form-label">Фамилия:</label>
              </div>
              <div class="col-xxl-3">
                <input type="text" class="form-control" id="inputSurname" v-model="user.surname">
              </div>
              <div class="col-xxl-2">
                <label for="inputName" class="col-form-label fw-bold">Имя:</label>
              </div>
              <div class="col-xxl-3">
                <input type="text" class="form-control" id="inputName" v-model="user.firstName">
              </div>
            </div>
            <div class="row mt-3">
              <button type="button" class="btn btn-primary" @click="register">Зарегистрироваться</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style>

</style>