<template>
  <header>
    <div class="logo">
      <a href="#">eFEmetrics</a>
    </div>
    <nav>
      <a href="#About">About</a>
      <a href="#Team">Team</a>
      <a href="#Demo Page">Demo Page</a>
      <a href="#Links">Links</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HomePageHeader"
}
</script>

<style scoped>
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
</style>
