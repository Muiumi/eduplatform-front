import Vue from 'vue'
import VueRouter from 'vue-router'
import {globalStorage} from "@/globalStorage";

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
    routes
});

router.beforeEach((to, from, next) => {
        if (to.matched.some(route => route.meta.requiresToken)) {
            if (Vue.$cookies.get("accessToken")) {
                next();
            } else if (Vue.$cookies.get("refreshToken")) {
                const refreshTokenRequest = {refreshToken: Vue.$cookies.get("refreshToken")};
                fetch(`${process.env.VUE_APP_EDU_PLATFORM_API_URL}/auth/refresh-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(refreshTokenRequest)
                })
                    .then(response => {
                        if (!response.ok) {
                            console.log(response.json())
                            next("/auth");
                        } else {
                            return response.json();
                        }
                    })
                    .then(responseContent => {
                        const user = globalStorage.currentUser;
                        Object.assign(user, responseContent);
                        user.setAccessToken(responseContent.accessToken);

                        const {firstName, lastName, email, role} = user;
                        const dataToStore = {firstName, lastName, email, role};
                        localStorage.setItem("userData", JSON.stringify(dataToStore));

                        const expDateAccess = new Date(responseContent.accessExpiration);
                        Vue.$cookies.set("accessToken",responseContent.accessToken, expDateAccess);
                        console.info("JWT токен успешно обновлён");
                        next();
                    })
                    .catch(exception => {
                        console.error("Возникла ошибка при отправке refresh-токена" + exception);
                        next("/auth");
                    })
            } else {
                next("/auth");
            }
        } else {
            next();
        }
    }
)

export default router
