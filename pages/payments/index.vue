<template>
  <v-container>
    <h1>Consulta de métodos de pago aceptados</h1>
    <hr>
    <v-container>
        <v-row>
            <v-col>
            <v-btn
                outlined
                color="blue"
                @click="getPayments"
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
                to="/payments/newPayment"
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
            :items="payments"
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
    </v-container>
</template>

<script>
export default {
    name: 'PaymentsQueryPage',
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
                    text: 'Method',
                    align: 'center',
                    sortable: true,
                    value: 'method',
                },
                { text: "", value: "actions" }
            ],
            payments: []
        }
    },
    created () {
        this.getPayments()
    },
    methods: {
        async getPayments () {
            this.payments = await this.$axios.$get('http://localhost:3333/payments');
        },
        // eslint-disable-next-line require-await
        async deleteItem (payment) {
            try {
            if (confirm(`Do you want to delete payment:${payment.method}?`)) {
                this.$toast.success(`Payment:${payment.method} successfully deleted!`);
                this.getPayments ();
            } 
            } catch (error) {
            this.$toast.error('An error occurred while fulfilling the request. Contact the ADM.')
        }
        },
    // eslint-disable-next-line require-await
    async editItem (payment) {
        this.$router.push({
        name: 'payments-newPayment',
        params: { id: payment.id }
        });
    }
    }
}
</script>