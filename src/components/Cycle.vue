<template>
  <div class="Cycle">
    <h1>{{ trad($db.wording.cycle) }}</h1>
    <div class="Cycle-animation">
      <div class="circle-container">
        <div class="circle-cycle" v-observe-visibility="startVideo">
          <div class="video-cycle">
            <video id="video-start" autoplay muted loop playsinline>
              <source src="../assets/video/cycle.mp4" type="video/mp4" />
            </video>
          </div>
          <div v-if="screenWidth >= 1024" class="desktop-cycle">
            <div
              v-for="(cycle, index) in $db.cycle"
              :key="index"
              :class="[
                'Cycle-circle-text',
                `Cycle-circle-text${index + 1}`,
                { 'Cycle-circle-text-active': currentIndex === index },
              ]"
              @click="changeCycle(index)"
            >
              <Cyclecontent
                :nb="$db.cycle[index].nb"
                :title="trad($db.cycle[index].title)"
                :text="trad($db.cycle[index].textdesktop)"
              />
            </div>
          </div>
          <div
            v-for="(cycle, index) in $db.cycle"
            :key="index"
            :class="[
              'cycle-circle',
              `circle-cycle${index + 1}`,
              { 'selected-circle': index === currentIndex },
            ]"
            @click="changeCycle(index)"
          />
        </div>
      </div>
      <div v-if="screenWidth < 1024" class="mobile-cycle">
        <div :class="`Cycle-circle-text Cycle-circle-text${currentIndex + 1}`">
          <Cyclecontent
            :nb="$db.cycle[currentIndex].nb"
            :title="trad($db.cycle[currentIndex].title)"
            :text="trad($db.cycle[currentIndex].text)"
          />
        </div>
      </div>
    </div>
    <div class="signature">
      <p>{{ trad($db.wording.signature) }}</p>
    </div>
  </div>
</template>
<script>
import Cyclecontent from "@/components/Cyclecontent.vue";
export default {
  name: "Cycle",

  data() {
    return {
      currentIndex: 0,
      currentIndexpro: 0,

      timer: [0, 38, 54, 78, 89],

      screenWidth: 0,
      screenHeight: 0,
      active: null,

      animTime: 1000
    };
  },

  components: {
    Cyclecontent
  },
  created() {},
  mounted() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {},

  methods: {
    changeCycle(index) {
      this.currentIndex = index;
      let myVideo = document.getElementById("video-start");
      myVideo.currentTime = this.timer[index];
    },
    getImage(imgName) {
      return require(`@/assets/${imgName}`);
    },

    startVideo() {
      let myVideo = document.getElementById("video-start");
      myVideo.load();
      myVideo.play();
      myVideo.ontimeupdate = () => {
        const timeVideo = Math.round(myVideo.currentTime);
        const roundedTimer = this.timer.map(x => Math.round(x));
        const findIndex = roundedTimer.indexOf(timeVideo);
        if (findIndex !== -1 && findIndex !== this.currentIndex) {
          this.currentIndex = findIndex;
        }
      };
    },
    onResize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    }
  }
};
</script>
<style scoped lang="scss">
.Cycle {
  text-align: center;
  height: 100vh;
}
.Cycle h1 {
  font-size: 5vw;
  margin-bottom: 3vh;
  @media only screen and (min-width: 1024px) {
    font-size: 1.5vw;
  }
}
.Cycle-animation {
  @media only screen and (min-width: 1024px) {
    justify-content: center;
    display: flex;
    flex: 1;
  }
}
.desktop-cycle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}
.Cycle-circle-text {
  display: flex;
  align-items: center;
  flex: 1;

  z-index: 8;
  @media only screen and (min-width: 1024px) {
    opacity: 0.2;
  }
}
.Cycle-circle-text-active {
  transition: opacity 1s;
  opacity: 1;
  z-index: 8;
}
.Cycle-circle-text1 {
  @media only screen and (min-width: 1024px) {
    position: absolute;
    cursor: pointer;
    bottom: 100%;
    left: 100%;
    z-index: 8;
  }
}
.Cycle-circle-text2 {
  @media only screen and (min-width: 1024px) {
    position: absolute;
    cursor: pointer;
    top: 60%;
    left: 110%;
    z-index: 8;
  }
}
.Cycle-circle-text3 {
  @media only screen and (min-width: 1024px) {
    position: absolute;
    cursor: pointer;
    top: 115%;
    left: 20%;
    right: 0;
    z-index: 8;
  }
  @media only screen and (min-width: 1300px) {
    left: 15%;
    right: 0;
  }
  @media only screen and (min-width: 1400px) {
    left: 3%;
    right: 0;
  }
}
.Cycle-circle-text4 {
  @media only screen and (min-width: 1024px) {
    position: absolute;
    cursor: pointer;
    top: 60%;
    right: 110%;
    z-index: 8;
  }
}
.Cycle-circle-text5 {
  @media only screen and (min-width: 1024px) {
    position: absolute;
    cursor: pointer;
    bottom: 100%;
    right: 100%;
    z-index: 8;
  }
}

.circle-cycle {
  display: flex;
  border-radius: 100%;
  width: 40vh;
  height: 40vh;
  border: 1px solid #d2e7ff;
  margin-top: 6vh;
  margin-bottom: 6vh;
  margin: 0 auto;
  position: relative;

  @media only screen and (min-width: 1024px) {
    margin-top: 0;
    width: 35vh;
    height: 35vh;
    margin-top: 15vh;
  }
}
.video-cycle {
  position: relative;
  overflow: hidden;
  width: 100%;
}
#video-start {
  margin-bottom: 20vh;
  width: auto;
  height: 18vh;
  margin-top: 10.7vh;

  @media only screen and (min-width: 1024px) {
    width: 15vw;
    margin-top: 8vh;
    border-radius: 20%;
  }
}
.cycle-circle {
  background: #77b5fe;
  border-radius: 50%;
  width: 1.8vh;
  height: 1.8vh;
  cursor: pointer;
  border: 2px solid #d2e7ff;
  position: absolute;

  @media only screen and (min-width: 1024px) {
    width: 1.8vh;
    height: 1.8vh;
  }
}
.selected-circle {
  background-color: #0258bd;
  width: 1.5vh;
  height: 1.5vh;
  border: 2px solid #d2e7ff;

  @media only screen and (min-width: 1024px) {
    width: 1.5vh;
    height: 1.5vh;
  }
}
.scroll-top {
  width: 3vh;
  height: 9vh;
  position: relative;
  z-index: 8;
}
.circle-cycle4 {
  margin-top: 25vh;
  @media only screen and (min-width: 1024px) {
    margin-top: 22vh;
  }
}
.circle-cycle5 {
  margin-top: 3vh;
  margin-left: 7vh;
  @media only screen and (min-width: 1024px) {
    margin-top: 3vh;
    margin-left: 5.5vh;
  }
}
.circle-cycle3 {
  margin-top: 39vh;
  margin-left: 19.5vh;

  @media only screen and (min-width: 1024px) {
    margin-top: 34vh;
    margin-left: 17vh;
  }
}
.circle-cycle1 {
  margin-left: 31vh;
  margin-top: 3vh;

  @media only screen and (min-width: 1024px) {
    margin-left: 27.5vh;
    margin-top: 3vh;
  }
}
.circle-cycle2 {
  margin-top: 25vh;
  margin-left: 38vh;

  @media only screen and (min-width: 1024px) {
    margin-top: 22vh;
    margin-left: 33vh;
  }
}

.signature {
  position: absolute;
  bottom: -96%;
  right: 5%;
  font-style: italic;
  @media only screen and (min-width: 1024px) {
    bottom: -90%;
  }
}
</style>
