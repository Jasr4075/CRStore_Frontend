<!-- eslint-disable require-await -->
<template>
  <v-container >
    <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
    <v-container>
      <v-container>
        <h1 style="margin-left: 30%; color: rgb(255, 255, 255)">
          BOAS COMPRAS
        </h1>
        <br /><br /><br />
      </v-container>
      <v-row>
    <v-card
      v-for="item in items"
      :key="item.id"
      elevation="24"
      shaped
      style="width: 30%; margin-left: 1%; margin-bottom: 5%; margin-right: 1%; padding-bottom: 1%; background-color: rgb(31, 28, 28);"
    >
      <v-img :src="item.image" height="300px"></v-img>
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-subtitle>
        R$ {{ item.price }} | {{ item.category.name }}
      </v-card-subtitle>
      <v-text-field
        v-model="item.amount"
        placeholder="0"
        label="Quantidade"
        outlined
        style="width: 50%; margin-left: 20%; margin-right: 5%; margin-bottom: 10%; margin-top: 1%;"
      ></v-text-field>
      <v-btn
        class="add-to-cart-btn"
        style="background-color: #44107a; margin-left: 5%; margin-right: 5%; position: absolute; bottom: 2%;"
        @click="addItemInCart(item.id, item.price, item.amount)"
      >
        ADICIONAR AO CARRINHO
      </v-btn>
    </v-card>
  </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'HomeUserPage',

  layout: 'user',

  data() {
    return {
      items: [],
      cart: {
        idItem: null,
        amount: null,
        price: null
      }
    };
  },

  async created() {
    await this.getItems();
  },

  methods: {
    async getItems() {
      const response = await this.$api.get('/items');
      this.items = response.data;
    },

    // eslint-disable-next-line require-await
    async addItemInCart(itemId, itemPrice, itemAmount) {
      this.cart.amount = itemAmount;
      this.cart.idItem = itemId;
      this.cart.price = itemPrice;
      // eslint-disable-next-line no-console
      console.log(this.cart);
      this.$toast.success('Produto adicionado ao carrinho!');
    }
  }
};
</script>
