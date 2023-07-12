<template>
  <v-container>
    <h1>Pedidos</h1>
    <hr>
    <br>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="paginatedOrders"
        :items-per-page="perPage"
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
            :to="{ name: 'users-order-newOrder' }"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
            @input="paginate"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'OrdersQueryPage',
  layout: 'user',
  data() {
    return {
      headers: [
        {
          text: 'Order ID',
          align: 'center',
          sortable: true,
          value: 'id',
        },
        {
          text: 'Date',
          align: 'center',
          sortable: true,
          value: 'date',
        },
        {
          text: 'Total',
          align: 'center',
          sortable: true,
          value: 'total',
        },
        { text: '', value: 'actions' },
      ],
      orders: [],
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.orders.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.orders.length / this.perPage);
    },
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        const response = await this.$api.get('http://localhost:3333/orders');
        this.orders = response.data;
      } catch (error) {
        this.$toast.error('An error occurred while fetching orders. Please contact the administrator.');
      }
    },
    async deleteItem(order) {
      try {
        if (confirm('Do you want to delete this order?')) {
          await this.$api.delete(`http://localhost:3333/orders/${order.id}`);
          this.$toast.success('Order successfully deleted!');
          await this.getOrders();
        }
      } catch (error) {
        this.$toast.error('An error occurred while deleting the order. Please contact the administrator.');
      }
    },
    editItem(order) {
      this.$router.push({
        name: 'users-newOrder',
        params: { id: order.id },
      });
    },
    paginate(page) {
      this.currentPage = page;
    },
  },
};
</script>
