<template>
  <v-container>
    <h1>Categories Query</h1>
    <hr>
    <v-container>
        <v-row>
            <v-col>
            <v-btn
                outlined
                color="blue"
                @click="getCategories"
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
                to="/categories/newCategory"
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
            :items="categories"
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
    name: 'CategoriesQueryPage',
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
                    text: 'Name',
                    align: 'center',
                    sortable: true,
                    value: 'name',
                },
                { text: "", value: "actions" }
            ],
            categories: []
        }
    },
    created () {
        this.getCategories()
    },
    methods: {
        async getCategories () {
            this.categories = await this.$axios.$get('http://localhost:3333/categories');
        },
        // eslint-disable-next-line require-await
        async deleteItem (category) {
            try {
            if (confirm(`Do you want to delete category:${category.name}?`)) {
                this.$toast.success(`Category:${category.name} successfully deleted!`);
                this.getCategories ();
            } 
            } catch (error) {
            this.$toast.error('An error occurred while fulfilling the request. Contact the ADM.')
        }
     },
    // eslint-disable-next-line require-await
    async editItem (category) {
      this.$router.push({
        name: 'categories-newCategory',
        params: { id: category.id }
      });
    }
  }
}
</script>