<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-lg-3 col-md-6 col-xs-12">
        <div class="leftBar" style="height: 44%">
          <div class="cardHeader">
            <h2>Deadlines</h2>
            <hr/>
          </div>
          <div class="cardBody">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div class="leftBar" style="height: 43%">
          <div class="cardHeader">
            <h2>Takvim</h2>
            <hr/>
          </div>
          <div class="cardBody">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-xs-12">
        <div class="cardWrap">
            <div class="row">
              <div class="col-lg-6" v-for="course in filteredCourses" :key="course.courseid">
                <a href="#" style="text-decoration:none;" @click.prevent="goToChatRoom(course)">
                  <div class="cardCustom">
                    <div class="cardHeader">
                      <h2> {{course.courseid}} </h2>
                      <hr/>
                    </div>
                    <div class="cardBody">
                      <p> {{course.course_name}} </p>
                      <p> {{course.course_author}} </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-xs-12">
        <div class="rightBar" style="height:90%">
          <div class="cardHeader">
            <h2>Duyurular</h2>
            <hr/>
          </div>
          <div class="cardBody" style="text:align-left;">
            <a class="mb-2" style="color:black;" href="https://bil.baskent.edu.tr/kw/duyuru_ayrinti.php?did=103885">
              <i class="fas fa-bullhorn"></i> Bilgisayar Mühendisliği Bölümü Bahar Dönemi Seminer Duyurusu<br><br>
            </a>
            <a class="mb-2" style="color:black;" href="https://bil.baskent.edu.tr/kw/duyuru_ayrinti.php?did=103860">
              <i class="fas fa-bullhorn"></i> BİL493 / BİL494 BİTİRME PROJELERİ FİNAL SUNUM TAKVİMİ<br><br>
            </a>
            <a class="mb-2" style="color:black;" href="https://bil.baskent.edu.tr/kw/duyuru_ayrinti.php?did=103875">
              <i class="fas fa-bullhorn"></i> Heraklet Bilişim Yıldızları Staj Programı<br><br>
            </a>
            <a class="mb-2" style="color:black;" href="https://bil.baskent.edu.tr/kw/duyuru_ayrinti.php?did=103872">
              <i class="fas fa-bullhorn"></i> BİLGİSAYAR MÜHENDİSLİĞİ FİNAL SINAVLARI PROGRAMI<br><br>
            </a>
            <a class="mb-2" style="color:black;" href="https://bil.baskent.edu.tr/kw/duyuru_ayrinti.php?did=103153">
              <i class="fas fa-bullhorn"></i> BİL492/494 Bitirme Projesi II<br><br>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userData: {},
      allCourses: [],
      filteredCourses: [],
      session: '',
    };
  },
  created() {
    this.getCourses();
    this.getUserSystemData();
  },
  watch: {
    $route() {
      this.getCourses();
      this.getUserSystemData();
    },
  },
  methods: {
    async getCourses() {
      const res = await fetch('http://localhost:5000/courses');
      const data = await res.json();
      this.allCourses = data;
    },
    async getUserSystemData() {
      this.session = sessionStorage.getItem('session');
      const res = await fetch(`http://localhost:5000/system/${this.session}`);
      const data = await res.json();
      this.userData = data[0];
      this.filterCourses();
    },
    goToChatRoom(course) {
      localStorage.setItem('selectedCourse', JSON.stringify(course));
      this.$router.push('/chat');
    },
    filterCourses() {
      const courseIds = this.userData.courses.split(',');
      this.allCourses.forEach((course) => {
        courseIds.forEach((courseid) => {
          if (course.courseid === courseid) {
            this.filteredCourses.push(course);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.row {
  width: 100%;
  margin: 0;
}

.leftBar {
  border: 1px solid black;
  background: rgba(255, 255, 255, 0.9);
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem;
  font-family: Helvetica;
  position: relative;
  color: black;
  margin-bottom: 2rem;
  border-radius: 5px;
}

.rightBar {
  border: 1px solid black;
  background: rgba(255, 255, 255, 0.9);
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem;
  font-family: Helvetica;
  position: relative;
  color: black;
  margin-bottom: 2rem;
  border-radius: 5px;
}

.cardCustom {
  border: 1px solid black;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  padding: 2rem;
  font-family: Helvetica;
  position: relative;
  color: white;
  text-shadow: 2px 2px black;
  margin-bottom: 2rem;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
}

.cardCustom:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
  transition: 0.3s ease-in-out;
}
</style>
