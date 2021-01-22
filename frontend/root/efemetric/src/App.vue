<template>
  <div id="app">
    <HomePageHeader></HomePageHeader>
    <MainContent></MainContent>
    <HomePageFooter></HomePageFooter>
  </div>
</template>

<script>

import MainContent from "@/components/MainContent";
import HomePageHeader from "@/components/HomePageHeader";
import HomePageFooter from "@/components/HomePageFooter";

export default {
  name: 'App',
  components: {
    HomePageHeader,
    MainContent,
    HomePageFooter
  },
  head() {
    return {
      title: "efemetrics",

    }
  }
  }
</script>

<style>
body{
  margin: 0;
  text-align: center;
}
.navibar {
  width: 70%;
  margin: 0 auto;
}
header {
  height: 80px;
  background: #262626;
  width: 100%;
  z-index: 10;
  position: fixed;
}
.logo {
  width: 20%;
  float: left;
  line-height: 100px;
  margin-left: 10%;
}
.logo a {
  text-decoration: none;
  font-size: 1.2vw;
  font-family: poppins;
  color: #fff;
  letter-spacing: 5px;
}
nav {
  float: right;
  line-height: 100px;
  margin-right: 10%;
}
nav a {
  text-decoration: none;
  font-family: poppins;
  letter-spacing: 4px;
  font-size: 1.2vw;
  margin: 0 15px;
  color: #fff;
}

.content-area {
  margin-top: 0px;
  width: 100%;
  position: relative;
  background: #ebebeb;
  padding-bottom: 0px;
}
.content-area h2 {
  font-family: poppins;
  letter-spacing: 4px;
  padding-top: 130px;
  font-size: 40px;
  margin: 0;
}
.content-area p {
  padding: 2% 0px;
  font-family: poppins;
  line-height: 30px;
}
.columnTeam {
  float: left;
  width: 40%;
  padding: 10px;
}
.column {
  float: left;
  width: 38%;
  padding-left: 9%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
.elem{
  position: relative;
  top: 5%;
  background-color: darkgray;
  color: white;
  height: 140px;
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
}
.elemValue{
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%) ;
  font-size: 20px;
}
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  display: inline;
}
.img{
  position: relative;
  top: 70px;
  margin: 0 auto;
  margin-top: 50px;
}
.form-popup {
  display: block;
  max-width: 100%;
  padding: 10px;
}
.form-container {
  max-width: 100%;
  margin-top: 35px;
  padding: 10px;
  background-color: white;
}
.elem:hover{
  box-shadow: 5px 10px 18px  #36486b;
}
.elem:active {
  background: #404040;
  -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
  box-shadow: inset 0px 0px 5px #c1c1c1;
  outline: none;
}
.footer{
  height: 80px;
  background: #262626;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  bottom: 0;
}
.img_container{
  display: block;
  height: 100%

}



</style>
