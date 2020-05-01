import Vue from "vue";
import Vuex from "vuex";
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    students:[],
    allStudents:[],
    displayStudents:[],
    rows:0,
    showSpinner: false,
    exactStudent:[],
  },
  mutations: {
    SET_STUDENTS(state, students){
      state.students = students
    },
    SET_ROWS(state,rows){
      state.rows = rows
    },
    SET_DISPLAY_STUDENTS(state,displayStudents){
      state.displayStudents = displayStudents
    },
    SET_SPINNER(state,spinner) {
      state.showSpinner = spinner;
    },
    SET_EXACT_STUDENT(state,exactStudent){
      state.exactStudent = exactStudent;
    },
    SET_ALL_STUDENTS(state,allStudents){
      state.allStudents = allStudents;
    }
  },
  actions: {
    async fetchData({commit}){
      commit("SET_SPINNER", true);
      return new Promise(resolve => {
        setTimeout(async () => {
          const res = await fetch("http://tomaszgadek.com/api/students");
          const val = await res.json();
          resolve(val);
          commit("SET_SPINNER", false);
        },1000)
      })
    },
    async fetchStudents({dispatch,commit}){
        const myJson = await dispatch("fetchData");
        commit("SET_STUDENTS", myJson);
        commit("SET_ALL_STUDENTS", myJson);
        const displayStudents = myJson.slice(0,9);
        commit("SET_DISPLAY_STUDENTS", displayStudents)
        commit("SET_ROWS", myJson.length)
    },
    async paginate({commit,state}, {currentPage, perPage}){
      const start = (currentPage -1) * perPage;
      const students = state.students.slice(start, start + 9);
      commit("SET_DISPLAY_STUDENTS", students);
    },
    updatePagination({commit,dispatch}, {myJson, currentPage, perPage}){
      commit("SET_STUDENTS", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", {currentPage, perPage});
    },
    search( {dispatch}, {text}){
      const myJson = this.getters.allStudents
      const values = myJson.filter(val => 
        val.index.toLowerCase().includes(text.toLowerCase()));
      dispatch("updatePagination", {myJson: values, currentPage:1, perPage:9})
    },
    async getExactStudent({commit,dispatch},{index}){
      const myJson = await dispatch("fetchData");
      const values = myJson.filter(val => 
        val.index.toLowerCase().includes(index.toLowerCase()));
      commit("SET_EXACT_STUDENT", values)
    },
    sortStudents({commit,dispatch},{sortingStuff,direction}) {
      const students = this.getters.students;
      const sortedStudents = _.orderBy(students, sortingStuff, direction);
      commit("SET_STUDENTS", sortedStudents);
      dispatch("updatePagination", {myJson: sortedStudents, currentPage:1, perPage:9})
    },
    getGroups({commit,dispatch},{groupName}){
      const students = this.getters.allStudents;
      const groupStudents = students.filter( stud => stud.group == groupName );
      commit("SET_STUDENTS", groupStudents);
      dispatch("updatePagination", {myJson: groupStudents, currentPage:1, perPage:9})
    }
  },
  getters:{
    students(state){
      return state.students;
    },
    rows(state){
      return state.rows;
    },
    displayStudents(state){
      return state.displayStudents;
    },
    showSpinner(state){
      return state.showSpinner;
    },
    exactStudent(state){
      return state.exactStudent;
    },
    allStudents(state){
      return state.allStudents;
    }
  },
  modules: {},
});
