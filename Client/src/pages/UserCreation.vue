<template >
  <div style="height: 100%; width: 100%;">

    <div style="padding: 20px 20px 20px 20px; display: flex; flex-direction: column">

      <h3 style="font-family: 'Pacifico', cursive; padding-bottom: 31px" >Crear usuario</h3>

      <q-input outlined v-model="email" label="Email" style="padding-bottom: 20px;" />

      <div style="position: relative;">
        <q-input
          v-model="password"
          label="Contraseña"
          style="padding-bottom: 20px; border-radius: 5px;"
          :type="showPassword ? 'text' : 'password'"
          outlined
        />
        <q-icon
          v-if="showPassword"
          name="visibility_off"
          @click="togglePasswordVisibility"
          style="position: absolute; top: 50%; right: 8px; transform: translateY(-50%); cursor: pointer;"
        />
        <q-icon
          v-else
          name="visibility"
          @click="togglePasswordVisibility"
          style="position: absolute; top: 50%; right: 8px; transform: translateY(-50%); cursor: pointer;"
        />
      </div>

      <q-input outlined v-model="name" label="Nom" style="padding-bottom: 20px;" />

      <q-input outlined v-model="surname" label="Cognom" style="padding-bottom: 20px;" />



      <q-input filled v-model="date_of_birth" mask="date" :rules="['date']" label="Data de naixement">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date_of_birth">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Selecciona" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-model="description"
        outlined
        clearable
        type="textarea"
        color="red-12"
        label="Descripció"
        style="margin-bottom: 15px"
      />

      <q-input outlined v-model="localization" label="Ubicació" style="padding-bottom: 20px;" />

      <q-file  outlined  v-model="profile_image" label="Foto de perfil">
        <template v-slot:append>
          <q-icon name="attachment" color="blue" />
        </template>
      </q-file>
      <div @click="submit" style="display: flex; justify-content: center; margin-top: 15px">
        <q-btn color="blue" label="Register" />
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <router-link to="/LoginPage" class="text">¿Ja tens compte? Fes login aquí</router-link>
      </div>
    </div>
  </div>

</template>

<script>
import {ref} from 'vue';
const { ethers } = require("ethers");
import {createProduct} from "app/repository/productsApi";
import {createUser} from "app/repository/usersApi";

export default {

  components: {
  },
  setup () {
    const password = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {

      email: ref(''),
      password: ref(''),
      showPassword,
      togglePasswordVisibility,
      name: ref(''),
      surname: ref(''),
      date_of_birth: ref(''),
      description: ref(''),
      localization: ref(''),
      profile_image: ref(''),
      showToast: ref(false),
      toastMessage: ref(''),
    };
  },
  data() {
    return {
    };
  },

  computed: {
  },
  methods: {
    submit(){

      const userData = new FormData()

      userData.append('email', this.email)
      userData.append('password', this.password)
      userData.append('name', this.name)
      userData.append('surname', this.surname)
      userData.append('date_of_birth', this.date_of_birth)
      userData.append('description', this.description)
      userData.append('localization', this.localization)
      userData.append('profile_image', this.profile_image)

      createUser(userData)
        .then(data => {
          console.log("Creado user... ", data)
          this.showToastMessage('Usuari creat correctament');
          setTimeout(() => {
            this.$router.push({path: '/LoginPage',});
          }, 2000);
        })
        .catch(error => {
          console.error(error);
          this.showToastMessage('Error al crear l`usuari');
        });
    },
    showToastMessage(message) {
      this.$q.notify({
        message: message,
        color: 'positive',
        position: 'top',
        timeout: 2000,
      });
    },
  },
};
</script>

<style>

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.toast-message {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #4caf50;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  display: none;
}

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');


</style>
