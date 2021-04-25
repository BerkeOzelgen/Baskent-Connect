<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="back-page" href="#" @click.prevent="$router.go(-1);">
      <i class="fas fa-chevron-left"></i>
    </a>
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="https://pbs.twimg.com/profile_images/560177836024033280/5z2Bb4sF.png"
             width="50" height="45" class="mr-2">BaskentConnect
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"> <!--v-if="currentUser"-->
          <li class="nav-item" v-for="routes in links" :key="routes.id">
            <router-link
              :class="{ active: $route.path === routes.page }"
              class="nav-link"
              :to="routes.page">{{ routes.text }}
            </router-link>
          </li>
        </ul>
        <div class="d-flex user-part">
            <span class="me-2">Musti musti musti</span>
            <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#profileModalNavbar"
              @click.prevent="goToProfile">
              <a class="me-4" type="button" data-bs-toggle="tooltip"
              data-bs-placement="bottom" title="Profile git">
                <img src="../assets/sikima-definition.png">
              </a>
            </a>
            <a href="#" @click.prevent=""><i class="fas fa-sign-out-alt"></i></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/',
        },
        {
          id: 1,
          text: 'Chat',
          page: '/chat',
        },
        {
          id: 2,
          text: 'OYS',
          page: '/login',
        },
      ],
    };
  },
};
</script>

<style scoped>
.navbar{
  padding-right: 0;
}
.back-page{
  font-size: 120%;
  color: white;
}
.user-part{
  line-height: 50px;
  color: white;
}
.user-part img{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.user-part i{
  line-height: 50px;
  font-size: 170%;
}
.user-part a{
  text-decoration: none;
  color:rgba(255,255,255,.5);
}
.user-part a:hover{
  color:white;
}
</style>
