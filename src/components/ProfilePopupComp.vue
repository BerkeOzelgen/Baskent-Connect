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
                      <img :src="participants[pIndex].img">
                    </div>
                </div>
            </div>
            <div class="row row-user-info mb-2" v-for="key in keys" v-bind:key="key">
                <div class="col text-start ms-4 me-5">
                    <div class="row profile-topics mb-2">{{userInfo[key].topic}}</div>
                    <div class="row">{{userInfo[key].content}}<hr></div>
                </div>
            </div>
            <div class="row row-profile-picture justify-content-center">LOGO</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProfilePopupComp',
  data() {
    return {
      show: false,
      userInfo: {
        name: {
          topic: 'Ad Soyad',
        },
        number: {
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
    this.getParticipants();
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
  },
  methods: {
    getKeys() {
      this.keys = Object.keys(this.userInfo);
    },
    getParticipants() {
      if (localStorage.getItem('participants')) {
        this.participants = JSON.parse(localStorage.getItem('participants'));
      } else {
        this.participants = [];
      }
    },
    setChosenParticipantNumber() {
      this.participants.forEach((participant, index) => {
        if (participant.number === this.getChosenParticipantNumber) {
          this.pIndex = index;
        }
      });
      this.keys.forEach((key) => {
        if (key === 'number') {
          this.userInfo[key].content = `${this.participants[this.pIndex][key]}@mail.baskent.edu.tr`;
        } else {
          this.userInfo[key].content = this.participants[this.pIndex][key];
        }
      });
    },
  },
};
</script>

<style scoped>
.popupbox{
    height: 470px;
    width: 300px;
    border:1px solid seagreen;
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
    background-color: seagreen;
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
