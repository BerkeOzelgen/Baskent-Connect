<template>
  <div v-if="session">
    <Navbar></Navbar>
    <div class="modal fade" id="profileModalNavbar" data-bs-backdrop="static"
      data-bs-keyboard="false" aria-hidden="true">
      <div class="modal-dialog modal-dialog-profilepopup modal-dialog-centered">
        <div class="modal-content modal-content-profilepopup">
          <ProfilePopupComp/>
        </div>
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
  data() {
    return {
      session: '',
      userLoginData: {},
      userSystemData: {},
    };
  },
  created() {
    this.checkLoginStatus();
  },
  watch: {
    $route(to, from) {
      this.checkLoginStatus();
      if (from.name === 'Chat' && to.name) {
        this.$socket.disconnect();
      }
    },
  },
  methods: {
    checkLoginStatus() {
      this.session = sessionStorage.getItem('session');
      if (!this.session) {
        if (this.$route.name === 'Home' || this.$route.name === 'Chat') {
          this.$router.push('/login');
        }
      } else {
        this.getUserData();
        this.getUserSystemData();
        if (this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'ForgotPassword') {
          this.$router.push('/');
        }
      }
    },
    async getUserData() {
      const res = await fetch(`http://localhost:5000/user/${this.session}`);
      const data = await res.json();
      this.userLoginData = {
        username: data[0].username,
        password: data[0].username_password,
      };
      this.$store.state.userLoginData = this.userLoginData;
    },
    async getUserSystemData() {
      const res = await fetch(`http://localhost:5000/system/${this.session}`);
      const data = await res.json();
      this.userSystemData = {
        userid: data[0].userid,
        username: data[0].username,
        department: data[0].department,
        img: data[0].img_url,
      };
      this.$store.state.userSystemData = this.userSystemData;
    },
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
.modal-dialog-profilepopup{
  width: 301px;
  height: 470px;
  border-radius: 20px;
}
.modal-content-profilepopup{
  width: 300px;
  height: 470px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
