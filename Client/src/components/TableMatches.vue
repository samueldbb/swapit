<template >
  <div style="background-image: url('https://shantahl.net/assets/images/icons/no_products_found.png') ">

    <div style="display:flex; flex-direction: column; align-items: center; justify-content:center; padding: 3%; border-bottom: 3px solid black; background-color: #61A9D1;">
        <a style="font-size: 20px;">SwapIt</a>
        <img src="../assets/swapit_login.png" alt="Tu Logo" style="max-width: 10%; max-height: 300px;" />
    </div>



    <div style="display: flex">
      <div  class="swiper" style="width: 100%;">

        <div style="background: #CFD2C9;"
             class="card"
             v-for="(product, index) in visibleProducts"
             :style="{
          '--i': index - currentProductIndex,
          'z-index': productsTabla.length - index,
        }"
             :key="index"
             @touchstart="startDrag"
             @touchmove="dragCard"
             @touchend="endDrag"
        >
          <q-img v-if="product" ref="cardImage" :src="product.image_url" style="height: 100%; width: 100%" />

          <q-btn v-if="product" :label="product.name" style="width: 100%;height:8%;background-color: black;" text-color="white" @click="mostrarInformacion"></q-btn>
          <div  v-if="product" id="informacion" :style="{ display: showInformacion ? 'flex' : 'none',backgroundColor: showInformacion ? '#61A9D1' : 'transparent',borderBottom: showInformacion ? '1px solid white' : 'none',borderBottom: showInformacion ? '1px solid white' : 'none',height: '20%'}">
            <p v-if="product" style="color: white;text-align: center; padding-left: 2%;padding-top: 2%;margin-bottom: 2%">{{product.description}}</p>
          </div>

          <div id="botones" :style="{ display: showBotones ? 'flex' : 'none', padding: '2% 10%', backgroundColor: '#61A9D1', textAlign: 'center', justifyContent: 'space-around' }"
          >

            <q-btn round color="white" icon="close" style="" class="bg-black icon-bigger" @click="pop_icon('LIKE')" />

            <q-btn round color="white" icon="favorite" class="icon-bigger bg-black" @click="pop_icon('DISLIKE'),dialog = true" />

          </div>
        </div>



        <q-btn v-if="like"  style="position: relative; top: 200px; left: 40px; z-index: 9999; font-size: 28px" round color="red" icon="close" />
        <q-btn v-if="unlike" style="position: relative; top: 200px; left: 285px; z-index: 9999; font-size: 28px" round color="green" icon="favorite" />

        <q-btn v-if="start_like" style="position: relative; top: 200px; z-index: 9999; font-size: 28px" round color="red" icon="close" />
        <q-btn v-if="start_super_like" style="position: relative; top: 200px; z-index: 9999; font-size: 28px" round color="blue" icon="star" />
        <q-btn v-if="start_dislike" style="position: relative; top: 200px; z-index: 9999; font-size: 28px" round color="green" icon="favorite" />

      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Els teus productes</div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn v-close-popup="2" label="Producte 1" color="accent" />
          <q-btn v-close-popup label="Producte 2" color="accent" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>


</template>

<script>
import {reactive, ref, watchEffect, onMounted} from 'vue';
const { ethers } = require("ethers");
import {auth} from "src/router";
import {addSeenProducts, getProductDetails, getProductsInRange} from "app/repository/productsApi";
import { useRouter } from 'vue-router';
import {getUserDetails, validateToken} from "app/repository/usersApi";

export default {

  components: {
  },
  setup () {
    const router = useRouter();
    const token = localStorage.getItem("userToken");
    const productsTabla = ref([]);
    const noProductsLeft = ref(false);
    const user= ref(null);

    if (!token ) {
      router.push({path: '/loginPage'});
    }



    const validatingToken = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const result = await validateToken({token: token});
        if(!result.valid) router.push({path: '/loginPage'});
      } catch (error) {
        console.error(error);
      }
    };

    const getImages = async (start, range) => {
      try {

        await getProductsInRange(start, range, token)
          .then(products => {
            noProductsLeft.value = false;
            products.forEach(product => {
              if(user.value._id != product.user_id){
                productsTabla.value.push(product);
              }
            });
          })
          .catch(error => {
            noProductsLeft.value = true;
            productsTabla.value = [];
            console.error(error)
          })
      } catch (error) {
        console.error(error);
      }
    };

    const getMyUser = async () => {
      try {
        const userDetails = await getUserDetails();
        user.value = userDetails;

      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      validatingToken();
      getMyUser();
      getImages(0, 2); // Fetch images when component is mounted

    });

    return {
      noProductsLeft,
      productsTabla,
      user,
      dialog: ref(false)

    };
  },
  data() {
    return {

      //NEW
      showInformacion: false,
      showBotones: true,
      userProductIndexStart: 1,
      range:2,

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

      currentProductIndex: 0,



      indexArray: [0,1,2,3,4],
      //ENDNEW

    };
  },

  computed: {
    visibleProducts() {
      return this.productsTabla.slice(this.currentProductIndex);
    }
  },
  methods: {
    mostrarInformacion() {
      this.showInformacion = !this.showInformacion;
      this.showBotones = !this.showBotones;
    },
    async getImages(start, range){
      const productsTabla = ref([]);
      const token = localStorage.getItem("userToken");
      await getProductsInRange(start,range, token)
        .then(products => {
          this.noProductsLeft = false;
          productsTabla.value = products;
        })
        .catch(error => {
          this.noProductsLeft = true;
          productsTabla.value = [];
          console.error(error)
        })

      return {
        productsTabla
      };
    },
    async addSeenProducts(number){

      let productsTabla = []
      const token = localStorage.getItem("userToken");

      await addSeenProducts(number, token)
        .then(result => {
        })
        .catch(error => console.error(error))

      return productsTabla;
    },
    pop_icon(icon){


      setTimeout(() => {
        if(icon === "LIKE") {
          this.start_like = false;

        }
        else if(icon === "DISLIKE") {
          this.start_dislike = false;
        }
        else if(icon === "SUPER_LIKE") this.start_super_like = false;

        this.currentProductIndex++;
        this.draggedElement.style.transform = ""; // Reset transform for next card



      }, 300);

      if(icon === "LIKE") {
        this.start_like = true;

      }
      else if(icon === "DISLIKE") {
        this.start_dislike = true;
      }
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

      if(deltaX >= 30) {
        this.dialog = true;
      }



      if(deltaX >= 50 || deltaX <= -50) {
        setTimeout(() => {

          if(!this.noProductsLeft) {
            this.currentProductIndex++;

            if(this.currentProductIndex >= this.productsTabla.length) {
              this.userProductIndexStart = this.userProductIndexStart+2;

              let newProducts = [];


              newProducts = this.getImages(this.userProductIndexStart, this.range);

              newProducts.then(array => {
                // 'array' now contains your array of URLs
                if(array.length === 0) {
                  this.productsTabla = []
                  this.currentProductIndex = 0
                }
                else {
                  this.productsTabla = [];
                }
              }).catch(error => {
                this.currentProductIndex = 0
                console.error('There was an error:', error);
              });

            }
          }

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
  height: 50%;
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
.active-button {
  color: #6a6a6a;
  /*background-color: #312b32;*/
}
</style>
