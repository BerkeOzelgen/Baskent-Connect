<template>
  <div v-if="$store.state.currentUser">
    <Navbar></Navbar>
  </div>
  <div class="modal fade" id="profileModalNavbar" data-bs-backdrop="static"
    data-bs-keyboard="false" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <ProfilePopupComp/>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ProfilePopupComp from '@/components/ProfilePopupComp.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    ProfilePopupComp,
  },
};
</script>

<style lang="scss">
body {
  background: url("../src/assets/Frame_6.jpg")no-repeat center center / cover fixed;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: white;
    }
  }
}
.modal-dialog{
  width: 301px;
  height: 470px;
  border-radius: 20px;
}
.modal-content{
  width: 300px;
  height: 470px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
