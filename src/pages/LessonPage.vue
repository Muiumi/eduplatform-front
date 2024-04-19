<script>
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import StudentAnswerCard from "@/components/StudentAnswerCard.vue";
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "LessonPage",
  components: {Header, Footer, PlainCard, StudentAnswerCard},
  mixins: [globalStorageAccess],
  data() {
    return {
      studentAnswer: "",
      mentorAnswer: "",
      lessonFile: "",
      isTaskVisible: false,
      task: null,
      previousAnswers: [],
    }
  },
  beforeMount() {
    if (!this.currentLesson.id) {
      const lessonFromSession = JSON.parse(sessionStorage.getItem("currentLesson"));
      Object.assign(this.currentLesson, lessonFromSession);
    }
    this.getTaskForLesson();
    this.getPreviousAnswer();
    if (this.currentLesson.referenceOnFile) {
      this.getLessonMaterials();
    }
  },
  methods: {
    showModal() {
      this.$refs['changeAnswerModal'].show();
    },

    getTaskForLesson() {
      fetch(`${this.$eduPlatformApi}/tasks/${this.currentLesson.taskId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.task = responseContent;
          })
          .catch((exception => {
                console.error(`Ошибка при получении данных: ${exception}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              })
          );
    },

    getPreviousAnswer() {
      fetch(`${this.$eduPlatformApi}/students/lesson/${this.currentLesson.id}`, {
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(responseContent => {
            this.previousAnswers = responseContent;
          })
          .catch(exception => {
            console.error(`Ошибка при получение заданий пользователя: ${exception}`);
            this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
              variant: "danger"
            })
          });
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
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
        body: JSON.stringify(studentAnswerRequest)
      })
          .then(response => {
            if (response.ok) {
              this.getPreviousAnswer();
              this.$bvToast.toast("Ответ отправлен на проверку.", {
                variant: "success"
              })
              console.log(`Пользователь ${this.currentUser.email} успешно отправил ответ на задание к уроку ${this.currentLesson.id}`)
            } else {
              throw new Error("Некорректный ввод")
            }
          })
          .catch(exception => {
            console.error(`Ошибка при отправке задания пользователя: ${exception}`);
            this.$bvToast.toast(`Произошла ошибка при отправке решения: ${exception} `, {
              variant: "danger"
            })
          })
    },

    changeAnswerWithModal() {
      this.changeStudentAnswer();
      this.$refs['changeAnswerModal'].hide();
    },

    changeStudentAnswer() {
      const requestToChangeAnswer = {
        studentAnswer: this.studentAnswer,
      };
      fetch(`${this.$eduPlatformApi}/students/lesson/${this.lastTry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
        body: JSON.stringify(requestToChangeAnswer)
      })
          .then(response => {
            if (response.ok) {
              this.getPreviousAnswer();
              this.$bvToast.toast("Ответ успешно изменён.", {
                variant: "success"
              })
              console.log(`Пользователь ${this.currentUser.email} успешно изменил свой ответ на задание к уроку ${this.currentLesson.id}`)
            } else {
              throw new Error("Пользователь не является студентом курса этого урока")
            }
          })
          .catch(exception => {
            console.error(`Ошибка при отправке задания пользователя: ${exception}`);
            this.$bvToast.toast("Произошла ошибка при изменении ответа. Повторите попытку позже", {
              variant: "danger"
            })
          });
    },

    getLessonMaterials() {
      fetch(`${this.$minioApi}/object/${this.currentLesson.referenceOnFile}`, {
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => {
            if (response.ok) {
              return response.blob();
            }
            throw new Error('Ошибка загрузки файла.');
          })
          .then(blob => {
            this.lessonFile = URL.createObjectURL(blob);
          })
          .catch(exception => {
            console.error(`Ошибка при загрузке доп. материалов к уроку: ${exception}`);
            this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
              variant: "danger"
            })
          });
    },
    getFileExtension(fileName) {
      if (fileName) {
        return fileName.split('.').pop();
      }
      return null;
    },
  },
  computed: {
    lastTry() {
      return this.previousAnswers[this.previousAnswers.length-1];
    },

    checkIfUserCanSendNewAnswer() {
      return this.previousAnswers.length === 0 || this.lastTry.rework;
    },

    checkIfUserCanChangeHisAnswer() {
      if (!this.checkIfUserCanSendNewAnswer) {
        return this.lastTry.mentorAnswer == null || this.lastTry.grade == null;
      }
    },

    getStudentGrade() {
      return (this.lastTry == null || this.lastTry.grade == null) ? "Пока не оценено" : this.lastTry.grade;
    },

    isFileAVideo() {
      const fileType = this.getFileExtension(this.currentLesson.referenceOnFile);
      return (fileType && (fileType === "mp4" || fileType === "wav"))

    },

    isFileAnImage() {
      const fileType = this.getFileExtension(this.currentLesson.referenceOnFile);
      return (fileType && (fileType === "png" || fileType === "jpg" || fileType === "gif" || fileType === "svg"))
    },
  },
}

</script>

<template>
  <div class="root">
    <Header/>
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
            <div v-if="isFileAnImage" class="text-center">
              <img :src="lessonFile" class="img-thumbnail image">
            </div>
            <div v-if="isFileAVideo" class="text-center">
              <video controls :src="lessonFile" class="object-fit-contain video" autoplay></video>
            </div>
            <div class="container text-center m-lg-2">
              <button type="button" class="btn btn-primary" @click="isTaskVisible = !isTaskVisible">
                Посмотреть задание к уроку
              </button>
            </div>
          </div>
          <div class="container rounded-3 mt-3 p-lg-3 bg-light" v-if="isTaskVisible">
            <h2 class="display-6 m-3">Задание к уроку</h2>
            <hr>
            <div class="m-lg-3">
              {{ task.description }}
              <div class="mt-3" v-if="checkIfUserCanSendNewAnswer">
                <label for="studentAnswer" class="form-label">Ваш ответ:</label>
                <textarea class="form-control" id="studentAnswer" rows="2"
                          v-model="studentAnswer">
                </textarea>
              </div>
              <div class="d-flex mb-lg-3">
                <div class="me-auto p-lg-2">
                  <strong>Текущая оценка:</strong>
                  <p class="display-6 display-7"> {{ getStudentGrade }}</p>
                </div>
                <div class="m-lg-3">
                  <div v-if="checkIfUserCanChangeHisAnswer">
                    <b-button class="btn btn-warning m-lg-2" @click="showModal">Изменить
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
                        <b-button size="sm" variant="success" @click="changeAnswerWithModal">
                          Подтвердить изменения
                        </b-button>
                        <b-button size="sm" variant="danger" @click="cancel()">
                          Отмена
                        </b-button>
                      </template>
                    </b-modal>
                  </div>
                  <button class="btn btn-success m-lg-2" type="button"
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
                <student-answer-card v-for="studentAttempt in previousAnswers"
                                     :key="studentAttempt.id"
                                     :student-attempt="studentAttempt"
                                     :for-mentor-review="false"
                >
                </student-answer-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
.image {
  width: 30rem;
}

.video {
  width: 50rem;
}

.display-7 {
  font-size: 1.5rem;
}
</style>