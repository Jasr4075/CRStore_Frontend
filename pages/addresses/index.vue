    <template>
        <v-container>
        <h1>Endereços</h1>
        <hr>
        <br>
        <v-container>
            <v-data-table
            :headers="headers"
            :items="addresses"
            :items-per-page="10"
            class="elevation-1"
            >
            <template #[`item.actions`]="{ item }">
                <v-icon
                small
                class="mr-2"
                color="blue"
                @click="editItem(item)"
                >
                mdi-pencil
                </v-icon>
                <v-icon
                small
                color="red"
                @click="deleteItem(item)"
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
        <v-container>
            <v-row>
            <v-col>
                <v-btn
                color="green"
                fab
                style="margin-left: 50%"
                to="/users/newAddress"
                >
                <v-icon>
                    mdi-plus
                </v-icon>
                </v-btn>
            </v-col>
            </v-row>
        </v-container>
        </v-container>
    </template>
    
    <script>
    export default {
        name: 'AddressesQueryPage',
        layout: 'user',
        data() {
        return {
            headers: [
            {
                text: 'Street',
                align: 'center',
                sortable: true,
                value: 'street',
            },
            {
                text: 'Neighborhood',
                align: 'center',
                sortable: true,
                value: 'neighborhood',
            },
            {
                text: 'Number',
                align: 'center',
                sortable: true,
                value: 'number',
            },
            {
                text: 'Complement',
                align: 'center',
                sortable: true,
                value: 'complement',
            },
            {
                text: 'Address',
                align: 'center',
                sortable: true,
                value: 'address',
            },
            { text: '', value: 'actions' }
            ],
            addresses: []
        };
        },
        created() {
        this.getAddresses();
        },
        methods: {
        async getAddresses() {
            try {
            const response = await this.$api.get('/addresses');
            this.addresses = response.data;
            } catch (error) {
            this.$toast.error('An error occurred while fetching addresses. Please contact the administrator.');
            }
        },
        async deleteItem(address) {
            try {
            if (confirm('Do you want to delete this address?')) {
                await this.$api.delete(`/addresses/${address.id}`);
                this.$toast.success('Address successfully deleted!');
                await this.getAddresses();
            }
            } catch (error) {
            this.$toast.error('An error occurred while deleting the address. Please contact the administrator.');
            }
        },
        // eslint-disable-next-line require-await
        async editItem(address) {
            this.$router.push({
            name: 'users-newAddress',
            params: { id: address.id }
            });
        }
        }
    };
    </script>
    