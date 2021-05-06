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
                    <img :src="course.img_url">
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
            <div :style="allUserSystemData.length === index + 1 ? 'border: 0;' : '' "
            class="row row-attendence-info ms-0"
            v-for="user,index in allUserSystemData" :key="user.userid">
                <div class="col">
                    <div class="row">
                        <div class="col-3">
                            <a href="#" type="button" data-bs-toggle="modal"
                            data-bs-target="#profileModal"
                            @click.prevent="setChosenParticipantNumber(user.userid);">
                                <div class="attendence-profile-pic">
                                    <img :src="user.img_url">
                                </div>
                            </a>
                        </div>
                        <div v-if="!(user.username.length > 24)"
                            class="col-9 text-start">
                           {{user.username}}
                        </div>
                        <div v-if="user.username.length > 24" class="col-9 text-start">
                            {{filterParticipantNames(user.username)}}
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
      course: {},
      groupInfo: {},
      keys: [],
      allUserSystemData: [],
    };
  },
  created() {
    this.getUserSystemData();
    this.getSelectedCourse();
    this.getKeys();
  },
  methods: {
    getSelectedCourse() {
      this.course = JSON.parse(localStorage.getItem('selectedCourse'));
      this.groupInfo = {
        name: this.course.courseid,
        lecturer: this.course.course_author.split(' -')[0],
      };
      console.log(this.groupInfo);
    },
    getKeys() {
      this.keys = Object.keys(this.groupInfo);
    },
    async getUserSystemData() {
      const res = await fetch('http://localhost:5000/system');
      const data = await res.json();
      data.forEach((user) => {
        this.course.participants.split(',').forEach((participant) => {
          if (participant === user.userid) {
            this.allUserSystemData.push(user);
          }
        });
      });
      this.filterParticipants();
    },
    filterParticipants() {
      let temp = '';
      for (let i = 0; i < this.allUserSystemData.length; i += 1) {
        for (let j = 0; j < this.allUserSystemData.length; j += 1) {
          if (this.allUserSystemData[j].username > this.allUserSystemData[i].username) {
            temp = this.allUserSystemData[j];
            this.allUserSystemData[j] = this.allUserSystemData[i];
            this.allUserSystemData[i] = temp;
          }
        }
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
    max-height: 300px;
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
