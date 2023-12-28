<template>
  <q-layout view="lHh Lpr lFf" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: block; background-color: white;">

    <q-bar dense class="bg-black text-white">
      <div>mobi-net</div>
      <q-icon name="email" />
      <q-space />
      <q-icon name="bluetooth" />
      <q-icon name="signal_wifi_4_bar" />
      <q-icon name="signal_cellular_4_bar" />
      <div class="gt-xs">100%</div>
      <q-icon name="battery_full" />
      <div>10:00AM</div>
    </q-bar>

    <q-page-container style="padding-top: unset;position: absolute; top: 23px; bottom: 0px;left: 0;right: 0;overflow: auto">
      <router-view />
    </q-page-container>


  <q-footer v-if="showFooter">
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 60px; background-color: #B0E7FF; color: #ffffff;">

      <q-toolbar style="justify-content: space-between; padding-top: 10px">
        <q-btn dense flat :class="{ 'active-button': state.activeButton === 'MatchList' }" @click="state.activeButton='MatchList'; $router.push('MatchList')" full-width>
          <div class="column items-center justify-center text-center">
            <q-icon :class="{ 'active-button': state.activeButton === 'MatchList' }" name="search" size="20px" style="margin-bottom: -3px"/>
            <div :class="{ 'active-button': state.activeButton === 'MatchList' }" style="font-size: 12px;">Explora</div>
          </div>
        </q-btn>
        <q-btn dense  flat :class="{ 'active-button': state.activeButton === 'ProfilePage' }" @click="state.activeButton='ProfilePage'; $router.push('ProfilePage')" full-width>
          <div class="column items-center justify-center text-center">
            <q-icon :class="{ 'active-button': state.activeButton === 'ProfilePage' }" name="person" size="20px" style="margin-bottom: -3px"/>
            <div :class="{ 'active-button': state.activeButton === 'ProfilePage' }" style="font-size: 12px;">Perfil</div>
          </div>
        </q-btn>
        <q-btn dense  flat :class="{ 'active-button': state.activeButton === 'Messages' }" @click="state.activeButton='Messages'; $router.push('Messages')" full-width>
          <div class="column items-center justify-center text-center">
            <q-icon :class="{ 'active-button': state.activeButton === 'Messages' }" name="favorite" size="20px" style="margin-bottom: -3px"/>
            <div :class="{ 'active-button': state.activeButton === 'Messages' }" style="font-size: 12px;">Swaps</div>
          </div>

        </q-btn>


        <q-btn dense flat :class="{ 'active-button': state.activeButton === '/ConfigurationPage' }" @click="dialog = true"  full-width>
          <div class="column items-center justify-center text-center">
            <q-icon  name="settings" size="20px" style="margin-bottom: -3px"/>
            <div style="font-size: 12px;">Config</div>
          </div>
        </q-btn>

      </q-toolbar>

    </div>
  </q-footer>


    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Opcions</div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn v-close-popup="2" label="Tanca Sessió" @click="cerrarSesion" style="background-color:#5CADA6" />
          <q-btn v-close-popup label="Eliminar Compte" @click="eliminarUsuario" style="background-color: #AD635C" />
        </q-card-section>
      </q-card>
    </q-dialog>



  </q-layout>
</template>

<script>

import {defineComponent, onMounted, reactive, ref} from 'vue'
import Emitter from "tiny-emitter/instance";
import {LocalStorage, useQuasar} from "quasar";
import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { deleteUser } from 'app/repository/usersApi';
import { getUserDetails } from 'app/repository/usersApi';

export default defineComponent({
  name: 'MainLayout',

  components: { },
  setup () {
    const $q = useQuasar();
    const showFooter = ref(true);
    const route = useRoute()
    const hideFooterRoutes = ['/LoginPage','/loginPage','/userCreation','/UserCreation'];

    const state = reactive({
      activeButton: '',  // New state variable for active button
    });

    watch(
      () => route.path,
      (newPath) => {
        showFooter.value = !hideFooterRoutes.includes(newPath);
      },
      { immediate: true } // this will run the watcher immediately after setup
    );

    const user = ref(null)

    onMounted(async () => {
      try {
        const userDetails = await getUserDetails();
        user.value = userDetails;
        localStorage.setItem("user",user.value._id);
      } catch (error) {
        console.error(error);
      }
    });


    return {
      state,
      user,
      $q,
      showFooter
    }
  },
  created () {
    Emitter.on('NEED_TO_APPROVE_CONTRACTS', () => {
      this.needToApprove  = true
    })
    Emitter.on('IN HOME LAYOUT', () => {
      this.inHome  = true
    })
    Emitter.on('IN HOME LAYOUT', () => {
      this.inHome  = true
    })
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods:{
    fetchRole(){
      this.persistent = true;
      this.role = Globals.account.role;
      this.logged = LocalStorage.getItem('userLogged')
    },
    cerrarSesion(){
      localStorage.removeItem("userToken");
      this.$router.push('loginPage');
    },
    eliminarUsuario(){
      deleteUser(localStorage.getItem("user"),localStorage.getItem("userToken"));
    },
    logout(){
      LocalStorage.set("userLogged", false);
      LocalStorage.set("user", null);
      LocalStorage.set("account", null);
      LocalStorage.set("contractAddresses", null);
      Emitter.emit('update_user', '');
      this.$q.notify({
        icon: 'check',
        color: 'positive',
        message: 'Logout Succesful'
      })
      this.persistent=false;
    },
  },
  mounted() {
    let this_ = this;
    this.username = "";
    Emitter.on('update_user', function (param) {
      let user = LocalStorage.getItem('user');
      this_.username = "";
      if (user) this_.username = user.email;
    });
  }
})
</script>

<style scoped>
.active-button {
  color: #6a6a6a;
  /*background-color: #312b32;*/
}
</style>
