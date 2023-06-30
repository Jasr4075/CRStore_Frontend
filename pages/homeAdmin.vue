<template>
  <v-app class="font">
    <v-container>
      <v-col>
        <v-row>
          <v-card
            color="green"
            style="margin: 10px"
            align="center"
            width="200px"
            @click="isEditing = true; isCreating = false"
          >
            <v-card-text>Editar produtos</v-card-text>
          </v-card>
          <v-card
            color="green"
            style="margin: 10px"
            align="center"
            width="200px"
            @click="isCreating = true; isEditing = false"
          >
            <v-card-text>Adicionar produto</v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-container>
    <v-container v-if="isEditing" fluid>
      <v-row>
        <v-card 
        v-for="item in items"
        :key="item.id"
        color="#121212"
        width="300px"
        height="500px"
        style="margin: 10px"
        >
          <v-col>
            <v-text-field
              v-model="item.name"
              :value="item.name"
              solo
              dense
            ></v-text-field>
            <v-text-field
              v-model="item.price"
              :value="item.price"
              type="number"
              solo
              dense
            ></v-text-field>
            <v-text-field
              v-model="item.stock"
              :value="item.stock"
              type="number"
              solo
              dense
            ></v-text-field>
            <v-text-field
              v-model="item.description"
              :value="item.description"
              type="text"
              solo
              dense
            ></v-text-field>
            <v-text-field
              v-model="item.image"
              :value="item.image"
              type="text"
              solo
              dense 
            ></v-text-field>
            <v-autocomplete
            v-model="item.idCategory"
              :items="categories"
              item-value="id"
              item-text="name"
              type="text"
              filled
              solo
              dense
            ></v-autocomplete>
            <v-row>
              <v-col align=center>
                <v-btn
                  color="green"
                  @click="editItem(item)"
                >Salvar</v-btn>
              </v-col>
              <v-col align=center>
                <v-btn
                  color="red"
                  @click="deleteItem(item.id)"
                >Deletar</v-btn>
              </v-col>
            </v-row>
            
          </v-col>
        </v-card>
      </v-row>
    </v-container>
    <v-card v-if="isCreating">
      <v-container>
        <v-row align="center">
          <v-col>
            <v-row >
              <v-card
                color="#121212"
                width="300px"
                height="500px"
                style="margin: 10px"
              >
                <v-col>
                  <v-text-field
                    v-model="item.name"
                    :value="item.name"
                    label="Nome"
                    solo
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="item.price"
                    :value="item.price"
                    type="number"
                    label="Preço"
                    solo
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="item.stock"
                    :value="item.stock"
                    type="number"
                    label="Estoque"
                    solo
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="item.description"
                    :value="item.description"
                    type="text"
                    label="Descrição"
                    solo
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="item.image"
                    :value="item.image"
                    type="text"
                    label="Imagem"
                    solo
                    dense
                  ></v-text-field>
                    <v-autocomplete
                    v-model="item.idCategory"
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    dense
                    filled
                    solo-inverted
                    label="Categoria"
                  ></v-autocomplete>
                  <v-col align=center>
                    <v-btn
                      color="green"
                      @click="createItem()"
                    >Criar</v-btn>
                  </v-col>
                </v-col>
              </v-card>
            </v-row>
          </v-col>
          <v-col>
            <v-card-text>
              Pré visualização
            </v-card-text>
            <v-card
              color="#121212"
              style="margin: 10px;"
              width="300px"
              height="500px"
              :disabled="item.stock <= 0"
            >
              <v-col align="center">
                <v-card-text 
                  style="font-size: 20px;"
                >{{item.name}}</v-card-text>
              </v-col>
              <v-col align="center">
                <v-img
                  :src="item.image"
                  width="150px"
                  height="150px"
                  class="rounded-lg"
                ></v-img>
              </v-col>
              <v-col>
                <v-card-text 
                  style="font-size: 16px;"
                >
                  {{item.description}}
                </v-card-text>
              </v-col>
              <v-container class="flex">
                <v-row>
                  <v-col align="left">
                    <v-card-text
                      style="font-size: 20px; 
                      color: rgb(255, 255, 255)"
                    >
                      R$ {{item.price}}
                    </v-card-text>
                  </v-col>
                  <v-col align="right">
                    <v-card-text
                      class="font"
                      :style="`font-size: 20px;
                      color: ${item.stock > 0 ? 'green' : 'red'}`"
                    >
                      {{ item.stock > 0 ? `${item.stock} Disponível` : 'Indisponível'}}
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
              <v-container class="flex">
                <v-row>
                  <v-col align="center">
                    <v-text-field
                      disable
                      solo
                      dense
                      type="number"       
                    >c</v-text-field>
                  </v-col>
                  <v-col align="right">
                    <v-btn
                      color="green"
                      dense
                      solo
                      disabled
                    >Add to cart</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      items: [],
      item: {},
      categories: [],
      isEditing: false,
      isCreating: false,
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions, no-sequences
    this.getItems(),
    this.getCategories()
  },
  methods: {
    async getItems () {
      try {
        const response = await this.$api.get(`/items`)
        this.items = response.data
      } catch (error) {
        this.$toast.error(`Erro ao pegar os produtos`);
      }
    },
    async getCategories () {
      try {
        const response = await this.$api.get(`/categories`)
        this.categories = response.data
      } catch (error) {
        this.$toast.error(`Erro ao buscar as categorias`);
      }
    },
    async editItem (item) {
      try {
        const response = await this.$api.post('/items/persist', item)
        if (response.type === 'error'){
          return this.$toast.error(`${response.message}`);
        }
        this.$toast.success(`${response.message}`);
      } catch (error) {
        this.$toast.error(`Erro ao atualizar o produto`);
      }
    },
    async deleteItem (id) {
      try {
        if (!confirm('Deseja deltar o produto '+id)){
          return
        }
        const response = await this.$api.post('/items/destroy', {id})
        if (response.type === 'error'){
          return this.$toast.error(`${response.message}`);
        }
        this.getItems()
        this.$toast.success(`${response.message}`);
      } catch (error) {
        this.$toast.error(`Erro ao deletar o produto`);
      }
    },
    async createItem () {
      try {
        // eslint-disable-next-line no-console
        console.log(this.item);
        const response = await this.$api.post('/items/persist', this.item)
        if (response.type === 'error'){
          return this.$toast.error(`${response.message}`);
        }
        this.$toast.success(`${response.message}`);
      } catch (error) {
        this.$toast.error(`Erro ao criar o produto`);
      }
    }
  }
}
</script>

<style>

</style>