<template>
    <div class="popupbox">
        <div class="row">
            <div class="col text-end mt-2 me-2 close-button-div">
                <button type="button" class="btn-close"
                data-bs-dismiss="modal">
                </button>
            </div>
        </div>
        <div class="row row-profile-picture justify-content-center mb-2">
            <div class="col">
                <div class="circle">
                    <img src="../assets/sikima-definition.png">
                </div>
            </div>
        </div>
        <div class="row row-group-info mb-2" v-for="key in keys" v-bind:key="key">
            <div class="col text-start ms-5 me-5">
                <div class="row justify-content-center"
                :class="'name' === key ? 'group-info-name' : 'group-info-lecturer'">
                {{groupInfo[key]}}</div>
            </div>
        </div>
        <hr class="ms-5 me-5">
        <div class="attendence">
            <div :style="participants.length === index + 1 ? 'border: 0;' : '' "
            class="row row-attendence-info ms-0"
            v-for="participant,index in participants" :key="participant">
                <div class="col">
                    <div class="row">
                        <div class="col-3">
                            <a href="#" type="button" data-bs-toggle="modal"
                            data-bs-target="#profileModal"
                            @click.prevent="setChosenParticipantNumber(participant.number);">
                                <div class="attendence-profile-pic">
                                    <img :src="participant.img">
                                </div>
                            </a>
                        </div>
                        <div v-if="!(participant.name.length > 24)"
                            class="col-9 text-start">
                           {{participant.name}}
                        </div>
                        <div v-if="participant.name.length > 24" class="col-9 text-start">
                            {{filterParticipantNames(participant.name)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GroupInfo',
  data() {
    return {
      groupInfo: {
        name: 'BIL386-02 DEĞİL',
        lecturer: 'Musti Must Mustify-Montent-Menter',
      },
      keys: [],
      participants: [],
    };
  },
  created() {
    this.getKeys();
    this.getParticipants();
  },
  methods: {
    getKeys() {
      this.keys = Object.keys(this.groupInfo);
    },
    getParticipants() {
      if (localStorage.getItem('participants')) {
        this.participants = JSON.parse(localStorage.getItem('participants'));
      } else {
        this.participants = [];
      }
    },
    setChosenParticipantNumber(chosen) {
      this.$store.state.chosenParticipantNum = chosen;
    },
    filterParticipantNames(name) {
      const str = name;
      return `${str.slice(0, 23)}...`;
    },
  },
};
</script>

<style scoped>
hr{
    height: 2px;
}
.close-button-div{
    font-size: 120%;
    color:white;
}
.popupbox{
    width: 400px;
    height: 540px;
    border-radius: 15px;
    border: 1px solid gray;
    color: black;
    background-color:rgba(255, 255, 255, 0.8);
}
.attendence{
    border: 1px solid gray;
    border-radius: 5px;
    height: 300px;
    width: 310px;
    margin: auto;
    overflow: auto;
}
.row-attendence-info{
    height: 60px;
    width: 100%;
    line-height: 60px;
    font-style: italic;
    color: white;
    background-color: gray;
    border-bottom: 1px solid white;
}
.attendence::-webkit-scrollbar {
    width: 0.4rem;
    background-color: rgba(128, 128, 128, 0.7);
}
.attendence::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.8);
    outline: 0.5px solid rgba(255, 255, 255, 0.5);
}
.group-info-name{
    font-weight: bold;
}
.group-info-lecturer{
    font-size: small;
}
.row-profile-picture{
    height: 100px;
}
.circle img{
    height: 100px;
    width: 100px;
    border-radius: 80px;
    margin: auto;
    background-color: white;
}
.row-group-info{
    height: 15px;
}
.attendence-profile-pic img{
    height: 50px;
    width: 50px;
    border-radius: 50px;
}
</style>
