<template>
 <div class="overflow-auto" >
    <b-pagination
      v-model="thisPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(thisPage),scrollToTop()"
    ></b-pagination>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
          thisPage:this.currentPage,
      }
      
    },
    computed:{
      ...mapGetters(["displayStudents"])
    },

    props:["rows","perPage","currentPage"],
    methods:{
        paginate(currentPage) {
            this.$store.dispatch("paginate",{currentPage, perPage: this.$parent.perPage})
        },
        scrollToTop() {
                window.scrollTo(0,0);
           }
    }
  }
</script>