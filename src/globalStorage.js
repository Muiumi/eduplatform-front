import {reactive} from 'vue';

export const globalStorage = reactive({
        currenUser: {
            firstName: "",
            surname: "",
            email: "",
            role: "",

            setFirstName(name) {
                this.firstName = name;
            },
            setSurname(surname) {
                this.surname = surname;
            },
            setEmail(email) {
                this.email = email;
            },
            setRole(role) {
                this.role = role; //TODO какую-то проверку ролей добавить?
            },
        },
    }
)