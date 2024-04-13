<script>
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import LessonTaskCard from "@/components/LessonTaskCard.vue";

export default {
  name: "LessonPage",
  components: {LessonTaskCard, Header, Footer, PlainCard},
  data() {
    return {
      studentAnswer: "",
      mentorAnswer: "",
      isTaskVisible: false,
      task: null,
      previousAnswers: [],
    }
  },
  beforeMount() {
    this.getTaskForLesson();
    this.getPreviousAnswer();
  },
  methods: {
    showModal() {
      this.$refs['changeAnswerModal'].show();
    },

    getTaskForLesson() {
      fetch(`${this.$eduPlatformApi}/tasks/${this.currentLesson.taskId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.task = responseContent;
          })
          .catch((exception => {
                console.error(`Ошибка при получении данных: ${exception}`);
                // TODO сделать уведомление для пользователя?
              })
          );
    },

    getPreviousAnswer() {
      fetch(`${this.$eduPlatformApi}/students/lesson/${this.currentLesson.id}`, {
        headers: {
          "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.previousAnswers = responseContent;
          })
          .catch(exception => {
            console.error(`Ошибка при получение заданий пользователя: ${exception}`);
          })
    },

    sendStudentAnswer() {
      const studentAnswerRequest = {
        lessonId: this.currentLesson.id,
        studentAnswer: this.studentAnswer,
      }
      fetch(`${this.$eduPlatformApi}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
        },
        body: JSON.stringify(studentAnswerRequest)
      })
          .then(response => {
            if (response.ok) {
              this.getPreviousAnswer();
              console.log(`Пользователь ${this.currentUser.email} успешно отправил ответ на задание к уроку ${this.currentLesson.id}`)
            } else {
              throw new Error("Ошибка!")
            }
          })
          .catch(exception => {
            console.error(`Ошибка при отправке задания пользователя: ${exception}`);
          })
    },

    changeStudentAnswer() {
      const requestToChangeAnswer = {
        studentAnswer: this.studentAnswer,
      };
      fetch(`${this.$eduPlatformApi}/students/lesson/${this.currentLesson.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
        },
        body: JSON.stringify(requestToChangeAnswer)
      })
          .then(response => {
            if (response.ok) {
              this.getPreviousAnswer();
              console.log(`Пользователь ${this.currentUser.email} успешно изменил свой ответ на задание к уроку ${this.currentLesson.id}`)
            } else {
              throw new Error("Ошибка!")
            }
          })
          .catch(exception => {
            console.error(`Ошибка при отправке задания пользователя: ${exception}`);
          })
    }

  },
  computed: {
    currentLesson() {
      return this.$globalStorage.currentLesson;
    },

    currentUser() {
      return this.$globalStorage.currentUser;
    },

    lastTry() {
      return this.previousAnswers.at(-1);
    },

    checkIfUserCanSendNewAnswer() {
      return this.previousAnswers.length === 0 || this.lastTry.rework;
    },

    checkIfUserCanChangeHisAnswer() {
      if (!this.checkIfUserCanSendNewAnswer) {
        return this.lastTry.mentorAnswer == null;
      }
    },

    getStudentGrade() {
      return (this.lastTry == null || this.lastTry.grade == null) ? "Пока не оценено" : this.lastTry.grade;
    }
  },
}

</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
          <h2 class="text-light-emphasis mb-3">{{ currentLesson.title }}</h2>
          <div class="container rounded-3 p-3 bg-light">
            <h2 class="display-6 m-3">Содержимое урока</h2>
            <hr>
            <div class="m-3">
              {{ currentLesson.description }}
            </div>
            <div class="container text-center m-3">
              <button type="button" class="btn btn-primary" @click="isTaskVisible = !isTaskVisible">
                Посмотреть задание к уроку
              </button>
            </div>
          </div>
          <div class="container rounded-3 mt-3 p-3 bg-light" v-if="isTaskVisible">
            <h2 class="display-6 m-3">Задание к уроку</h2>
            <hr>
            <div class="m-3">
              {{ task.description }}
              <div class="mt-3" v-if="checkIfUserCanSendNewAnswer">
                <label for="studentAnswer" class="form-label">Ваш ответ:</label>
                <textarea class="form-control" id="studentAnswer" rows="2"
                          v-model="studentAnswer">
                </textarea>
              </div>
              <div class="d-flex mb-3">
                <div class="me-auto p-2">
                  <strong>Оценка:</strong>
                  <p class="display-6 display-7"> {{ getStudentGrade }}</p>
                </div>
                <div class="m-3">
                  <b-button class="btn btn-warning m-2" v-if="checkIfUserCanChangeHisAnswer" @click="showModal">Изменить
                    ответ
                  </b-button>
                  <b-modal ref="changeAnswerModal" title="Измение последнего ответа на урок"
                           centered ok-only :header-text-variant="'light'" hide-header-close
                           :header-bg-variant="'primary'">
                    <span class="form-label">Текущий ответ:</span>
                    <div class="form-control mt-3 mb-3">
                      {{ lastTry.studentAnswer }}
                    </div>
                    <span class="form-label">Введите новый ответ:</span>
                    <textarea class="form-control mt-3 mb-3" id="newStudentAnswer" rows="2"
                              v-model="studentAnswer">
                    </textarea>
                    <template #modal-footer="{ ok, cancel}">
                      <b-button size="sm" variant="success" @click="changeStudentAnswer">
                        Подтвердить изменения
                      </b-button>
                      <b-button size="sm" variant="danger" @click="cancel()">
                        Отмена
                      </b-button>
                    </template>
                  </b-modal>
                  <button class="btn btn-success m-2" type="button"
                          v-if="checkIfUserCanSendNewAnswer" @click="sendStudentAnswer">
                    Отправить на провеку
                  </button>
                </div>
              </div>
              <div class="mt-3" v-if="false">
                <label for="mentorAnswer" class="form-label">Комментарий ментора:</label>
                <textarea class="form-control" v-model="mentorAnswer"></textarea>
              </div>
              <div v-if="previousAnswers.length > 0">
                <h4 class="fw-light"> Ваши ответы:</h4>
                <hr>
                <div class="border border-primary bg-primary-subtle p-3 rounded-3 mb-3"
                     v-for="(answer, index) in previousAnswers" :key="index">
                  <span class="form-label">Ваш ответ:</span>
                  <div class="form-control mb-2"> {{ answer.studentAnswer }}</div>
                  <div v-if="answer.mentorsAnswer != null && answer.grade != null">
                    <span class="form-label">Комментарий ментора:</span>
                    <div class="form-control mb-2"> {{ answer.mentorsAnswer }}</div>
                    <div class="d-flex">
                      <div class="me-auto p-2">
                        Оценка: {{ answer.grade }}
                      </div>
                      <div class="p-2">
                        Статус: {{ answer.rework }}
                      </div>
                    </div>
                  </div>
                  <div class="text-danger" v-else>
                    Ментор пока не проверил это задание!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.display-7 {
  font-size: 1.5rem;
}
</style>