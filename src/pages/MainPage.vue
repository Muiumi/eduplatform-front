<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PlainCard from "@/components/PlainCard.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "MainPage",
  components: {PlainCard, Footer, Header, SearchPanel},
  mixins: [globalStorageAccess],
  mounted() {
    this.getAllCategories();
    this.showCategoryCourses();
  },
  data() {
    return {
      categories: [],
      courses: [],
      filteredCourses: [],
      isCategoryChosen: false,
    }
  },
  methods: {
    getAllCategories() {
      fetch(`${this.$eduPlatformApi}/category`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(data => {
            this.categories = data
          })
          .catch(exception => {
                console.error(`Ошибка при получении данных: ${exception}`);
                this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                  variant: "danger"
                })
              }
          )
    },
    showCategoryCourses(categoryId = 1) {
      fetch(`${this.$eduPlatformApi}/category/${categoryId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
      })
          .then(response => response.json())
          .then(data => {
            this.courses = data
            this.isCategoryChosen = true;
          })
          .catch((exception => {
                    console.error(`Ошибка при получении данных: ${exception}`);
                    this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                      variant: "danger"
                    })
                  }
              )
          )
    },
    findCourse(searchItem) {
      if (searchItem !== null) {
        this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(searchItem.toLowerCase()));
      } else {
        this.filteredCourses = this.courses;
      }
    }
  },
}

</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="container-sm rounded-3 p-3 bg-light bg-opacity-25">
          <div class="card-header fw-bold">
            <label class="form-label text-uppercase fs-2 fw-semibold">Категории платформы</label>
          </div>
          <div class="container text-center">
            <div class="row row-cols-lg-4 gap-3 justify-content-center">
              <button class="btn btn-primary" type="button"
                      v-for="category in categories"
                      :key="category.id" @click="showCategoryCourses(category.id)">
                {{ category.title }}
              </button>
            </div>
          </div>
        </div>
        <div class="container-sm rounded-3 p-3 mt-3 bg-light bg-opacity-25" v-show="isCategoryChosen">
          <plain-card v-for="(course, index) in filteredCourses"
                      :key="index" :object="course"
          >
          </plain-card>
        </div>
      </div>
      <div class="col-2">
        <search-panel @search="findCourse"></search-panel>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style>
</style>