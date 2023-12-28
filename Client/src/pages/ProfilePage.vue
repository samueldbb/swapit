<template>
  <q-pull-to-refresh @refresh="getInfoDone" style="height: 100%;">
    <div style="background: #B0E7FF;">
      <div v-if="user" class="profile-info-wrapper" style="display: flex; align-items: center;">
        <button round style="border-radius: 70px; border: none; margin-left:10px;">
          <q-avatar size="150px" >
            <img :src=user.profile_image_url>
          </q-avatar>
        </button>
        <div >
          <div class="profile-info-item" style="margin-left: 10px;">
            <span class="profile-info-label"><q-icon name="person" size="sm"/></span>
            <span class="profile-info-value"> {{ user.name}} {{user.surname}}</span>
          </div>
          <div class="profile-info-item" style="margin-left: 10px;">
            <span class="profile-info-label"><q-icon name="place" size="sm"/></span>
            <span class="profile-info-value">{{ user.localization }}</span>
          </div>
          <div class="profile-info-item" style="margin-left: 10px;">
            <span class="profile-info-label"><q-icon name="mail" size="sm"/></span>
            <span class="profile-info-value">{{ user.email }}</span>
          </div>
        </div>
      </div>
      <q-btn style="margin-left: 60%;margin-bottom: 2%" dense  flat :class="{ 'active-button': state.activeButton === 'ProductCreation' }" @click="state.activeButton='ProductCreation'; $router.push('ProductCreation')" full-width>
        <div style="background-color: #8DAD5C;">
          <q-btn color="#8DAD5C" label="Pujar producte" />
          </div>
      </q-btn>
    </div>

    <div style="background: #FFFFFF;" >
      <div class="row q-gutter-md" style="padding-bottom: 75px">
        <div v-for="productDetails in userProductsDetails" :key="productDetails._id" class="q-col-md-6 q-col-sm-12" style="padding: 10px;  margin-bottom: 0px;">
          <input
            type="checkbox"
            :value="productDetails._id"
            :checked="selectedProductId === productDetails._id"
            @change="updateSelection(productDetails._id)"
          />
          <q-card v-if="productDetails" class="my-card" flat bordered  style="width: 170px; height: 300px; border: 9px solid #B0E7FF;">

            <q-img :src="productDetails.image_url" class="q-img" style="height: 50%; width: 100%; " >

            </q-img>

            <q-card-section >
              <div class="row no-wrap items-center">
                <div class="col text-h7 ellipsis" style="width: 100%;">
                  {{ productDetails.name }}
                </div>
              </div>
            </q-card-section>


            <q-card-section class="q-pt-none" style="flex: 1;">
              <div class="text-caption text-grey" style="width: 100%; max-height: 3em; overflow: hidden; text-overflow: ellipsis;">
                {{ productDetails.description }}
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions style="background: slategrey; margin-top: auto;">
              <q-btn flat color="black" style="max-width: 100%; height: 10%; overflow: hidden; text-overflow: ellipsis;  margin-bottom: -5px;">
                Preu: {{ productDetails.price }}€
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import {reactive, ref } from 'vue';
const { ethers } = require("ethers");
import { onMounted } from 'vue';
import {addProductToSwap, getUserDetails} from 'app/repository/usersApi';
import { getProductDetails } from 'app/repository/productsApi';


export default {

  components: {
  },

  created() {
    this.getInfo();
  },
  setup () {

    const state = reactive({
    });

    const user = ref(null)
    const userProductsDetails = ref([]);

    const selectedProductId = ref(null);

    const updateSelection = (productId) => {
      if (selectedProductId.value === productId) {

      } else {
        selectedProductId.value = productId; // Check new one

        const updates = {
          'product_to_swap': productId,
        }
        const token = localStorage.getItem("userToken");
        addProductToSwap(updates, token)
          .then(response => {

          })
          .catch(error => {
            console.error('Error', error);
          });

      }
    };

    const getInfo = async () => {
      try {
        const userDetails = await getUserDetails();
        user.value = userDetails;

        const promises = user.value.products_user.map(productId => getProductDetails(productId));
        userProductsDetails.value = await Promise.all(promises);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(getInfo);

    return {
      state,
      user,
      userProductsDetails,
      selectedProductId,
      updateSelection,
    }
  },
  methods: {
    getInfoDone(done){
      this.getInfo().then(() => {
        done();
      }).catch(() => {
        done();
      })
    },
    async getInfo(){
      let rows = [];
    }

  }
}
</script>
<style>
.profile-info-wrapper {
  padding: 16px;
}

.profile-info-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  color: #1D1D1D;
}

.profile-info-label {
  font-weight: bold;
  margin-right: 8px;
  color: #1D1D1D;
}

.profile-info-value {
  flex: 1;
  color: #1D1D1D;
}
.active-button {
  color: #6a6a6a;
  /*background-color: #312b32;*/
}
</style>

