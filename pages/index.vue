<template>
  <v-container>
    <v-table>
      <v-row>
        <v-col>
          <v-container class="animate-character" style="margin-top: 25%; font-size: 50px; margin-left: 100px">
            <h1 style="font-size: 50px;">
              Bem-Vindo
              <br>
              Faça seu login na CRStore!
            </h1>
            <h3 style="font-size: 25%">
              Ainda não tem cadastro? Faça o seu por <button id="btaqui"> <a href="./register">aqui!</a></button>
            </h3>
          </v-container>
        </v-col>
        <v-col>
          <v-form v-model="valid" style="border: medium" @submit.prevent="login">
            <v-container style="width: 75%; margin-left: 5%; border-radius: 1%; background-color: #202024; margin-top: 100px; margin-right: 200px; font-size: 25px; padding-top: 50px; padding-left: 50px; padding-right: 50px; padding-bottom: 50px;">
              <v-text-field
                v-model="user.username"
                outlined
                :rules="usernameRules"
                required
                placeholder="Username"
                prepend-inner-icon="mdi-account"
                color="#593e99"
                background-color="#121214"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                outlined
                :rules="passwordRules"
                required
                placeholder="Password"
                prepend-inner-icon="mdi-lock"
                color="#593e99"
                background-color="#121214"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <h3 style="font-size: small; color: #6e4cbf; margin-top: -7%" href="./">
                Esqueci minha senha
              </h3>
              <v-btn
                style="background-color: #41356b; margin-top: 5%; margin-left: 35%;"
                :disabled="!valid"
                type="submit"
              >
                ENTRAR
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
  name: 'IndexPage',
  layout: 'login',

  data() {
    return {
      showPassword: false,
      valid: false,
      user: {
        username: null,
        password: null
      },
      usernameRules: [
        v => !!v || 'Nome de usuário é obrigatório'
      ],
      passwordRules: [
        v => !!v || 'Senha é obrigatória'
      ]
    }
  },

  methods: {
    async login() {
      if (!this.valid) {
        return this.$toast.warning('O formulário de registro não é válido!')
      }

      try {
        const response = await this.$axios.$post('http://localhost:3333/users/login', this.user);
        if (!response.token) {
          return this.$toast.info('Nome de usuário ou senha inválidos!')
        }
        this.$toast.success('Bem-vindo de volta!')
        localStorage.setItem('crstore-api-token', response.token);
        this.validate(response.role);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        this.$toast.error('Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.')
      }
    },

    validate(role) {
      if (role === 'customer') {
        this.$router.push('/homeUser');
      } else {
        this.$router.push('/homeAdmin');
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
    hsl(340, 100%, 54%) 67%,
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
