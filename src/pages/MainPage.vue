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
  // mounted() {
  //   fetch('http://localhost:8081/api/v1/category')
  //       .then(response => response.json())
  //       .then(data => {
  //         this.courses = data
  //       })
  //
  // },
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "Java-developer",
          description: "На этом курсе вы прокачаетесь до уровня Senior Java Developer и будете самым крутым разработчиком в компании.",
          category: "BACKEND",
          duration: 150,
          difficult_level: "HARD"
        },
        {
          id: 2,
          title: "Python-developer",
          description: "Этот курс для любителей синтаксического сахара.",
          category: "BACKEND",
          duration: 86,
          difficult_level: "EASY"
        },
        {
          id: 3,
          title: "Kotlin-developer",
          description: "На этом курсе вы забудете язык Java.",
          category: "BACKEND",
          duration: 124,
          difficult_level: "MEDIUM"
        },
        {
          id: 5,
          title: "Основы веб-разработки JavaScript и TypeScript",
          description: "Это база это знать надо для Frontend-разработки.",
          category: "FRONTEND",
          duration: 100,
          difficult_level: "MEDIUM"
        },
        {
          id: 6,
          title: "DevOps-инженер",
          description: "Этот курс позволит вам взглянуть с другой стороны на разработку.",
          category: "DEVOPS",
          duration: 128,
          difficult_level: "HARD"
        },
        {
          id: 4,
          title: "Основы вёрстки HTML&CSS",
          description: "На этом курсе будем красить кнопочки.",
          category: "FRONTEND",
          duration: 60,
          difficult_level: "EASY"
        },
      ],
    }
  },
  computed: {
    coursesByCategories() {
      const categorized = {};
      this.courses.forEach(
          course => {
            if (!categorized[course.category]) {
              categorized[course.category] = [];
            }
            categorized[course.category].push(course);
          }
      );
      return categorized;
    }
  }
}

</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-6">
        <!--TODO Имена категорий не изменяют размеры-->
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25"
             v-for="(courses, category) in coursesByCategories"
             :key="category"
        >
          <h2 class="text-light-emphasis mb-3"> {{ category }}</h2>
          <plain-card :objects="courses" :key="category"/>
        </div>
      </div>
      <div class="col-2">
        <search-panel></search-panel>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style>
</style>