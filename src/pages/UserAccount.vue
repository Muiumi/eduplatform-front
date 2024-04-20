<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {SYSTEM_ROLES} from "@/globalStorage";
import {globalStorageAccess} from "@/globalStorageAccess";
import PlainCard from "@/components/PlainCard.vue";
import StudentAnswerCard from "@/components/StudentAnswerCard.vue";

export default {
  name: "UserAccount",
  mixins: [globalStorageAccess],
  components: {StudentAnswerCard, PlainCard, Footer, Header},
  data() {
    return {
      userCourses: [],
      mentorCourses: [],
      completedStudentTasks: [],
      studentsAnswers: [],
      onlyNotReviewedAnswers: false,
    }
  },

  beforeMount() {
    this.getUserCourses();
    if (this.currentUser.role === SYSTEM_ROLES.ROLE_MENTOR) {
      this.getMentorCourses();
    }
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
                console.error(`Ошибка при получении данных: ${exception.message}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              })
          );
    },
    getMentorCourses() {
      fetch(`${this.$eduPlatformApi}/mentors/courses`, {
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.mentorCourses = responseContent;
          })
          .catch((exception => {
                console.error(`Ошибка при получении данных: ${exception.message}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              })
          );
    },
    getUserAnswers() {
      fetch(`${this.$eduPlatformApi}/students`, {
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.completedStudentTasks = responseContent;
          })
          .catch((exception => {
                console.error(`Ошибка при получении данных: ${exception.message}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              })
          );
    },
    getAllStudentsAnswersForAllYourCourses() {
      fetch(`${this.$eduPlatformApi}/mentors`, {
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.studentsAnswers = responseContent;
          })
          .catch((exception => {
                console.error(`Ошибка при получении данных: ${exception.message}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              })
          );
    },
  },
  computed: {
    SYSTEM_ROLES() {
      return SYSTEM_ROLES
    },
    filteredStudentAnswers() {
      if (this.onlyNotReviewedAnswers) {
        return this.studentsAnswers.filter(answer => answer.grade == null && answer.mentorAnswer == null);
      }
      return this.studentsAnswers;
    }
  },
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
              <h3>Пользователь:</h3>
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
                    <b-tabs small pills card fill>
                      <b-tab title="Мои курсы" active >
                        <b-card-text>
                          <plain-card v-for="course in userCourses"
                                      :key="course.id"
                                      :object="course"
                                      :only-for-personal-account="true"
                                      @re
                          >
                          </plain-card>
                        </b-card-text>
                      </b-tab>
                      <b-tab title="Мои ответы" @click="getUserAnswers" lazy>
                        <b-card-text>
                          <student-answer-card v-for="task in completedStudentTasks"
                                               :key="task.id"
                                               :student-attempt="task"
                                               :for-mentor-review="false"
                          >
                          </student-answer-card>
                        </b-card-text>
                      </b-tab>
                    </b-tabs>
                  </div>
                </b-card>
              </b-tab>
              <b-tab title="Я - Ментор" v-if="currentUser.role === SYSTEM_ROLES.ROLE_MENTOR">
                <div>
                  <b-card class="border border-primary p-3 rounded-3 mb-3" no-body>
                    <b-tabs small pills card fill>
                      <b-tab title="Курсы, доступные для менторства" active>
                        <b-card-text>
                          <plain-card v-for="course in mentorCourses"
                                      :key="course.id"
                                      :object="course"
                                      :only-for-personal-account="true"
                          >
                          </plain-card>
                        </b-card-text>
                      </b-tab>
                      <b-tab title="Ответы студентов за все курсы" lazy @click="getAllStudentsAnswersForAllYourCourses">
                        <b-card-text>
                          <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="needToReviewCheckbox"
                                   v-model="onlyNotReviewedAnswers" @click="onlyNotReviewedAnswers = !onlyNotReviewedAnswers">
                            <label class="form-check-label" for="needToReviewCheckbox">
                              Отображать только те задания, которые ещё не были проверены
                            </label>
                          </div>

                          <student-answer-card v-for="studentAnswer in filteredStudentAnswers"
                                               :key="studentAnswer.id"
                                               :student-attempt="studentAnswer"
                                               :for-mentor-review="true"
                                               @review-success="getAllStudentsAnswersForAllYourCourses"
                          >
                          </student-answer-card>
                        </b-card-text>
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