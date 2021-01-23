<template>
  <main>
    <img class="photo" src="../assets/tra.png">
    <div class="content-area">
      <AboutProject
          msg="The main purpose of the project was to find a solution to reporting metrics and events from a web application.
					To achieve that, we have created a library. Its basic functionality is sending metrics.
					Each metric has a separate field indicating the creating time, value and tag list.
					Sending the metric can be initiated by event such as click on button or run completely in the background."
          title="eFEmetrics - timers and logins counter for frontend applications" ></AboutProject>
      <Team></Team>
      <Connect-with-db></Connect-with-db>

      <ThreeActionButtons
          title="Basic use case."
          message="The most basic use case is when sending metrics.
          Each metric has a value, name and time of its creation.
          Additionally, each metric can have a list of tags.
          The value can be a number, a boolean value, or a string.
          Same with tags. They are constructed as key-value pairs.
          The chart below shows the values of metrics sent with the buttons next to them.
          As we can see, every few seconds, if we pressed the button, the value is sent."
          about="Sending metrics"
          button11 = "Send the metric"
          button12 = "value 4200 and 3 tags"
          button21 = "Random walk"
          button22 = "between 1000 and 6000"
          button31 = "Send the metric with"
          button32 = "value 3000 only"
          id1 = "basicSendOne"
          id2 = "basicSendTwo"
          id3 = "basicSendThree"
          :click-f1=basicSendOne
          :click-f2=basicSendTwo
          :click-f3=basicSendThree>
      </ThreeActionButtons>

      <NoActionButtons
          title="they hide behind"
          message="The sending may not always be due to explicit user interaction.
          We may want to collect e.g. loading times of individual elements,
          execution of code fragments to find problematic places on the page.
          We can also collect information about the number of people currently
          staying on the website, e.g. to know when the most traffic in our online store is"
          about="Collect the information you need">
      </NoActionButtons>

      <TwoActionButtons
          title="Each event can be important"
          message="You already know that you can send metrics, e.g. by clicking a button
          or send them in the background, regardless of user actions.
          However, we know that every event can be important.
          That is why our library allows you to listen to events occurring on some elements.
          You can define the scope of listening and what exactly events are of interest to you.
          You can use this to send information about how many people have touched the items
          you have selected in your store within an hour (e.g. by sending information about
          the number of clicks or hovers over them with the mouse)."
          about="Grab all the information"
          id="image"
          :click-f1=catchEvents
          :click-f2="basicError">

      </TwoActionButtons>
      <div style="line-height:1000%;">
        <br>
      </div>
    </div>

  </main>

</template>

<script>
import TwoActionButtons from "./TwoActionButtons";
import ThreeActionButtons from "@/components/ThreeActionButtons";
import AboutProject from "./AboutProject";
import Team from "./Team";
import ConnectWithDb from "./ConnectWithDb";
import  * as DatabaseController   from "efemetrics3";
import NoActionButtons from "@/components/NoActionButtons";

export default {
  name: 'MainContent',
  components:{
    ConnectWithDb,
    Team,
    AboutProject,
    TwoActionButtons,
    ThreeActionButtons,
    NoActionButtons
  },
  props: {
    msg: String
  },
  methods:{
    basicSendOne(){
      DatabaseController.prepareQuery('metric' ,4200,
          {'tag1':'test', 'tag2':3000, 'tag3':4000})
    },
    basicError(){
      throw new Error("TEST");
    },
    basicSendTwo(){
      DatabaseController.prepareQuery('NewMetric' ,1000 + Math.floor((6000 - 1000) * Math.random()))
    },
    basicSendThree(){
      DatabaseController.prepareQuery('newMetric' ,3000)
    },
    longCount(){
      DatabaseController.catchOwnFunctionPerformance(function (){
        let random =  100000000 + Math.floor((1000000000 - 100000000) * Math.random());
        let x = 0;
        for (let i = 0; i <random ; i++) {
          x = x + i;
        }
      },"longStart","longEnd")
    },
    shortCount(){
      DatabaseController.catchOwnFunctionPerformance(function (){
        let random = 1000000 + Math.floor((10000000 - 1000000) * Math.random());
        let x = 0;
        for (let i = 0; i <random ; i++) {
          x = x+i
        }
      },"shortStart","shortEnd")
    },
    catchEvents(){
      DatabaseController.catchEvents(document.getElementById("image"),["click"])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photo{
  width:500px;
  height:500px;
}

</style>
