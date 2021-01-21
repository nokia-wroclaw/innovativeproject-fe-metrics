<template>
    <div class="navibar">
      <a id="Team"></a>
      <h2>Team</h2>
      <div style="line-height:700%;">
        <br>
      </div>
    <TeamMember msg="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi.
                        Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra ."
                alt-img="Marek"
                picture_src="Marek.jpeg"
                name="Marek Kwaśny"></TeamMember>
    <TeamMember msg="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi.
                        Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra ."
                alt-img="Dawid"
                picture_src="Dawid.jpeg"
                name="Dawid Dudek"></TeamMember>
    <TeamMember msg="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi.
                        Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra ."
                alt-img="Karolina"
                name="Karolina Szlęk"
                picture_src="Karolina.png"></TeamMember>
    <TeamMember msg="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi.
                        Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra ."
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
