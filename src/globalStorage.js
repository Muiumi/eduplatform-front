import {reactive} from 'vue';

export const SYSTEM_ROLES = {
    ROLE_STUDENT: "ROLE_STUDENT",
    ROLE_MENTOR: "ROLE_MENTOR",
    ROLE_AUTHOR: "ROLE_AUTHOR",
}
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
            },

            clearCurrentUser() {
                ["FirstName", "LastName", "Email", "Role", "AccessToken", "RefreshToken"].forEach(key => {
                    this[`set${key}`](null)
                });
            }
        },
        searchAssist: {

            itemsToSearch: [],
            searchResult: [],

            setItemsToSearch(items) {
                this.itemsToSearch = items;
            },
            setSearchResult(results) {
                this.searchResult = results;
            }
        },
        currentCourse: {},
        currentLesson: {},
    }
)