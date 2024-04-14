import {reactive} from 'vue';

export const globalStorage = reactive({
        currentUser: {
            firstName: null,
            lastName: null,
            email: null,
            role: null,
            accessToken: null,
            refreshToken: null,

            setFirstName(name) {
                this.firstName = name;
            },

            setLastName(lastName) {
                this.lastName = lastName;
            },

            setEmail(email) {
                this.email = email;
            },

            setRole(role) {
                this.role = role;
            },

            setAccessToken(jwt) {
                this.accessToken = jwt;
            },

            setRefreshToken(refresh) {
                this.refreshToken = refresh;
            }
        },
        currentCourse: null,
        currentLesson: null,
        setCurrentCourse(course) {
            this.currentCourse = course;
        },
        setCurrentLesson(lesson) {
            this.currentLesson = lesson;
        }
    }
)