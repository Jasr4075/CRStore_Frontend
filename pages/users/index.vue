<template>
    <v-container>
    <h1>Users Query</h1>
    <hr>
    <v-container>
        <v-row>
            <v-col>
            <v-btn
                outlined
                color="blue"
                @click="getUsers"
            >
                Search
                <v-icon
                    style="margin-left:5%"
                >
                    mdi-magnify
                </v-icon>
            </v-btn>
            <v-btn
                color="green"
                fab
                style="margin-left:1%"
                to="/register"
            >
                <v-icon>
                    mdi-plus
                </v-icon>
            </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="10"
            class="elevation-1"
        >
        <template #[`item.actions`]="{ item }">
            <v-icon
                small
                color="red"
                @click="deleteUser(item)"
            >
                mdi-delete
            </v-icon>
        </template>
<template #no-data>
    <v-btn
        color="primary"
        @click="initialize"
    >
        Reset
    </v-btn>
    </template>
            </v-data-table>
        </v-container>
    </v-container>
    </template>

<script>
export default {
    name: 'UsersQueryPage',
    data () {
        return {
            headers: [
                {
                    text: 'Code',
                    align: 'center',
                    sortable: true,
                    value: 'id',
                },
                {
                    text: 'Username',
                    align: 'center',
                    sortable: false,
                    value: 'username',
                },
                {
                    text: 'Name',
                    align: 'center',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'Phone',
                    align: 'center',
                    sortable: false,
                    value: 'phone',
                },
                { text: "", value: "actions" }
            ],
            users: []
        }
    },
    created () {
        this.getUsers()
    },
    methods: {
        async getUsers () {
            const response = await this.$axios.$get('http://localhost:3333/users');
            this.users = response.data;
        },
        async deleteUser (user) {
            try {
                await this.$api.delete(`http://localhost:3333/users/${user.id}`);
                this.getUsers();
            } catch (error) {
                this.$toast.error(error.response.data.message);
            }
        },
},
}
</script>