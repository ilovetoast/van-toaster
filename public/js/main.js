
var app = new Vue({
  el: '#app',
  data: {
    hl: 'Toaster',
    wifiData: '',
    error: false
  },
  methods: {
    wifi: async function(){
      const res = await fetch('/wifi')  ;
      const wifi = await res.json();            

      if(wifi.res){
        this.wifiData = wifi.res;
      }else{
        this.wifiData = wifi.err;
        this.error = true;
      }      
    }
  },
  mounted(){
    this.wifi()
  }
})
