<template>
  <div class="Cyclecontent">
    <div class="cycle-componant-content">
      <div class="nb">
        <p>{{ nb }}</p>
      </div>
      <div class="title">
        <p>{{ title }}</p>
      </div>
    </div>

    <div class="cycle-componant-content">
      <div class="text" v-html="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Cyclecontent",
  props: {
    nb: {
      type: String,
      default: "1"
    },
    title: {
      type: String,
      default: "Titre"
    },
    text: {
      type: String,
      default: "txt"
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.Cyclecontent {
  @media only screen and (min-width: 1024px) {
    max-width: 100%;
  }
}

.cycle-componant-content {
  position: relative;
  margin: 0 auto;
  height: 20px;
  margin-bottom: 2vh;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 5%;
    height: 15px;
  }
}

.nb {
  color: #828282;
  opacity: 0.4;
  font-size: 12vw;
  font-family: sans-serif;
  position: absolute;
  text-align: center;
  top: 1vh;
  left: 0;
  right: 0;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

  @media only screen and (min-width: 1024px) {
    top: -3vh;
    font-size: 6vh;
  }
}
.title {
  color: white;
  font-size: 5vw;
  font-family: sans-serif;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  text-align: center;
  left: 0;
  right: 0;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  @media only screen and (min-width: 1024px) {
    font-size: 2vh;
  }
}

.text {
  color: white;
  font-size: 4vw;
  text-align: center;
  font-family: sans-serif;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  line-height: 2.5vh;
  @media only screen and (min-width: 768px) {
    line-height: 4vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 18vw;
    font-size: 1vw;
    line-height: 2vh;
  }
}
</style>
