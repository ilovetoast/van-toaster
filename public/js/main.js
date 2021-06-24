export default {
  name: "home",
  data: () => ({
    error: "",
    messages: []
  }),

  mounted() {
    fetch('/wifi)
      .then(response => response.json())
      .then(result => {
        this.messages = result;
      });
  },
  methods: {}
};
