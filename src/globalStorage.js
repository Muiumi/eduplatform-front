import {reactive} from 'vue';

export const ROLE_STUDENT = "ROLE_STUDENT";
export const ROLE_MENTOR = "ROLE_MENTOR";
export const ROLE_AUTHOR = "ROLE_AUTHOR";

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