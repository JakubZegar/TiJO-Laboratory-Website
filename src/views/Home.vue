<template>
  <b-container class="container" >
    <b-row v-if="!showSpinner" md="4" class="studentContainer">
        <Student v-for="(student,index) in this.$store.getters.displayStudents" v-bind:key="index" :index="student.index" 
                 :mark="student.mark" :group="student.group" :lecturePoints="student.lecturePoints"
                 :homeworkPoints="student.homeworkPoints" :presenceCounter="student.presenceCounter"
                 :absenceCounter="student.absenceCounter" :allPoints="student.allPoints">
        </Student>
    </b-row>
    <Pagination v-if="!showSpinner" class="pagination" :rows="this.rows" :currentPage="this.currentPage" :perPage="this.perPage" ></Pagination>  
  </b-container>
</template>

<script>
import Student from '../components/Student'
import Pagination from '../components/Pagination'
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {
    Student,
    Pagination,
  },

  computed:{
    ...mapGetters(["students", "rows", "showSpinner"])
  },

  data: function () {
    return {
      currentPage:1,
      perPage:9,
    }
  },

  mounted(){
    this.fetchData();
  },

  methods:{
    fetchData: async function () {
      await this.$store.dispatch("fetchStudents");
    }
  }
};
</script>

<style lang="scss" scoped>
  .studentContainer{
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .container{
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .pagination{
    margin-top:20px;
  }
</style>
