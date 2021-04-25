<template>
    <div class="container main-login-div">
       <div class="main-login-div">
           <div class="card-title">
              <h5>BASKENT CONNECT</h5>
            </div>
            <div class="card align-center card-body-design mb-5">
                <div class="card-body">
                    <div class="form-group">
                        <div class="card-header align-center mb-4">
                            <img class="img-width" src="../assets/Baskent.png">
                        </div>
                        <div class="form-floating align-center input-width mb-3">
                            <input type="email" class="form-control floating-input"
                                id="floatingEmail" placeholder="E-posta Adresi" v-model="newUsername">
                            <label for="floatingEmail">E-posta Adresi</label>
                        </div>
                        <div class="form-floating align-center input-width">
                            <input :type="!showPassword ? 'password' : 'text'"
                            class="form-control floating-input floating-password"
                            id="floatingPassword" placeholder="Şifre" v-model="newPassword">
                            <label for="floatingPassword">Şifre</label>
                            <span><a href="#" class="show-hide" @click.prevent="showHidePassword">
                            <i class="eye"
                            :class="!showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                            </a></span>
                        </div>
                    </div>
                    <div class="align-right me-5 mb-3">
                        <a class="forgot-password" @click="$router.push('/forgotpassword')">
                        Şifrenizi mi unuttunuz?</a>
                    </div>
                        <a href="#" class="btn btn login-button mb-4" @click.prevent="getName">
                        Giriş Yap</a>
                    <div class="mb-3">
                        <p class="first-visit">
                        Buraya ilk defa mı geliyorsunuz? <a class="sign-up"
                        @click="$router.push('/register')">Kayıt ol</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      newUsername: '',
      newPassword: '',
    };
  },
  methods: {
    showHidePassword() {
      if (this.showPassword) {
        this.showPassword = false;
      } else {
        this.showPassword = true;
      }
    },
    async getName() {
      const res = await fetch(`http://localhost:5000/user/${this.newUsername}`);
      const data = await res.json();
      if (data[0]) {
        if (data[0].username_password === this.newPassword) {
          alert('Successfully login');
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('User does not exist!');
      }
    },
  },
};
</script>

<style scoped>
.container{
    margin-top: 7%;
}
.show-hide{
    -ms-transform: translateY(-50%);transform: translateY(-50%);
    position: absolute;
    right: 0;
    top: 50%;
}
.eye{
    margin-right:0.5rem;
    color: #012a47
}
.floating-password{
    position: relative;
}
.forgot-password{
    cursor: pointer;
    color: black;
    font-size: 89%;
    text-decoration: none;
}
.forgot-password:hover{
    text-decoration: underline;
}
input:focus{
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px #012a47;
    border: none;
}
h5{
    color: white;
    font-size: 28px;
    text-shadow: 2px 2px gray;
    font-weight: bold;
}
.main-login-div{
    display: inline-block;
}
.card-title{
    text-align: left;
}
.card-header{
    background-color: rgba(59, 169, 156, 0);
}
.card-body-design{
    width: 27rem;
    display: inline-block;
    border-radius: 15px;
    background-color: rgba(255, 255, 255,0.5);
}
.img-width{
    width: 100%;
}
.floating-input, .floating-input:focus{
    background-color: rgba(255,255,255,0.4);
    outline: none !important;
}
.align-center{
    margin: 0 auto;
}
.input-width{
    width: 19rem;
}
.align-right{
    text-align: right;
}
.first-visit{
    color: black;
    font-size: 89%;
}
.sign-up{
    cursor: pointer;
    color: black;
    font-weight: bold;
}
.login-button{
    background-color: #012a47;
    color: #FFF7F8;
    border-radius: 25px;
    width: 10rem;
}
</style>
