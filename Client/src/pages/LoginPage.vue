<template >
  <div style="height: 100%; width: 100%;">

    <div style="padding: 20px 20px 20px 20px; display: flex; flex-direction: column">
      <div style="display: flex; justify-content: center; margin-top: 20px;">
        <img src="../assets/swapit_login.png" alt="Tu Logo" style="max-width: 80%; max-height: 300px;" />
      </div>
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

      <div @click="submit" style="display: flex; justify-content: center; margin-top: 30px">
        <q-btn color="blue" label="Login" style="padding: 10px 50px"/>
      </div>

      <div style="display: flex; justify-content: center; margin-top: 25px;">
        ¿No tens compte?
          <router-link to="/userCreation" class="text" style="font-size: 15px; padding-left: 5px; color: #1a5b78 ">
            Registra't aquí</router-link>
      </div>

    </div>
  </div>
</template>

   <script>
   import {onMounted, ref} from 'vue';
   const { ethers } = require("ethers");
   import {loginUser, validateToken} from "app/repository/usersApi";
   import {useRouter} from "vue-router";

   export default {

     components: {
     },
     setup () {

       const router = useRouter();
       const email = ref('');
       const password = ref('');
       const showPassword = ref(false);

       const togglePasswordVisibility = () => {
         showPassword.value = !showPassword.value;
       };
       const validatingToken = async () => {
         try {
           if(token) {
             const token = localStorage.getItem("userToken");
             const result = await validateToken({token: token});
             if(result.valid) router.push({path: '/MatchList'});
           }
         } catch (error) {
           console.error(error);
         }
       };

       onMounted(() => {
         validatingToken();

       });

       return {

         email: ref(''),
         password: ref(''),
         showPassword,
         togglePasswordVisibility,
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

         const credentials = {
           email: this.email,
           password: this.password
         }

         loginUser(credentials)
           .then(response => {

             localStorage.setItem("userToken", response.token);

             this.$router.push({path: '/MatchList',});

           })
           .catch(error => {
             console.error('Error', error);
           });
       },

     }

   }
   </script>

   <style>

    * {
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
    }

    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');


   </style>
