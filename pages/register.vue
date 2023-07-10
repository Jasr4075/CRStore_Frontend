<template>
    <v-container>
      <v-table>
        <v-row>
          <v-col>
            <v-container class="animate-character" style="margin-top: 25%; font-size: 50px; margin-left: 100px">
              <h4 style="font-size: 50px;">
                    crie o seu usuario na CRSTORE!
                </h4>
            </v-container>
          </v-col>
          <v-col>
            <v-form v-model="valid" style="border: medium" @submit.prevent="persist">
              <v-container style="width: 75%; margin-left: 5%; border-radius: 1%; background-color: #202024; margin-top: 100px; margin-right: 200px; font-size: 25px; padding-top: 50px; padding-left: 50px; padding-right: 50px; padding-bottom: 50px;">
                <v-text-field
                  v-model="user.username"
                  outlined
                  :rules="usernameRules"
                  required
                  placeholder="Nombre de usuario"
                  prepend-inner-icon="mdi-account"
                  color="#593e99"
                  background-color="#121214"
                ></v-text-field>
                <v-text-field
                  v-model="user.name"
                  outlined
                  :rules="nameRules"
                  required
                  placeholder="Nombre"
                  prepend-inner-icon="mdi-account"
                  color="#593e99"
                  background-color="#121214"
                ></v-text-field>
                <v-text-field
                  v-model="user.phone"
                  outlined
                  :rules="phoneRules"
                  required
                  placeholder="Teléfono"
                  prepend-inner-icon="mdi-phone"
                  color="#593e99"
                  background-color="#121214"
                ></v-text-field>
                <v-text-field
                  v-model="user.password"
                  outlined
                  :rules="passwordRules"
                  required
                  placeholder="Contraseña"
                  prepend-inner-icon="mdi-lock"
                  color="#593e99"
                  background-color="#121214"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn
                  style="background-color: #41356b; margin-top: 5%; margin-left: 35%;"
                  :disabled="!valid"
                  type="submit"
                >
                  Concluir cadastro
                </v-btn>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-table>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    layout: 'login',
    data() {
      return {
        showPassword: false,
        valid: false,
        user: {
          username: null,
          name: null,
          phone: null,
          password: null
        },
        usernameRules: [
          v => !!v || 'Nombre de usuario es obligatorio'
        ],
        nameRules: [
          v => !!v || 'Nombre es obligatorio'
        ],
        phoneRules: [
          v => !!v || 'Teléfono es obligatorio'
        ],
        passwordRules: [
          v => !!v || 'Contraseña es obligatoria'
        ]
      }
    },
  
    methods: {
      async persist() {
        if (!this.valid) {
          return this.$toast.warning('El formulario de registro no es válido.');
        }
  
        try {
          const response = await this.$axios.$post('http://localhost:3333/users/register', this.user);
  
          if (response.type === 'error') {
            return this.$toast.info('Ya existe un usuario con este nombre de usuario.');
          }
  
          this.$toast.success('¡Registro completado exitosamente!');
          return this.$router.push('/');
        } catch (error) {
          this.$toast.error('Ocurrió un error durante el registro. Por favor, inténtelo nuevamente más tarde.');
        }
      }
    }
  }


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
    font-size: 190px;
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
  </style>
  