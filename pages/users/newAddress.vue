    <template>
        <v-container>
        <h1 class="animate-character">Nuevo Endereço</h1>
        <hr>
        <v-form v-model="valid" style="border: medium" @submit.prevent="persist">
            <v-container class="form-container">
            <v-text-field
                v-model="address.street"
                outlined
                :rules="rule"
                required
                placeholder="Rua"
                prepend-inner-icon="mdi-map-marker"
                color="#593e99"
                background-color="#121214"
            ></v-text-field>
            <v-text-field
                v-model="address.neighborhood"
                outlined
                :rules="rule"
                required
                placeholder="Bairro"
                prepend-inner-icon="mdi-map-marker"
                color="#593e99"
                background-color="#121214"
            ></v-text-field>
            <v-text-field
                v-model="address.address"
                outlined
                :rules="rule"
                required
                placeholder="Endereço"
                prepend-inner-icon="mdi-map-marker"
                color="#593e99"
                background-color="#121214"
            ></v-text-field>
            <v-text-field
                v-model="address.number"
                outlined
                :rules="rule"
                required
                placeholder="Número"
                prepend-inner-icon="mdi-map-marker"
                color="#593e99"
                background-color="#121214"
            ></v-text-field>
            <v-text-field
                v-model="address.complement"
                outlined
                :rules="rule"
                required
                placeholder="Complemento"
                prepend-inner-icon="mdi-map-marker"
                color="#593e99"
                background-color="#121214"
            ></v-text-field>
            <v-btn
                style="background-color: #41356b; margin-top: 5%; margin-left: 35%;"
                :disabled="!valid"
                type="submit"
            >
                Concluir 
            </v-btn>
            </v-container>
        </v-form>
        </v-container>
    </template>
    
    <script>
    export default {
        name: 'NewAddressPage',
        layout: 'user',
        data() {
        return {
            valid: false,
            address: {
            id: null,
            street: null,
            neighborhood: null,
            address: null,
            number: null,
            complement: null
            },
            rule: [
            v => !!v || 'Campo obrigatório'
            ]
        }
        },
        methods: {
        async persist() {
            if (!this.valid) {
            return this.$toast.warning('O formulário de registro não é válido.');
            }
    
            try {
            const response = await this.$axios.$post('http://localhost:3333/users/register', this.user);
    
            if (response.type === 'error') {
                return this.$toast.info('Já existe um usuário com este nome de usuário.');
            }
    
            this.$toast.success('Registro concluído com sucesso!');
            return this.$router.push('/');
            } catch (error) {
            this.$toast.error('Ocorreu um erro durante o registro. Por favor, tente novamente mais tarde.');
            }
        }
        }
    };
    </script>
    
    <style>
    .animate-character {
        text-transform: uppercase;
        background-image: linear-gradient(
        -225deg,
        #231557 0%,
        #44107a 29%,
        #ff1361 67%,
        #fff800 100%
        );
        background-size: 200% auto;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: textclip 5s linear infinite;
        display: inline-block;
        font-size: 50px;
    }
    
    @keyframes textclip {
        0% {
        background-position: 0% center;
        }
        50% {
        background-position: 100% center;
        }
        100% {
        background-position: 0% center;
        }
    }
    
    .form-container {
        width: 75%;
        margin-left: 5%;
        border-radius: 1%;
        background-color: #202024;
        margin-top: 100px;
        margin-right: 200px;
        font-size: 25px;
        padding: 50px;
    }
    
    /* Add any additional styles you may need */
    </style>