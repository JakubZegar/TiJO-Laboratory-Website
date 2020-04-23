<template>
  <b-container align-v="center">
    <b-row>
      <b-col v-for="(student,index) in students" v-bind:key="index">{{student.index}}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    
  },

  data: function () {
    return {
      students:[]
    }
  },

  mounted(){
    this.fetchData('students/');
  },

  methods:{
    fetchData: async function (apiLink) {

      fetch('http://tomaszgadek.com/api/' + apiLink)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.students = data;
        });
    }
  }
};
</script>
