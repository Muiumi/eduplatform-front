<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {globalStorageAccess} from "@/globalStorageAccess";
import PlainCard from "@/components/PlainCard.vue";

export default {
  name: "UserAccount",
  mixins: [globalStorageAccess],
  components: {PlainCard, Footer, Header},
  data() {
    return {
      userCourses: [],
    }
  },
  beforeMount() {
    this.getUserCourses();
  },
  methods: {
    getUserCourses() {
      fetch(`${this.$eduPlatformApi}/users/courses`, {
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.userCourses = responseContent;
          })
          .catch((exception => {
                console.error(`Ошибка при получении данных: ${exception}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              })
          );
    },
  }
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
                <div class="form-control mb-2"> {{ this.currentUser.firstName }}</div>
                <span class="form-label">Фамилия:</span>
                <div class="form-control mb-2">{{ this.currentUser.lastName }}</div>
                <span class="form-label">email:</span>
                <div class="form-control mb-2"> {{ this.currentUser.email }}</div>
              </div>
            </div>
          </div>
          <div class="p-3 flex-sm-grow-1">

            <b-tabs content-class="mt-3" class="container bg-light p-4 mt-lg-1 mb-lg-1 rounded-3" pills justified
                    small>
              <b-tab title="Я - Студент">
                <b-card class="border border-primary p-3 rounded-3 mb-3" no-body>
                  <div>
                    <b-tabs small pills card>
                      <b-tab title="Мои курсы" active >
                        <b-card-text>
                          <plain-card v-for="course in userCourses"
                                      :key="course.id"
                                      :object="course"
                                      :only-for-personal-account="true"
                                      class=""
                          >
                          </plain-card>
                        </b-card-text>

                      </b-tab>
                      <b-tab title="Мои ответы" lazy>
                        <b-card-text>Tab contents 2</b-card-text>
                      </b-tab>
                    </b-tabs>
                  </div>
                </b-card>
              </b-tab>
              <b-tab title="Я - Ментор">
                <div>
                  <b-card class="border border-primary p-3 rounded-3 mb-3" no-body>
                    <b-tabs small pills>
                      <b-tab title="Ответы студентов за все курсы" active>
                        <b-card-text>Tab contents 1</b-card-text>
                      </b-tab>
                      <b-tab title="Ответы студентов за все уроки" lazy>
                        <b-card-text>Tab contents 2</b-card-text>
                      </b-tab>
                    </b-tabs>
                  </b-card>

                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>


      </div>
    </div>
    <Footer/>
  </div>
</template>

<style>

</style>