<template>
  <div id="app">
    <HomePageHeader></HomePageHeader>
	<AboutProject msg="The main purpose of the project was to find a solution to reporting metrics and events from a web application. 
					To achieve that, we have created a library. Its basic functionality is sending metrics. 
					Each metric has a separate field indicating the sending time, value and tag list. 
					Sending the metric can be initiated by event such as click on button or run completely in the background. 
					It allows, inter alia, to: .... [...]
"
title="eFEmetrics - timers and logins counter for frontend applications" ></AboutProject>
    <Team></Team>
  </div>
</template>

<script>
import HomePageHeader from "@/components/HomePageHeader";
import Team from "@/components/Team";
import AboutProject from "@/components/AboutProject.vue";
export default {
  name: 'App',
  components: {
    HomePageHeader,
    Team,
	AboutProject
  }
}
</script>

<style>
body{
  margin: 0;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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
.banner-area {
  width: 100%;
  height: 450px;
  position: fixed;
  top: 80px;
  background-image: url(/img/nokia2.png);
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center center;
}
.content-area {
  width: 100%;
  position: relative;
  top: 550px;
  background: #ebebeb;
  height: 4700px;
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
  display: none;
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
  position: absolute;
  bottom: 0;
}
.img_container{
  display: block;
  margin: 10px auto;
  height: 100%
}
</style>
