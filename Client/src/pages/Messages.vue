<template >
<div>
  <h6 style="padding-left: 30px; padding-top: 10px; color: #1a5b78">Matchs</h6>
  <div style="display: flex; flex-direction: column; align-items: flex-start; overflow-x: auto; padding: 5px 0px 20px 30px">


    <!-- Match nuevo -->

    <div style="display: flex; margin-bottom: 10px;">
      <button round style="border-radius: 50px; border: none; ">
        <q-avatar size="70px" >
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </button>
      <div style="margin-left: 10px; display: flex; flex-direction: column; justify-content: center">
        <div style="color: #04aa6d">Samuel</div>
        <div>Has fet match amb en samuel per el teu Patinet <br><q-btn label="Veure Match" color="primary" size="10px" @click="card = true" /></div>
      </div>
    </div>

    <!-- Match acceptado -->

    <div style="display: flex; margin-bottom: 10px;">
      <button round style="border-radius: 50px; border: none; ">
        <q-avatar size="70px" >
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </button>
      <div style="margin-left: 10px; display: flex; flex-direction: column; justify-content: center">
        <div style="color: #04aa6d">Samuel</div>
        <div>Match acceptat amb en samuel per el teu Patinet <br> <q-btn size="10px" square color="green"> Match Acceptat</q-btn></div>
      </div>
    </div>

    <!-- Match denegado -->

    <div style="display: flex; margin-bottom: 10px;">
      <button round style="border-radius: 50px; border: none; ">
        <q-avatar size="70px" >
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </button>
      <div style="margin-left: 10px; display: flex; flex-direction: column; justify-content: center">
        <div style="color: #04aa6d">Samuel</div>
        <div>Match denegat amb en samuel per el teu Patinet <br> <q-btn size="10px" square color="red"> Match Denegat</q-btn></div>
      </div>

    </div>
    </div>

  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Pc Portatil
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          Lenovo
        </div>
        <div class="text-caption text-grey">
          Amb 16 gb de ram, bateria en bon estat, 16 pulgadas de pantalla.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="green" label="Acceptar" />
        <q-btn v-close-popup flat color="red" label="denegar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>



</template>

   <script>
   import {reactive, ref } from 'vue';
   const { ethers } = require("ethers");


   export default {

     components: {
     },
     setup () {
       const state = reactive({

       });




       return {
         carousel: ref(false),
         card: ref(false),
         sliders: ref(false),

         slide: ref(1),
         lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

         stars: ref(3),

         slideVol: ref(39),
         slideAlarm: ref(56),
         slideVibration: ref(63),
         state
       };
     },
     data() {
       return {

         //NEW

         value: ref(true),

         isDragging: false,
         startX: 0,
         startY: 0,
         offsetX: 0,
         offsetY: 0,
         draggedElement: null,

         like: false,
         unlike: false,

         start_like: false,
         start_super_like: false,
         start_dislike: false,

         currentImageIndex: 0,

         images: [
           "https://cdn.wallapop.com/images/10420/ex/nj/__/c10420p903051622/i3290736143.jpg?pictureSize=W640",
           "https://cdn.wallapop.com/images/10420/fj/hv/__/c10420p939739698/i3503651896.jpg?pictureSize=W320",
           "https://cdn.wallapop.com/images/10420/ar/z2/__/c10420p651647230/i2053405253.jpg?pictureSize=W320",
           "https://cdn.wallapop.com/images/10420/fo/yg/__/c10420p948910722/i3559368225.jpg?pictureSize=W320",
           "https://cdn.wallapop.com/images/10420/fp/mz/__/c10420p950055856/i3567524676.jpg?pictureSize=W320",
         ],

         indexArray: [0,1,2,3,4],
         //ENDNEW

       };
     },

     computed: {
       visibleImages() {
         return this.images.slice(this.currentImageIndex);
       }
     },
     methods: {

       pop_icon(icon){

         console.log(icon)

         setTimeout(() => {
            if(icon === "LIKE") this.start_like = false;
            else if(icon === "DISLIKE") this.start_dislike = false;
            else if(icon === "SUPER_LIKE") this.start_super_like = false;

           this.currentImageIndex++;
           this.draggedElement.style.transform = ""; // Reset transform for next card



         }, 300);

         if(icon === "LIKE") this.start_like = true;
         else if(icon === "DISLIKE") this.start_dislike = true;
         else if(icon === "SUPER_LIKE") this.start_super_like = true;


       },

       startDrag(event) {
         this.isDragging = true;
         this.draggedElement = this.$refs.cardImage[0].$el;

         const touch = event.changedTouches[0];
         this.startX = touch.clientX;
         this.startY = touch.clientY;

         const rect = this.draggedElement.getBoundingClientRect();
         this.offsetX = this.startX - rect.left;
         this.offsetY = this.startY - rect.top;




       },
       dragCard(event) {
         if (this.isDragging && this.draggedElement) {
           const touch = event.changedTouches[0];
           const deltaX = (touch.clientX - this.startX)/4;
           this.draggedElement.style.transformOrigin = "top center";
           if(deltaX >= 30) {
             this.like = false;
             this.unlike = true;
           }
           else if(deltaX <= -30) {
             this.unlike = false;
             this.like = true;
           }

           if(deltaX < 50 && deltaX > -50) this.draggedElement.style.transform = "rotate(" + -deltaX + "deg)"; // Rotate right
         }
       },
       endDrag(event) {
         this.like = false;
         this.unlike = false;

         const touch = event.changedTouches[0];
         const deltaX = (touch.clientX - this.startX)/4;

         if(deltaX >= 50 || deltaX <= -50) {

           setTimeout(() => {
             this.currentImageIndex++;
             this.draggedElement.style.transform = ""; // Reset transform for next card
           }, 500);
         }
         this.draggedElement.style.transform = "rotate(0deg)"; // Rotate right
         this.isDragging = false;
         this.draggedElement = null;
       },
       goChat(){
       }
     }
   }
   </script>

   <style>

    * {
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
    }

    .swiper {
      height: 66vh;
      aspect-ratio: 2 / 3;
      perspective: 1000px;
      perspective-origin: center 50%;
      transform-style: preserve-3d;
      position: relative;
    }

    .card {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 30px;
    }

    .card.leaving {
      transition: transform 0.5s ease-in-out;
    }

    .dislike-color .q-icon {
      color: indianred !important;
    }
    .super-like-color .q-icon {
      color: dodgerblue !important;
    }
    .like-color .q-icon {
      color: mediumspringgreen !important;
    }

    .icon-bigger .q-icon {
      font-size: 35px;   /* Increase the icon size */
      width: 20px;    /* Adjust width */
      height: 20px;   /* Adjust height */
      vertical-align: middle; /* To ensure it aligns well vertically */
    }

   </style>
