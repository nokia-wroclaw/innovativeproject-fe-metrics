<template>
  <main>
    <img src="../assets/nokia2.png">
    <div class="content-area">
      <AboutProject
          msg="The main purpose of the project was to find a solution to reporting metrics and events from a web application.
					To achieve that, we have created a library. Its basic functionality is sending metrics.
					Each metric has a separate field indicating the sending time, value and tag list.
					Sending the metric can be initiated by event such as click on button or run completely in the background.
					It allows, inter alia, to: .... [...]"
          title="eFEmetrics - timers and logins counter for frontend applications" ></AboutProject>
      <Team></Team>
      <Connect-with-db></Connect-with-db>

      <TwoActionButtons
          title="Some explaining..."
          message="Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br>
                    Duis aute irure dolor in"
          button1="Send the metric <br>
                            value 4200 and 3 tags <br>"
          button2="Click here to  THROW ERROR"
          about="Pierwsze">

      </TwoActionButtons>

      <TwoActionButtons
          title="Some explaining..."
          message="Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br>
                    Duis aute irure dolor in"
          button1="Send the metric with 	<br>
                            value 5000 only"
          button2="Send metric with value 3000<br>
                            name: fem_newMetric"
          about="Drugie">

      </TwoActionButtons>

      <TwoActionButtons
      title="Some explaining..."
      message="Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br>
      Duis aute irure dolor in"
      button1="Simulate long calculations"
      button2="Simulate short calculations"
      about="Trzecie">
      </TwoActionButtons>
    </div>
  </main>

</template>

<script>
import TwoActionButtons from "./TwoActionButtons";
import AboutProject from "./AboutProject";
import Team from "./Team";
import ConnectWithDb from "./ConnectWithDb";

export default {
  name: 'MainContent',
  components:{
    ConnectWithDb,
    Team,
    AboutProject,
    TwoActionButtons,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
