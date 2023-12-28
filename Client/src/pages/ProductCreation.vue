<template >
  <div style="height: 100%; width: 100%;">

    <div style="padding: 20px 20px 20px 20px; display: flex; flex-direction: column">

      <h3 style="font-family: 'Pacifico', cursive; padding-bottom: 31px" >Afegir producte</h3>
      <q-input outlined v-model="name" label="Nom" style="padding-bottom: 20px;" />

      <q-input
        v-model="description"
        outlined
        clearable
        type="textarea"
        color="red-12"
        label="Descripció"
        style="margin-bottom: 15px"
      />

      <q-input outlined type="number" v-model="price" label="Preu" style="padding-bottom: 20px;" />

      <q-file  outlined  v-model="productImage" label="Imatge">
        <template v-slot:append>
          <q-icon name="attachment" color="blue" />
        </template>
      </q-file>
      <div @click="submit" style="display: flex; justify-content: center; margin-top: 15px">
        <q-btn color="blue" label="Pujar producte" />
      </div>
    </div>
  </div>

</template>

   <script>
   import {ref} from 'vue';
   const { ethers } = require("ethers");
   import {createProduct} from "app/repository/productsApi";
   import { onMounted } from 'vue';
   import { getUserDetails } from 'app/repository/usersApi';

   export default {

     components: {
     },
     setup () {

       const user = ref(null)

       onMounted(async () => {
         try {
           const userDetails = await getUserDetails();
           user.value = userDetails;
         } catch (error) {
           console.error(error);
         }
       });

       return {

         name: ref(''),
         description: ref(''),
         price: ref(''),
         productImage: ref(''),
         user,

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

         const productData = new FormData()

         productData.append('name', this.name)
         productData.append('description', this.description)
         productData.append('price', this.price)
         productData.append('productImage', this.productImage)
         productData.append('user_id', this.user._id)

         createProduct(productData)
           .then(data => {
             console.log("Creado producto... ", data)
             this.showToastMessage('Producte pujat correctament');
             setTimeout(() => {
               this.$router.push({path: '/ProfilePage',});
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
