<template>
  <div >
    <b-navbar toggleable="lg" type="light" class="navbarContainer" fixed="top" >
      <b-img src="https://i.imgur.com/YBYkW8H.jpg" width="40vw" height="40vw" style="margin-right:2vh;"></b-img>
      <div class="brand">Software Testing and Quality</div>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto search" v-if="$router.currentRoute.path == '/'">
          <b-nav-form @submit.prevent="search">
            <b-form-input 
              size="sm" 
              class="mr-sm-2" 
              placeholder="Search"
              v-model="searchText"
            >

            </b-form-input>
            <b-button  size="sm" variant="light" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right class="dropdown" variant="light">
            <template v-slot:button-content>
              Sort by:
            </template>
            <b-dropdown-item @click="sort('allPoints','desc')" >Total Points Descending</b-dropdown-item>
            <b-dropdown-item @click="sort('allPoints','asc')" >Total Points Ascending</b-dropdown-item>
            <b-dropdown-item @click="sort('index','asc')" >Index Ascending</b-dropdown-item>
            <b-dropdown-item @click="sort('index','desc')" >Index Descending</b-dropdown-item>
            <b-dropdown-item @click="sort('presenceCounter','asc')" >Presence Ascending</b-dropdown-item>
            <b-dropdown-item @click="sort('presenceCounter','desc')" >Presence Descending</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right variant="light" style="color:white !important;">
            <template v-slot:button-content>
              Group:
            </template>
            
            <b-dropdown-item @click="search('')" >All</b-dropdown-item>
            <b-dropdown-item @click="group('LT1')" >LT1</b-dropdown-item>
            <b-dropdown-item @click="group('LT2')" >LT2</b-dropdown-item>
            <b-dropdown-item @click="group('LT3')" >LT3</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

         <b-navbar-nav class="ml-auto" v-if="$router.currentRoute.path != '/'">
           <b-button  variant="light" class="my-2 my-sm-0" href="/">Back</b-button>
         </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
    name:'NavBar',
    methods:{
      search(){
        this.$store.dispatch("search", {text: this.searchText})
      },
      sort(sortingStuff, direction){
        this.$store.dispatch("sortStudents",{sortingStuff:  sortingStuff, direction:direction})
      },
      group(groupName){
        this.$store.dispatch("getGroups",{groupName: groupName})
      }

    },
    data() {
      return {
        searchText:''
      }
    },
}
</script>

<style lang="scss">
  #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      background-color: #ffffff;
    }
  }
}
.navbarContainer{
  background-color: rgb(30, 146, 255);
  background-image: url("http://www.allfreepsd.com/download/AllFreePsd-Vector-Graphics-background-03_29.jpg");
  background-size: 181.1%;
}
.brand, .dropdown{
  color:white;
  font-weight: bold;
  font-size:calc(12px+3vh);
}
.search, .form-inline{
  display:flex;
  align-items: center;
  justify-content: center;
}
.navbar-brand{
  display: float;
  align-items: left;
}


</style>