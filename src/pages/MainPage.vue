<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PlainCard from "@/components/PlainCard.vue";
import SearchPanel from "@/components/SearchPanel.vue";

export default {
  name: "MainPage",
  components: {
    PlainCard,
    Footer,
    Header,
    SearchPanel
  },
  mounted() {
    fetch(`${this.$eduPlatformApi}/category`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
      },
    })
        .then(response => response.json())
        .then(data => {
          this.categories = data
        })
        .catch(exception => {
              console.error(`Ошибка при получении данных: ${exception}`);
              // TODO сделать уведомление для пользователя?
            }
        )
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
    showCategoryCourses(categoryId) {
      // this.isCategoryChosen = false;
      // this.courses = [];

      fetch(`${this.$eduPlatformApi}/category/${categoryId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
        },
      })
          .then(response => response.json())
          .then(data => {
            this.courses = data
            this.isCategoryChosen = true;
          })
          .catch((exception => {
                    console.error(`Ошибка при получении данных: ${exception}`);
                    // TODO сделать уведомление для пользователя?
                  }
              )
          )
    },
    findCourse(searchItem) {
      this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(searchItem.toLowerCase()));
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
            <div class="row row-cols-4 gap-3 justify-content-center">
              <button class="btn btn-primary" type="button"
                      v-for="(category, index) in categories"
                      :key="index" @click="showCategoryCourses(index+1)">
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