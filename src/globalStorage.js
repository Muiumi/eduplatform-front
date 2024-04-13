import {reactive} from 'vue';

export const globalStorage = reactive({
        currentUser: {
            firstName: "",
            lastName: "",
            email: "",
            role: "",

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
                this.role = role; //TODO какую-то проверку ролей добавить?
            },
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