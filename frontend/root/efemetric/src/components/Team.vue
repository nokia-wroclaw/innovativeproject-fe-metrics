<template>
    <div class="navibar">
      <a id="Team"></a>
      <h2>Team</h2>
      <div style="line-height:700%;">
        <br>
      </div>
    <TeamMember msg="Aspiring to get a professional full stack developer experience.
    In love with Formula 1 and British rock music from 70s.
    Add a lasagne on top of it and you can imagine the perfect heaven for me."
                alt-img="Marek"
                picture_src="Marek.jpeg"
                name="Marek Kwaśny"></TeamMember>
    <TeamMember msg="I am a sophomore. I like reading books - preferably crime fiction and fantasy,
    riding a bike and programming. My favorite programming language is java. My favorite dish is spaghetti"
                alt-img="Dawid"
                picture_src="Dawid.jpeg"
                name="Dawid Dudek"></TeamMember>
    <TeamMember msg="Hi! I am a computer science student at Wrocław University.
              I love mountains. There are many things I like to do, but what I enjoy most are definitely outdoor sports.
              My favourite programming language is Python.
              I like to keep a positive attitude"
                alt-img="Karolina"
                name="Karolina Szlęk"
                picture_src="Karolina.png"></TeamMember>
    <TeamMember msg="Identifying myself is simple.
      If someone's life revolves around horses, that’s me.
      Owner of a stable and 2 horses.
      I drive tractors, cars with trailers with my best friend and good music. I program sometimes."
                alt-img="Gosia"
                picture_src="Gosia.jpeg"
                name="Małgorzata Leśniak"></TeamMember>
  </div>
</template>

<script>
import TeamMember from "@/components/TeamMember";
export default {
  name: "Team",
  components: {
    TeamMember
  }
}
</script>

<style scoped>

</style>
