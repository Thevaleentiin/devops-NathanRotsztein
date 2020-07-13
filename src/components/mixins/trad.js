import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ currentLang: "getCurrentLang" }),
  },
  methods: {
    trad(object) {
      let fallback = "en-US";
      if (object[this.currentLang]) {
        return object[this.currentLang];
      } else {
        return object[fallback];
      }
    },
  },
};
