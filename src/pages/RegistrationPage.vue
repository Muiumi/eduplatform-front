<script>

import {defineComponent} from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: {Footer, Header}
})
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
            <div class="row mb-3 justify-content-center fw-bold">
              <div class="col-lg-2">
                <label for="inputSurname" class="col-form-label">Фамилия:</label>
              </div>
              <div class="col-lg-3">
                <input type="text" class="form-control" id="inputSurname">
              </div>
              <div class="col-lg-2">
                <label for="inputName" class="col-form-label fw-bold">Имя:</label>
              </div>
              <div class="col-lg-3">
                <input type="text" class="form-control" id="inputName">
              </div>
            </div>
            <div class="row mt-3">
              <button type="button" class="btn btn-primary">Зарегистрироваться</button>
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