<template>
    <v-container>
      <h1>Meu Carrinho</h1>
      <hr>
      <br>
      <v-container>
        <v-row v-for="item in carts" :key="item.id">
          <v-card
            elevation="24"
            shaped
            style="width: 30%; margin-left: 1%;  margin-bottom: 5%; margin-right: 1%; padding-bottom: 1%; background-color: gray; "
          >
            <v-img :src="item.item.image" height="300px"></v-img>
            <v-card-title>{{ item.item.name }}</v-card-title>
            <v-card-subtitle>
              R$ {{ item.item.price }} | {{ item.amount }}
            </v-card-subtitle>
            <v-btn
              style="background-color:blue; margin-left: 5%;  margin-right: 5%; bottom: 2%;"
              outlined
              @click="editItem(item)"
            >
              EDITAR
            </v-btn>
            <v-btn
              style="background-color:red; margin-left: 5%;  margin-right: 5%; bottom: 2%;"
              outlined
              @click="deleteItem(item)"
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
    data() {
      return {
        carts: []
      };
    },
    created() {
      this.getCart();
    },
    methods: {
      async getCart() {
        const response = await this.$api.$get('/cart');
        this.carts = response;
      },
      async deleteItem(item) {
        try {
          // Eliminar el elemento del carrito utilizando la API
          await this.$api.$delete(`/cart/${item.id}`);
          this.$toast.success('Producto eliminado del carrito exitosamente.');
          this.getCart();
        } catch (error) {
          this.$toast.error(
            'Ocurrió un error al eliminar el producto. Por favor, contacta al administrador.'
          );
        }
      },
      editItem(item) {
        this.$router.push({
          name: 'users-editCart',
          params: { id: item.id }
        });
      }
    }
  };
  </script>
  