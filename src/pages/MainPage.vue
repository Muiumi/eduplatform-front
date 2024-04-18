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

  data() {
    return {
      categories: [],
      courses: [],
      userCourses: [],
      objectToSearch: '',
      chosenCategoryId: null,
    }
  },

  beforeMount() {
    this.getAllCategories();
    this.showCategoryCourses(1);
    this.getUserCourses();
  },

  watch: {
    courses(loadedCourses) {
      this.searchAssist.setItemsToSearch(loadedCourses);
      this.searchAssist.setSearchResult(loadedCourses);
      this.findCourse(this.objectToSearch);
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
    getCategoryCourses(categoryId) {
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

    findCourse(searchItem) {
      this.objectToSearch = searchItem;
      const itemsList = this.searchAssist.itemsToSearch;
      this.searchAssist.setSearchResult(itemsList.filter(object => object.title.toLowerCase().includes(this.objectToSearch.toLowerCase())));
    },

    isThisCategoryChosen(categoryId) {
      return this.chosenCategoryId === categoryId;
    },

    showCategoryCourses(categoryId) {
      if (this.isThisCategoryChosen(categoryId)) {
        return;
      }
      this.chosenCategoryId = categoryId;
      this.getCategoryCourses(categoryId);
    }
  },
}

</script>

<template>
  <div class="root">
    <Header/>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="container-sm rounded-3 p-3 bg-light bg-opacity-25">
          <div class="card-header fw-bold">
            <label class="form-label text-uppercase fs-2 fw-semibold">Категории платформы</label>
          </div>
          <div class="container text-center">
            <div class="row row-cols-lg-4 gap-3 justify-content-center">
              <button type="button"
                      v-for="category in categories"
                      :key="category.id"
                      :disabled="chosenCategoryId === category.id"
                      :class="[(isThisCategoryChosen(category.id)) ? 'btn btn-outline-primary': 'btn btn-primary']"
                      @click="showCategoryCourses(category.id)">
                {{ category.title }}
              </button>
            </div>
          </div>
        </div>
        <div class="container-sm rounded-3 p-3 mt-3 bg-light bg-opacity-25" v-show="chosenCategoryId != null">
          <plain-card v-for="course in this.searchAssist.searchResult"
                      :key="course.id"
                      :object="course"
                      :user-courses="userCourses"
                      :only-for-personal-account="false"
          >
          </plain-card>
        </div>
      </div>
      <div class="col-2">
        <search-panel @search="findCourse"></search-panel>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style>
</style>