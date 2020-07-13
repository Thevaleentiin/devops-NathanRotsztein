<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.humidity > 65   ? 'rain' : ''
    "
  >
    <main>
      <div class="home">
        <div class="translate" @click="toggleLang()">
          <div class="changelang"></div>
          <p class="language">{{ trad($db.wording.changeLang) }}</p>
        </div>
        <div class="app-description">
          <h1>{{ trad($db.wording.hello) }}</h1>
        </div>
        <div class="weather-container">
          <div class="wrap">
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="Entrez une ville..."
                v-model="requeteApi"
                @keypress="fetchWeather"
              />
              <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
            <div class="location-box">
              <div class="location">{{ weather.name }} / {{ weather.sys.country }}</div>
              <div class="date">{{ dateFunction() }}</div>
            </div>

            <div class="weather-box">
              <div class="temp">
                <img class="picto" alt="picto" src="../assets/picto/thermometer.png" />
                {{ Math.round(weather.main.temp) }}°c
                <h1>{{ trad($db.wording.temperature) }}</h1>
              </div>
              <div class="temp">
                <img class="picto" alt="picto" src="../assets/picto/water.png" />
                {{ Math.round(weather.main.humidity) }}%
                <h1>{{ trad($db.wording.humidity) }}</h1>
              </div>
              <div class="temp">
                <img class="picto" alt="picto" src="../assets/picto/fever.png" />
                {{ Math.round(weather.main.feels_like) }}°c
                <h1>{{ trad($db.wording.feels_like) }}</h1>
              </div>
            </div>
            <div class="weather-box">
              <div class="temp">
                <img class="picto" alt="picto" src="../assets/picto/wind.png" />
                {{ Math.round(weather.wind.speed) }}Km/h
                <h1>{{ trad($db.wording.wind) }}</h1>
              </div>
              <div class="temp">
                <img class="picto" alt="picto" src="../assets/picto/cold.png" />
                {{ Math.round(weather.main.temp_min) }}°c
                <h1>{{ trad($db.wording.temperature_min) }}</h1>
              </div>
              <div class="temp">
                <img class="picto" alt="picto" src="../assets/picto/temperature.png" />
                {{ Math.round(weather.main.temp_max) }}°c
                <h1>{{ trad($db.wording.temperature_max) }}</h1>
              </div>
            </div>
          </div>
        </div>
        <div v-if="screenWidth >= 1024" class="next">
          <p>{{ trad($db.wording.next) }}</p>
          <div class="arrow"></div>
        </div>
      </div>
      <Cycle />
    </main>
  </div>
</template>

<script>
import Cycle from "@/components/Cycle.vue";

export default {
  name: "home",
  data() {
    return {
      api_key: "294106c0c27235cb995bbd715c8c2e77",
      url_base: "https://api.openweathermap.org/data/2.5/",
      requeteApi: "",
      weather: {},
      screenWidth: 0,
      screenHeight: 0
    };
  },
  components: {
    Cycle
  },
  created() {},
  mounted() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {},
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    },
    toggleLang() {
      if (this.currentLang === "en-US")
        this.$store.dispatch("setLang", "fr-FR");
      else this.$store.dispatch("setLang", "en-US");
    },

    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.requeteApi}&units=metric&APPID=${this.api_key}`
        )
          .then(res => {
            return res.json();
          })
          .then(this.setResults);
      }
    },

    setResults(results) {
      this.weather = results;
    },
    dateFunction() {
      let d = new Date();
      let months = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
      ];
      let days = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    }
  }
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  color: #fff;
}

#app {
  background-image: url("../assets/background/sky-and-cloud.gif");
  background-size: cover;
  transition: 0.4s;
  height: 100%;
}

#app.rain {
  background-image: url("../assets/background/rain.gif");
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.home {
  height: 100vh;
}
.weather-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
}
.translate {
  display: flex;
  width: 110px;
  justify-content: space-between;
  cursor: pointer;
}
.changelang {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-image: url("../assets/picto/translate.png");
  background-size: cover;
}
.language {
  align-items: center;
  align-content: center;
  height: 30px;
  display: flex;
}
.app-description {
  text-align: center;
  font-size: 2vh;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.search-bar {
  width: 30%;
}
.location-box .location {
  margin-top: 5vh;
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
  display: flex;
  justify-content: space-around;
}

.weather-box {
  display: flex;
  margin-top: 10vh;
  margin-bottom: 10vh;
}
.temp {
  color: grey;
  font-size: 3vw;
  font-style: italic;
  font-weight: bold;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  text-align: center;
}
.temp h1 {
  color: white;
  font-size: 2vw;
  font-style: italic;
  font-weight: bold;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  text-align: center;
}
.picto {
  width: 15%;
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather {
  color: white;
  font-size: 2vw;
  font-style: italic;
  font-weight: bold;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  text-align: center;
}
.next {
  position: absolute;
  top: 91%;
  left: 44%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  color: black;
  font-size: 0.8vw;
  text-decoration: underline;
}
.arrow {
  background-image: url("../assets/picto/arrow.gif");
  background-size: cover;

  width: 8vw;
  height: 8vh;
}
.wrap {
  width: 60vw;
  margin: 0 auto;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid#d2e7ff;
  border-right: none;
  padding: 5px;
  height: 7vh;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: grey;
  font-size: 3vh;
  text-align: center;
}

.searchTerm:focus {
  color: grey;
  font-size: 3vh;
  text-align: center;
}

.searchButton {
  width: 100px;
  height: 7vh;
  border: 1px solid #d2e7ff;
  background: #77b5fe;
  background-image: url("../assets/picto/search.png");
  background-size: 6vh;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 100px;
  text-align: center;
}
</style>
