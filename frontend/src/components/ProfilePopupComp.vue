<template>
    <div class="profilepopup">
        <div class="popupbox mb-2">
            <div class="row row-profile-text justify-content-left ms-0 mb-3">
                <div class="col text-start ">
                  <a type="button" style="color:white;"
                  data-bs-dismiss="modal">
                    <i class="fas fa-arrow-left me-2"></i>
                  </a><b>Profil</b>
                </div>
            </div>
            <div class="row row-profile-picture justify-content-center mb-3">
                <div class="col">
                    <div class="circle">
                      <img :src="img">
                    </div>
                </div>
            </div>
            <div class="row row-user-info mb-2" v-for="key in keys" v-bind:key="key">
                <div class="col text-start ms-4 me-5">
                    <div class="row profile-topics mb-2">{{userInfo[key].topic}}</div>
                    <div class="row">{{userInfo[key].content}}<hr></div>
                </div>
            </div>
            <div class="row row-profile-picture justify-content-center"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProfilePopupComp',
  data() {
    return {
      session: '',
      show: false,
      img: 'x',
      userSystemData: {},
      allUserSystemData: [],
      userInfo: {
        username: {
          topic: 'Ad Soyad',
        },
        userid: {
          topic: 'E-posta Adresi',
        },
        department: {
          topic: 'Bölüm/Fakülte',
        },
      },
      keys: [],
      participants: [],
      pIndex: 0,
    };
  },
  created() {
    this.getKeys();
    this.getUserSystemData();
    this.getAllUserSystemData();
  },
  computed: {
    getChosenParticipantNumber() {
      return this.$store.state.chosenParticipantNum;
    },
  },
  watch: {
    getChosenParticipantNumber() {
      this.setChosenParticipantNumber();
    },
    $route() {
      this.getUserSystemData();
    },
    clicked() {
      this.getUserSystemData();
    },
  },
  methods: {
    async getUserSystemData() {
      this.session = sessionStorage.getItem('session');
      const res = await fetch(`http://localhost:5000/system/${this.session}`);
      const data = await res.json();
      this.userSystemData = {
        userid: data[0].userid,
        username: data[0].username,
        department: data[0].department,
        img: data[0].img_url,
      };
      this.keys.forEach((key) => {
        if (key === 'userid') {
          this.userInfo[key].content = `${this.userSystemData[key]}@mail.baskent.edu.tr`;
        } else {
          this.userInfo[key].content = this.userSystemData[key];
        }
      });
      this.img = this.userSystemData.img;
    },
    getKeys() {
      this.keys = Object.keys(this.userInfo);
    },
    async getAllUserSystemData() {
      const res = await fetch('http://localhost:5000/system');
      const data = await res.json();
      this.allUserSystemData = data;
    },
    setChosenParticipantNumber() {
      this.allUserSystemData.forEach((user, index) => {
        if (user.userid === this.getChosenParticipantNumber) {
          this.pIndex = index;
        }
      });
      this.keys.forEach((key) => {
        if (key === 'userid') {
          this.userInfo[key].content = `${this.allUserSystemData[this.pIndex][key]}@mail.baskent.edu.tr`;
        } else {
          this.userInfo[key].content = this.allUserSystemData[this.pIndex][key];
        }
      });
      this.img = this.allUserSystemData[this.pIndex].img_url;
    },
  },
};
</script>

<style scoped>
.popupbox{
    height: 470px;
    width: 300px;
    border:1px solid rgba(1, 42, 71, 0.9);
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.8);
}
.row-profile-text{
    color: white;
    height: 50px;
    width: 100%;
    line-height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: rgba(1, 42, 71, 0.9);
}
.profile-topics{
  font-style: italic;
  font-weight: bold;
}
.row-profile-picture{
    height: 100px;
}
.row-user-info{
    height: 70px;
}
.circle img{
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin: auto;
    background-color: grey;
}
</style>
