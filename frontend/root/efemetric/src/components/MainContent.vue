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
          about="Pierwsze"
          button11 = "Send the metric"
          button12 = "value 4200 and 3 tags"
          button21 = "Click here to  THROW ERROR"
          button22 = ""
          id1 = "basicSendOne"
          id2 = "basicError"
          :click-f1=basicSendOne
          :click-f2=basicError>

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
          about="Drugie"
          button11 = "Send the metric with"
          button12 = "value 5000 only"
          button21 = "Send metric with value 3000"
          button22 = "name: fem_newMetric"
          id1="basicSendTwo"
          id2="basicSendThree"
          :click-f1=basicSendTwo
          :click-f2=basicSendThree>

      </TwoActionButtons>

      <TwoActionButtons
      title="Some explaining..."
      message="Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br>
      Duis aute irure dolor in"
      button1="Simulate long calculations"
      button2="Simulate short calculations"
      about="Trzecie"
      button11 = "Simulate long calculations"
      button12 = ""
      button21 = "Simulate short calculation"
      button22 = ""
      id1="longCount"
      id2="shortCount"
      :click-f1="longCount"
      :click-f2="shortCount">>

      </TwoActionButtons>
    </div>
  </main>

</template>

<script>
import TwoActionButtons from "./TwoActionButtons";
import AboutProject from "./AboutProject";
import Team from "./Team";
import ConnectWithDb from "./ConnectWithDb";
import  * as DatabaseController   from "efemetrics2";

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
  },
  methods:{
    testx(){
      alert("DSADAS")
    },
    basicSendOne(){
      DatabaseController.prepareQuery('metric' ,4200,
          {'tag1':'test', 'tag2':3000, 'tag3':4000})
    },
    basicError(){
      DatabaseController.throwBasicError("example error")
    },
    basicSendTwo(){
      DatabaseController.prepareQuery('NewMetric' ,5000)
    },
    basicSendThree(){
      DatabaseController.prepareQuery('newMetric' ,3000)
    },
    longCount(){
      DatabaseController.catchOwnFunctionPerformance(function (){
        let random =  100000000 + Math.floor((1000000000 - 100000000) * Math.random());
        for (let i = 0; i <random ; i++) {
          let x = i;
        }
      },"longStart","longEnd")
    },
    shortCount(){
      DatabaseController.catchOwnFunctionPerformance(function (){
        let random = 1000000 + Math.floor((10000000 - 1000000) * Math.random());
        for (let i = 0; i <random ; i++) {
          let x = i;
        }
      },"shortStart","shortEnd")
    }




  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
