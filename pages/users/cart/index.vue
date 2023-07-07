<!-- eslint-disable vue/no-template-shadow -->
<template>
    <v-container>
    <h1>Meu Carrinho</h1>
    <hr>
    <br>
    <v-container>
        <v-row
            v-for="item in carts" 
            :key="item.id"
        >
        <v-card
v-for="item in carts" :key="item.id" elevation="24"
            shaped 
            style="width: 30%; margin-left: 1%;  margin-bottom: 5%; margin-right: 1%; padding-bottom: 1%; background-color: gray; "
        >
            <v-img
                :src="carts[0].item.image"
                height="300px"
            ></v-img>
            <v-card-title>
                {{ carts[0].item.name }}
            </v-card-title>
            <v-card-subtitle>
                R$ {{ carts[0].item.price }} | {{ carts.amount }}
            </v-card-subtitle>
            <v-btn
            style="background-color:blue; margin-left: 5%;  margin-right: 5%; bottom: 2%;"
            outlined
            @click="editItem()"
        >
            EDITAR
        </v-btn>
        <v-btn
            style="background-color:red; margin-left: 5%;  margin-right: 5%; bottom: 2%;"
            outlined
            @click="deleteItem()"
            >
            REMOVER
        </v-btn>
        </v-card>
        </v-row>
    </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'CartPage',
    layout: 'user',
    data () {
        return {
            carts: []
        }
    },
    created () {
        this.getCart()
    },
    methods: {
        async getCart () {
            const response = await this.$api.$get('/cart');
            // eslint-disable-next-line no-console
            console.log(response);
            // eslint-disable-next-line no-console
            console.log("fora do for");
            const items = [{}];
            for (let index = 0; index < response.length; index++) {
                // eslint-disable-next-line no-console
                console.log("dentro do for");
                this.items = response[index];
                for (let index = 0; index < items.length; index++) {
                    this.carts = items[index]
                // eslint-disable-next-line no-console
                console.log(this.carts);
                }
            }
            // eslint-disable-next-line no-console
            console.log("fim da funcao");
        },
        // eslint-disable-next-line require-await
        async deleteItem (carts) {
            try {
                this.$toast.success(`Address successfully deleted!`);
                this.getCart ();
            } catch (error) {
            this.$toast.error('An error occurred while fulfilling the request. Contact the ADM.')
        }
        },
        // eslint-disable-next-line require-await
        async editItem (carts) {
        this.$router.push({
            name: 'users-editCart',
            params: { id: carts.id }
        });
        }
    }
}
</script>