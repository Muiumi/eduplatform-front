import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/auth',
        name: 'AuthPage',
        component: () => import("@/pages/AuthPage.vue"),
    },
    {
        path: '/register',
        name: 'RegistrationPage',
        component: () => import("@/pages/RegistrationPage.vue")
    },
    {
        path: '/',
        name: 'MainPage',
        component: () => import("@/pages/MainPage.vue"),
        meta: {
            requiresToken: true,
        }
    },
    {
        path: '/courses/:courseId',
        name: 'CoursePage',
        component: () => import("@/pages/CoursePage.vue"),
        meta: {
            requiresToken: true,
        }
    },
    {
        path: '/lessons/:lessonId',
        name: 'LessonPage',
        component: () => import("@/pages/LessonPage.vue"),
        meta: {
            requiresToken: true,
        }
    },
    {
        path: '/user',
        name: 'UserAccount',
        component: () => import("@/pages/UserAccount.vue"),
        meta: {
            requiresToken: true,
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const userData = JSON.parse(localStorage.getItem("userData"));
const expDate = new Date(userData.accessExpiration)

router.beforeEach((to, from, next) => {
        if (to.matched.some(route => route.meta.requiresToken)) {
            if (userData.accessToken == null && expDate > new Date()) {
                next('auth');
            } else {
                next();
            }
        } else {
            next();
        }
    }
)

export default router
