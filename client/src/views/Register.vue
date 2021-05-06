<template>
    <div class="container">
       <div class="main-login-div">
           <div class="card-title">
              <h5>BASKENT CONNECT</h5>
            </div>
            <div class="card align-center card-body-design mb-5">
                <div class="card-body">
                    <div class="form-group mb-4">
                        <div class="card-header align-center mb-3">
                            <img class="img-width" src="../assets/Baskent.png">
                        </div>
                        <div class="register-title mb-2">
                            Baskent Connect hesabınızı oluşturun</div>
                        <div class="register-text">
                            Lütfen kaydolmak için akademik e-posta adresinizi yazın.
                            <div>(Örnek: '21534564@mail.baskent.edu.tr')</div>
                        </div>
                        <div class="form-floating align-center input-width mb-3 mt-4">
                            <input type="email" class="form-control floating-input"
                             id="floatingEmail" v-model="newPost.username" placeholder="E-posta Adresi">
                            <label for="floatingEmail">E-posta Adresi</label>
                        </div>
                    </div>
                    <div class="mb-4">
                        <a href="#" class="btn btn login-button" @click.prevent="sendNewPost"
                         data-bs-toggle="modal" data-bs-target="#registerModal">
                        E-posta Gönder</a>
                    </div>
                    <div class="mb-3">
                        <div class="first-visit">
                        Baskent Connect hesabınız var mı? <a class="sign-up"
                        @click.prevent="$router.push('/login');">Giriş Yap</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" data-bs-backdrop="static" id="registerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div v-if="!isLoggedinSuccessfully" class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mb-3" :class="!isLoggedinSuccessfully ? '' : 'mt-3' ">
                        {{message}}
                    </div>
                    <div v-if="isLoggedinSuccessfully">
                        <button type="button" data-bs-dismiss="modal" class="btn btn-primary mb-3" @click="$router.push('/login');">
                        Giriş Yap
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      newPost: {
        username: '',
        username_password: '',
      },
      message: '',
      isLoggedinSuccessfully: false,
      allUsers: [],
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const res = await fetch('http://localhost:5000/user');
      const data = await res.json();
      this.allUsers = data;
      console.log(this.allUsers);
    },
    sendNewPost() {
      const newUsername = this.newPost.username.split('@');
      if (newUsername[0].length !== 8 || newUsername[1] !== 'mail.baskent.edu.tr') {
        this.message = 'Lütfen geçerli bir e-posta adresi giriniz.';
        return;
      }
      let isSaved = false;
      this.allUsers.forEach((user) => {
        if (user.username === newUsername[0]) {
          isSaved = true;
        }
      });
      if (isSaved) {
        this.message = 'Bu e-posta adresi zaten sistemde kayıtlıdır.';
        return;
      }
      this.newPost.username = newUsername[0];
      this.randomPasswordGenerator();
      axios.post('http://localhost:5000/user', this.newPost);
      this.newPost.username = '';
      this.message = 'Kayıt işlemi başarıyla gerçekleştirildi.';
      this.isLoggedinSuccessfully = true;
    },
    randomPasswordGenerator() {
      const characters = `${Date.now()}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 8; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.newPost.username_password = result;
    },
  },
};
</script>

<style scoped>
.container{
    margin-top: 7%;
}
.register-title {
    font-size: 120%;
    font-weight: bold;
    font-style: italic;
    color: rgb(8, 7, 7);
}
.register-text {
    font-style: italic;
    opacity: 0.8;
    font-size: 85%;
    color: rgb(8, 7, 7);
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
