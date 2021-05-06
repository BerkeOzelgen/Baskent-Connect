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
                        <div class="forgot-password-title mb-2">
                            Baskent Connect hesabınızı bulun</div>
                        <div class="forgot-password-text">
                            Lütfen kaydolurken kullandığınız e-posta adresinizi yazın.
                            Şifrenizi sıfırlama talimatlarını içeren bir e-posta alacaksınız.
                        </div>
                        <div class="form-floating align-center input-width mb-3 mt-4">
                            <input type="email" class="form-control floating-input"
                             id="floatingEmail" placeholder="email@email.com">
                            <label for="floatingEmail">E-posta Adresi</label>
                        </div>
                    </div>
                    <div class="mb-4">
                        <a href="#" class="btn btn login-button">
                        E-posta Gönder</a>
                    </div>
                    <div class="mb-3">
                        <div class="first-visit">
                        Şifrenizi hatırlıyor musunuz? <a class="sign-up"
                        @click="$router.push('/login')">Giriş Yap</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
};
</script>

<style scoped>
.container{
    margin-top: 7%;
}
.forgot-password-title {
    font-size: 120%;
    font-weight: bold;
    font-style: italic;
    color: rgb(8, 7, 7);
}
.forgot-password-text {
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
