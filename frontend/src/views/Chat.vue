<template>
    <div class="container">
        <div class="card align-center card-body-design">
            <div class="card-title mb-3">
                <div class="row mt-2 mb-2 ms-4 me-4">
                    <div class="col-1">
                        <div class="group-picture">
                            <img :src="course.img_url">
                        </div>
                    </div>
                    <div class="col-10">
                        <div class="row">
                            <span class="group-name text-start">{{course.courseid}}</span>
                        </div>
                        <div class="row">
                            <span class="group-participants text-start">
                                <span v-for="participant,index in filteredParticipants"
                                :key="participant">{{participant.username}}<span
                                    v-if="index !== filteredParticipants.length - 1">, </span>
                                </span>...
                            </span>
                        </div>
                    </div>
                    <div class="col-1">
                        <a class="group-info float-end me-3" data-bs-toggle="modal" data-bs-target="#groupInfoModal">
                            <i class="fas fa-info-circle"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div>
              <div class="chat-bubbles-area me-2 ms-2">
                  <div v-for="message in allMessages" :key="message">
                      <div :class="message.name === $store.state.userSystemData.username ?
                      'justify-content-end me-1' : 'justify-content-start ms-1'" class="row mb-2">
                          <div :class="message.name === $store.state.userSystemData.username ?
                          'chat-bubble-user me-1' : 'chat-bubble-other'" class="bubble-width text-start">
                              <div v-if="message.name !== $store.state.userSystemData.username" :style="{color: message.color}"
                                class="row justify-content-start chat-bubble-sender-name ms-1 me-3">
                                {{message.name}}
                              </div>
                              <div class="row me-1 ms-1">
                                  <div :class="[message.name === $store.state.userSystemData.username ? '' : 'pl-0 pr-0',
                                  message.name === $store.state.userSystemData.username ? (message.content.length > 8 ?
                                  '' : 'col me-1') : (message.content.length > 8 ?
                                  'w-90' : 'col')]" class="">
                                    {{message.content}}
                                  </div>
                                  <div :class="[message.name === $store.state.userSystemData.username ?
                                  'bubble-send-time pl-0 pr-0' : 'bubble-send-time-other ms-1 me-1',
                                  message.name === $store.state.userSystemData.username ? (message.content.length > 8 ?
                                  '' : 'col ms-1 me-1 user-send-time') :
                                  (message.content.length > 8 ? 'me-1' : 'col ms-1 pr-0')]"
                                  class="row justify-content-end">
                                    {{message.time}}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row justify-content-center chat-input-area">
                  <div class="col">
                      <div class="input-group">
                          <button class="btn btn-outline-light input-group-text">
                            <i class="fas fa-paperclip"></i>
                          </button>
                          <input type="text" class="form-control" v-model="newMessage"
                          placeholder="Mesaj giriniz..." @keyup.enter="sendMessage();">
                          <button class="btn btn-light input-group-text" @click="sendMessage();">Gönder</button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="groupInfoModal" data-bs-backdrop="static"
        data-bs-keyboard="false" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-group-info">
            <div class="modal-content modal-content-group-info">
              <ChatInfo/>
            </div>
          </div>
        </div>
        <div class="modal fade fade2" id="profileModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-profile-popup">
            <div class="modal-content modal-content-profile-popup">
              <ProfilePopupComp/>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import ChatInfo from '@/components/ChatInfo.vue';
import ProfilePopupComp from '@/components/ProfilePopupComp.vue';

export default {
  name: 'Chat',
  components: {
    ChatInfo,
    ProfilePopupComp,
  },
  created() {
    this.getSelectedCourse();
    this.getUserSystemData();
    this.orderParticipantColors();
    this.$socket.connect();
  },
  data() {
    return {
      course: {},
      newMessage: null,
      allMessages: [],
      chosen: {
        name: [],
        color: [],
      },
      senderColors: [],
      participants: [],
      filteredParticipants: [],
    };
  },
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    if (!this.showChatInfo) {
      this.scrollToEnd();
    }
  },
  methods: {
    getSelectedCourse() {
      this.course = JSON.parse(localStorage.getItem('selectedCourse'));
    },
    getChatInfo() {
      if (this.showChatInfo) {
        this.showChatInfo = false;
        return;
      }
      this.showChatInfo = true;
    },
    async getUserSystemData() {
      const res = await fetch('http://localhost:5000/system');
      const data = await res.json();
      data.forEach((user) => {
        this.course.participants.split(',').forEach((participant) => {
          if (participant === user.userid) {
            this.participants.push(user);
          }
        });
      });
      this.filterParticipants();
    },
    filterParticipants() {
      let temp = '';
      for (let i = 0; i < this.participants.length; i += 1) {
        for (let j = 0; j < this.participants.length; j += 1) {
          if (this.participants[j].username > this.participants[i].username) {
            temp = this.participants[j];
            this.participants[j] = this.participants[i];
            this.participants[i] = temp;
          }
        }
      }
      const someParticipants = [];
      for (let i = 0; i < 5; i += 1) {
        if (i === this.participants.length) {
          break;
        }
        someParticipants.push(this.participants[i]);
      }
      this.filteredParticipants = someParticipants;
    },
    scrollToEnd() {
      const container = document.querySelector('.chat-bubbles-area');
      container.scrollTop = container.scrollHeight;
    },
    getCurrentTime() {
      const d = new Date().toLocaleString();
      const x = d.split(' ')[1].split(':');
      return `${x[0]}:${x[1]}`;
    },
    orderParticipantColors() {
      this.allMessages.forEach((message) => {
        this.allMessages.forEach((innerMessage, index) => {
          if (message.name === innerMessage.name) {
            this.allMessages[index].color = message.color;
          }
        });
      });
    },
    setColor(username) {
      if (this.senderColors.length === 0) {
        this.senderColors = [
          'purple',
          'hotpink',
          'green',
          'orange',
          'navy',
          'red',
          'lightseagreen',
        ];
      }
      if (!this.chosen.name.includes(username)) {
        const color = this.randomizeColor();
        this.chosen.color.push(color);
        this.chosen.name.push(username);
        return color;
      }
      const x = this.chosen.name.indexOf(username);
      return this.chosen.color[x];
    },
    randomizeColor() {
      const color = this.senderColors[Math.floor(Math.random()
      * this.senderColors.length)];
      this.senderColors.splice(this.senderColors.indexOf(color), 1);
      return color;
    },
    sendMessage() {
      if (!this.newMessage) {
        return;
      }
      const color = this.setColor(this.$store.state.userSystemData.username);
      this.$socket.emit('new_message', {
        name: this.$store.state.userSystemData.username,
        content: this.newMessage,
        color,
        time: this.getCurrentTime(),
      });
      this.newMessage = '';
    },
  },
  watch: {
    allMessages() {
      this.orderParticipantColors();
    },
  },
  sockets: {
    messages(data) {
      this.allMessages = data;
    },
  },
};
</script>

<style scoped>
.modal-content-profile-popup{
  width: 301px;
  height: 470px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  transform: translate(-351px,-15px);
}
.modal-dialog-profile-popup{
  width: 300px;
  height: 0px;
}
.modal-content-group-info{
  width: 401px;
  height: 540px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  transform: translate(0,20px);
}
.modal-dialog-group-info{
  width: 400px;
  height: 0px;
}
.container{
  margin: 2rem auto;
}
.card{
  border: none;
}
.row{
  display: flex;
  align-items: center;
}
::placeholder{
    font-style: italic;
    color: #012a47;
    opacity: 0.6;
}
.card-title{
    opacity: 0.8;
    color: white;
    text-align: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #012a47;
}
.input-group{
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(1, 42, 71, 0.9);
    box-shadow: 2px 1.5px 1.5px #012a47;
    border-radius: 10px;
}
.btn-outline-light, .btn-light{
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.3);
    color: rgba(1, 42, 71, 0.9);
    border: none;
    box-shadow: none;
    border-radius: 10px;
}
.btn-outline-light:hover, .btn-light:hover{
    background-color: rgba(1, 42, 71, 0.9);
    color: white;
    box-shadow: none;
    border-radius: 8px;
}
.form-control{
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: none;
    border: none;
    border-right: 1px solid #012a47;
    border-left: 1px solid #012a47;
    color: #012a47;
}
.group-picture img{
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background-color: white;
    display: inline-block;
}
.group-name{
    color: white;
    font-size: 130%;
    font-weight: 600;
    line-height: 1.5rem;
    vertical-align: top;
}
.group-participants {
    font-size: 75%;
    font-style: italic;
    vertical-align: top;
    line-height: 1.5rem;
}
.group-info{
    cursor: pointer;
    line-height: 3rem;
    vertical-align: top;
    font-size: 120%;
    color: white;
}
.card-body-design{
    width: 66rem;
    height: 33rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255,0.5);
}
.chat-input-area{
    margin-top: 1rem;
    margin-left: 5.5rem;
    margin-right: 5.5rem;
    width: 55rem;
    position: absolute;
}
.chat-bubbles-area{
    height: 24rem;
    overflow-x: hidden;
    overflow-y: auto;
}
.chat-bubbles-area::-webkit-scrollbar {
    width: 0.4rem;
    background-color: rgba(255, 255, 255, 0.5);
}
.chat-bubbles-area::-webkit-scrollbar-thumb {
    background-color: rgba(1, 42, 71, 0.8);
    outline: 0.5px solid rgba(255, 255, 255, 0.5);
}
.chat-bubble-sender-name{
    font-size: 90%;
    font-style: italic;
    font-weight: bolder;
}
.bubble-send-time{
    color:silver;
    font-size: 60%;
    font-style: italic;
}
.bubble-send-time-other{
    color:black;
    font-size: 60%;
    font-style: italic;
}
.user-send-time{
    line-height: 1.2rem;
    padding-top: 10px;
}
.chat-bubble-user, .chat-bubble-other{
    font-size: 95%;
    padding: 0.2rem;
    border-radius: 1rem;
    line-height: 1.5rem;
    color: white;
    display: inline-block;
    background-color: rgba(1, 42, 71, 1);
    border: 1px solid white;
    opacity: 0.8;
}
.chat-bubble-other{
    background-color: white;
    color:black;
    border: 1px solid black;
}
.bubble-width{
    width: auto;
    min-width: 10rem;
    max-width: 20rem;
}
.align-center{
    margin: 0 auto;
}
.align-right{
    text-align: right;
}
.w-90{
    width: 90%;
}
.pl-0 {
    padding-left: 0;
}
.pr-0{
    padding-right: 0;
}
</style>
