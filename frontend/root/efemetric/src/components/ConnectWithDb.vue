<template>
  <div>
    <div class="navibar">
      <a id="Demo Page"></a>
      <h2>Demo Page</h2>
    </div>
    <h4>Below is a page that shows an example of our library usage. You can use it to see example use cases.</h4>
    <p> To use our library, you first need to connect to some database. Below is an example form that will allow you to do this.<br/>
      The application is adapted to work with TSDB, so it is enough to provide a bucket, token, and database address</p>


    <button  v-if="!isVisible" type="button" class="open-button" id="connectWithDbBtn" @click="handleConnectBtn">
      {{ buttonMsg }}</button>

    <div v-if="isVisible" class="form-popup blank" id="myForm">
      <form action="" class="form-container">
        <h1>Connect</h1>

        <label for="bucket"><b>Bucket</b></label>
        <input v-model="bucket" type="text" placeholder="Enter Bucket"  name="bucket" id="bucket" required>

        <label for="psw"><b>Token</b></label>
        <input v-model="token" type="password" placeholder="Enter Password" name="psw" id="psw">

        <label for="addr"><b>DB Address</b></label>
        <input v-model="addr" type="text" placeholder="Enter DB address"  name="addr" id="addr" required>

        <button type="button" class="btn" id="connectBtn" @click="formFunction" >Connect</button>
      </form>
    </div>
  </div>
</template>

<script>
import * as DatabaseController from "efemetrics";

export default {
  name: "ConnectWithDb",
  data() {
    return {
      bucket: "metrics",
      token: "",
      addr: "http://localhost:8086",
      isVisible: false,
      cookie: DatabaseController.checkCookie(),
    }
  },
  computed:{
    buttonMsg(){
      return this.cookie? "Disconnect" : "Connect with Database";
    }
  },
  methods: {
    sendInCycle() {
      let timestamp = new Date();
      let tags = {}
      tags['seconds'] = timestamp.getSeconds();
      tags['minutes'] = timestamp.getMinutes();
      DatabaseController.prepareQuery("time", timestamp.getSeconds(), tags);
    },
    formFunction() {
      let Url = this.addr;
      let Bucket = this.bucket;
      let Token = this.token;
      DatabaseController.setCookie("database_address", Url);
      DatabaseController.setCookie("token", Token)
      DatabaseController.setCookie("bucket", Bucket);
      DatabaseController.setBucket(Bucket);
      DatabaseController.setUrl(Url);
      DatabaseController.setToken(Token)
      //DatabaseController.setExist(true)
      DatabaseController.checkDb(Bucket)
      DatabaseController.catchPerformanceMeasurements();
      setInterval(DatabaseController.sendQueries, 4000);
      setInterval(this.sendInCycle, 300);
      this.isVisible = false;
      this.cookie = true;

    },
    handleConnectBtn() {
      let button = document.getElementById("connectWithDbBtn");
      if (button.innerText === "Connect with Database") {
        this.openForm();
      } else {
        this.disconnect();
      }
    },
    disconnect() {
      DatabaseController.setCookie("database_address", "");
      DatabaseController.setCookie("token", "")
      DatabaseController.setCookie("bucket", "");
      DatabaseController.setBucket("");
      DatabaseController.setUrl("");
      DatabaseController.setToken("")
      this.isVisible = false
      this.cookie = false
    },
    openForm() {
      this.isVisible = true;
    },
    setListeners(){
      if (this.cookie){
        DatabaseController.catchPerformanceMeasurements();
        setInterval(this.sendInCycle, 1000);
      }
    }
  },
  mounted() {
      DatabaseController.setBucket(DatabaseController.getCookie("bucket"));
      DatabaseController.setUrl(DatabaseController.getCookie("database_address"));
      DatabaseController.setToken(DatabaseController.getCookie("token"));
      DatabaseController.setExist(true);
      setInterval(DatabaseController.sendQueries, 4000);
      this.setListeners();
  },
  updated() {
    DatabaseController.catchPerformanceMeasurements();
  }
}
</script>

<style scoped>

</style>
