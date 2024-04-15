
export const globalStorageAccess = {
    computed: {
        currentUser() {
            return this.$globalStorage.currentUser;
        },
        currentCourse() {
            return this.$globalStorage.currentCourse;
        },
        currentLesson() {
            return this.$globalStorage.currentLesson;
        },
    }
}