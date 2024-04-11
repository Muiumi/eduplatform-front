import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: () => import("@/pages/MainPage.vue")
    },
    {
        path: '/courses/:courseId',
        name: 'CoursePage',
        component: () => import("@/pages/CoursePage.vue")
    },
    {
        path: '/lessons/:lessonId',
        name: 'LessonPage',
        component: () => import("@/pages/LessonPage.vue")
    },
    {
        path: '/auth',
        name: 'AuthPage',
        component: () => import("@/pages/AuthPage.vue")
    },
    {
        path: '/register',
        name: 'RegistrationPage',
        component: () => import("@/pages/RegistrationPage.vue")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
