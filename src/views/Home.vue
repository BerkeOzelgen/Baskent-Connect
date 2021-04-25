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
            <div class="col-lg-6" v-for="course in courses" :key="course.courseCode">
              <div class="cardCustom">
                <div class="cardHeader">
                  <h2> {{course.courseCode}} </h2>
                  <hr/>
                </div>
                <div class="cardBody">
                  <p> {{course.courseName}} </p>
                  <p> {{course.courseAuthor}} </p>
                </div>
              </div>
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
          <div class="cardBody">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
      courses: [
        {
          courseCode: 'BIL344',
          courseName: 'Database Systems-Spring',
          courseAuthor: 'Mustafa Sert - msert@baskent.edu.tr',
        },
        {
          courseCode: 'BIL332',
          courseName: 'Operating System-Spring',
          courseAuthor: 'Mehmet Dikmen - mdikmen@baskent.edu.tr',
        },
        {
          courseCode: 'BIL383',
          courseName: 'Yönetim Bilişim Sistemleri-Bahar',
          courseAuthor: 'Gökhan Memiş - gokhanmemis@gmail.com',
        },
        {
          courseCode: 'BIL386',
          courseName: 'Yazılım Mühendisliğine Giriş-Bahar',
          courseAuthor: 'Didem Ölçer - dtokmak@baskent.edu.tr',
        },
        {
          courseCode: 'GSB129',
          courseName: 'KENTLER VE TARİHSEL ÇEVRE-Bahar',
          courseAuthor: 'DR.ÖĞR.ÜYESİ TULGA ALBUSTANLIOĞLU - albustanlioglu@gmail.com',
        },
        {
          courseCode: 'SOS321',
          courseName: 'İletişim-Bahar',
          courseAuthor: 'Doç. Dr. Selay Ilgaz Sümer - silgaz@baskent.edu.tr',
        },
      ],
    };
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
