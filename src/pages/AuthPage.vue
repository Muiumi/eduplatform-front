<script>
import SearchPanel from "@/components/SearchPanel.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";

export default {
  name: "AuthPage",
  computed: {
    RegistrationPage() {
      return RegistrationPage
    }
  },
  components: {Footer, Header, SearchPanel},
}

</script>

<template>
  <div class="root background">
    <Header></Header>
    <div class="row justify-content-center text-center">
      <div class="col-sm-5">
        <div class="container-sm rounded-3 p-3 m-3 bg-light bg-opacity-25">
          <h2 class="mb-4">Авторизация</h2>
          <div class="row g-2 m-3 justify-content-center ">
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-lg-2">
                <label for="emailInput" class="col-form-label">Email:</label>
              </div>
              <div class="col-lg-8">
                <input type="email" id="emailInput" class="form-control" aria-describedby="emailHelpInline">
              </div>
            </div>
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-lg-2">
                <label for="passwordInput" class="col-form-label">Пароль:</label>
              </div>
              <div class="col-lg-8">
                <input type="password" id="passwordInput" class="form-control" aria-describedby="passwordHelpInline">
              </div>
            </div>
            <div class="row mt-3">
              <button type="button" class="btn btn-primary">Войти</button>
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