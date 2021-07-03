
var app = new Vue({
  el: '#app',
  data: {
    hl: 'Toaster',
    wifiData: '',
    wifiloading: false,
    wifiActiveError: false,
    wifiActive: {loaded: false},
    error: false
  },
  methods: {

    getWifiScan: async function(){
      this.wifiloading = true;
      const res = await fetch('/wifi-scan')  ;
      const wifi = await res.json();
      this.wifiloading = false;            

      if(wifi.res){
        this.wifiData = wifi.res;
      }else{
        this.wifiData = wifi.err;
        this.error = true;
      }      
    },
    getWifiActive: async function(){
      const res = await fetch('/wifi-active');
      const wifi = await res.json();
      console.log(wifi)
      if(wifi.res){
        this.wifiActive = wifi.res;
        this.wifiActive.loaded = true;
        //console.log(this.wifiActive)
      }else{
        this.wifiActive = wifi.err;
        this.wifiActiveError = true;
      }    
    },
    range(str){
      return (str) ? str.split("/")[0] : null;
    },
    parseBash: function(){
     return string.split('\n')
    }
  },
  mounted(){
    this.getWifiScan();
    this.getWifiActive();
  }
})
