<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UserAccount",
  components: {Footer, Header},
}

</script>

<template>
  <div class="root">
    <Header/>
    <div class="row justify-content-center">
      <div class="col-sm-9">
        <div class="d-sm-flex align-items-baseline rounded-3 m-lg-3 bg-light bg-opacity-25">
          <div class="p-3">
            <div class="container bg-light p-4 mt-lg-1 mb-lg-1 rounded-3">
              <h3>Информация о пользователе</h3>
              <div class="border border-primary bg-primary-subtle p-3 rounded-3 mb-3">
                <span class="form-label">Имя:</span>
                <div class="form-control mb-2">Иван</div>
                <span class="form-label">Фамилия:</span>
                <div class="form-control mb-2">Иванов</div>
                <span class="form-label">email:</span>
                <div class="form-control mb-2">test@test.ru</div>
              </div>
            </div>
          </div>
          <div class="p-3 flex-sm-grow-1">
            <div class="container bg-light p-4 mt-lg-1 mb-lg-1 rounded-3">
              <h3>Мой прогресс</h3>
              <div>
                  <b-tabs class="border border-primary bg-primary-subtle p-3 rounded-3 mb-3" pills small>
                    <b-tab title="Студенчество" active>
                      <b-card-text>Tab contents 1</b-card-text>
                    </b-tab>
                    <b-tab title="Менторство">
                      <b-card-text>Tab contents 2</b-card-text>
                    </b-tab>
                  </b-tabs>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <Footer/>
  </div>
</template>

<style>

</style>