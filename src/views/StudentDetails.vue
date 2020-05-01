<template>
    <b-container clasc = "detailsContainer" :key="componentKey" v-if="!showSpinner">
        <b-row class = rowContainer>
            <b-card
                tag="student"
                style="max-width: 68.5rem;"
                class="titleCard"
                >
                <div class="headerContainer">
                    <b-img-lazy class="cardImage"  src="https://image.flaticon.com/icons/png/512/194/194931.png"></b-img-lazy>
                    <div class="headerCol">
                        <div class="index">  {{ this.$store.getters.exactStudent[0].index }}</div>
                        <span class="badge" v-if="this.$store.getters.exactStudent[0].lecturePoints==100">
                            <b-badge class="badge" variant="danger">Lecturer</b-badge>
                        </span>
                        <span class="badge" v-if="this.$store.getters.exactStudent[0].index == 30816 ||
                                                  this.$store.getters.exactStudent[0].index == 30769">
                            <b-badge class="badge" variant="success">FrontEnd Dev</b-badge>
                        </span>
                    </div>
                    <div class="headerCol">
                        <div class="group"> {{ this.$store.getters.exactStudent[0].group }} </div>
                        <div class="textLabel">Total:
                            <span class="value">{{this.$store.getters.exactStudent[0].allPoints}}</span>
                        </div>
                        <div class="textLabel">Homework:
                            <span class="value">{{this.$store.getters.exactStudent[0].homeworkPoints}}</span>
                        </div>
                        <div class="textLabel">Mark:
                            <span class="value">{{this.$store.getters.exactStudent[0].mark}}</span>
                        </div>                            
                    </div>
                    <div class="headerCol">
                        <div class="group" style="visibility: hidden;"> Placeholder </div>
                        <div class="textLabel">Presence:
                            <span class="value">{{this.$store.getters.exactStudent[0].presenceCounter}}</span>
                        </div>
                        <div class="textLabel">Absence:
                            <span class="value">{{this.$store.getters.exactStudent[0].absenceCounter}}</span>
                        </div>
                    </div>
                </div>
            </b-card>
        </b-row>

        <b-row class = "rowContainer">
            <b-card v-for="(lab,index) in studentDetails.labs" v-bind:key="index" tag="lab" class="labCard">
                <div class="labHeader">
                    <b-img-lazy class="labImage" src="https://cdn.icon-icons.com/icons2/1367/PNG/512/32officeicons-31_89708.png"></b-img-lazy>
                    <h5> Laboratory {{studentDetails.labs.length - index}} </h5>
                </div>

                <div class="labInfo">
                    <div class="bodyTag">
                        <div class="rowLabel">Date:</div>
                        <div class="rowData">{{lab.dateOfLab}}</div>
                    </div>
                    <div class="bodyTag">
                        <div class="rowLabel">Presence:</div>
                        <div class="rowData">
                            <b-icon-check v-if="lab.presence==true"></b-icon-check>
                            <b-icon-x v-if="lab.presence==false"></b-icon-x>
                        </div>
                    </div>
                    <div class="bodyTag">
                        <div class="rowLabel">Points:</div>
                        <div class="rowData">{{lab.points}}</div>
                    </div>
                </div>    
            </b-card>
        </b-row>
    </b-container>
</template>
<script>

import { BIconX, BIconCheck} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
    components:{
        BIconX,
        BIconCheck
    },
    computed:{
        ...mapGetters(["exactStudent","showSpinner"])
    },
    data() {
        return{
            studentIndex:this.$route.params.index,
            studentDetails:[],
            isLoaded:null,
            componentKey:0,
        }
    },
    props:["allPoints","mark","homeworkPoints","presenceCounter","absenceCounter","index","group","lecturePoints"],
    beforeMount(){
        this.fetchData();
        this.$store.dispatch("getExactStudent", {index: this.studentIndex})
    },

    methods:{
        fetchData: async function () {

        fetch('http://tomaszgadek.com/api/students/' + this.studentIndex)
            .then((response) => {
            return response.json();
        })
            .then((data) => {
            this.studentDetails = data;
        });
    }
  }
}
</script>
<style lang="scss" scoped>
    .titleCard, .labCard{
        display:flex;
        width:100%;
        background-image: url("https://i.imgur.com/Tas5k0W.png");
        background-repeat:repeat-x;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .headerContainer{
        display: flex;
        flex-direction: row;
    }
    .headerCol{
        display: flex;
        flex:5;
        margin-left:3vw;
        flex-direction: column;
    }

    .cardImage{
        display:flex;
        flex:3;
        flex-direction: row;
        height:calc(7vw + 50px);
        width:calc(7vw + 50px);
    }

    .labCard{
        max-width: 15rem;
        margin-top:2rem;
    }

    .detailsContainer{
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .rowContainer{
        display: flex;
        flex-direction: row;
        justify-content:space-around;
        align-items: center;
        margin-bottom:1vw;
        margin-top:1.3vw;
    }
    .labImage{
        width:2.5rem;
        height:2.5rem;
    }
    .labHeader{
        display:flex;
        flex-direction: row;
        align-items: left;
        justify-content: space-between;
    }
    .index, .badge, .group, .textLabel{
        text-align:left;
        font-weight: bold;
    }
    .value{
        font-weight: normal;
    }
    .group, .index{
        font-size:calc(12px + 1.5vw) !important;
    }
    h5{
        margin-left:0.7rem;
    }
    .index{
        margin-left:1vw;
    }
    .textLabel{
        font-size:calc(8px + 1vw) !important;
    }

    .badge{
        font-size:calc(8px + 1vw);
    }

    .labInfo{
        display:flex;
        flex-direction: column;
        margin-top:1rem;
    }
    .bodyTag{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .rowLabel{
        display: flex;
        font-weight: bold;
    }
    .rowData{
        display: flex;
    }
</style>