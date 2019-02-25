<template>
  <div class="container">
    <table id='list_people'>
      <thead>
        <th v-on:click="()=>{arrow(); sort('fname')}" >Name <i v-bind:class="isArrow"></i></th>
        <th v-on:click="()=>{arrow();sort('lname')}" class="sort-by">Surname <i v-bind:class="isArrow"></i></th>
        <th v-on:click="()=>{arrow();sort('select')}" class="sort-by">Gender <i v-bind:class="isArrow"></i></th>
        <th  v-on:click="()=>{arrow();sort('date')}" class="sort-by">Date of birth <i v-bind:class="isArrow"></i></th>
        <th>Edit</th>
      </thead>
      <tr  v-for='user in sortedPeople' :key='user.id' >
        <td >
          <span v-if="user.editmode"><input v-model="user.fname"></span>
          <span v-else>{{user.fname}}</span>
          
        </td> 
        <td >
          <span v-if="user.editmode"><input v-model="user.lname"></span>
          <span v-else>{{user.lname}}</span>
          
        </td> 
        <td>
          <span v-if="user.editmode">
            <select v-model="user.select" required>
              <option>Male</option>
              <option>Female</option>
            </select> 
          </span>
          <span v-else>{{user.select}}</span>
          </td>
        <td> 
          
          <span v-if="user.editmode">
            <input type="date" v-model="user.date">
          </span>
         <span v-else> {{user.date | moment("DD/MM/YYYY")}} </span>
        </td>
        <td>
        <span v-if="!user.editmode " ><button v-show="!isHide" v-on:click="()=>{edit(user); isHide=!isHide}">Edit</button></span>
        <span  v-else ><button v-on:click="()=>{save(user); isHide = false;}">Save</button></span>
        </td>
      </tr>
      
      
    </table>

  
    <table id='list_people' v-if="!formsRelatives.length==0">
            <thead>
                <th>Name</th>
                <th>Surname</th>
                <th>Gender</th>
                <th>Date of birth</th>
                <th>Family ties</th>
            </thead>
            <tr  v-bind:key="user" v-for='user in formsRelatives' >
                <td v-if='!user.editmode'>
                    <span  >{{user.fname}}</span>
                </td>
                <td v-if='!user.editmode'>
                    <span >{{user.lname}}</span>
                </td>
                <td v-if='!user.editmode'>
                    <span >{{user.select}}</span>
                    </td> 
                <td v-if='!user.editmode'>
                  <span> {{user.date | moment("DD/MM/YYYY")}} </span>
                </td>
                <td v-if='!user.editmode'>
                  <span>{{user.relatives}}</span>  
                </td>
            </tr>
        </table>
    
  </div>
</template>

<script>
export default {
 data: function(){
   return {
     isArrow: 'down',
     isHide: false,
     formsRelatives: [],
     formsRelatives2: [],
     forms: [],
     userName: '',
     differ: '',
     date: '',
     dateRelatives: '',
     currentSort:'name',
    currentSortDir:'asc'
     
   }
 },
 props: {

 },
 methods: {
  edit : function(obj){
        this.$set(obj, 'editmode', true);
        const userName = obj.lname;
        this.date = new Date(obj.date).getFullYear();
        for (let i=0; i<this.forms.length; i++){
          if(userName == this.forms[i].lname){
            this.formsRelatives.push(this.forms[i]);
            
            let dateRelatives= new Date(this.forms[i].date).getFullYear();
            let differ = +(this.date) - +(dateRelatives);
            if (differ >= -15 && differ <= 15 ) {
             
              if(this.forms[i].select == 'Male') {

                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Husband/Brother'});
              
              } else if (this.forms[i].select == 'Female') {
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Wife/Sister'});
             }
            } else if (differ >= 16 && differ <= 40) {
              if(this.forms[i].select == 'Male') {
                  
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Father'});
               
              } else {
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Mother'});
             }
            } else if (differ >= 41) {
              if(this.forms[i].select == 'Male') {
                  
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Grandfather'});
               
              } else {
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Grandmother'});
             }
            } else if (differ <= -16 && differ >= -40) {
              if(this.forms[i].select == 'Male') {
                  
                this.formsRelatives2= Object.assign(this.forms[i], {relatives: 'Son'});
               
              } else {
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Daughter'});
             }
            } else if (differ <= -41) {
              if(this.forms[i].select == 'Male') {
                  
                 this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Grandson'});
               
              } else if(this.forms[i].select == 'Female')  {
                this.formsRelatives2 = Object.assign(this.forms[i], {relatives: 'Granddaughter'});
             } 

            } 

         } 
        
        } 
        
  

      },
  save : function(obj){
        this.$set(obj, 'editmode', false);
        this.formsRelatives = [];
      },
  sort:function(s) {
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
  },
  arrow: function() {
    if(this.isArrow == 'down') {
      this.isArrow='up'
    } else {
      this.isArrow='down'
    }
  }
 
 },
 created() {
   this.$http.get('https://vue-first-project-2dd6f.firebaseio.com/posts.json').then(function(data){
           return data.json();
            
        }).then(function(data){
          let formsArray=[];
          for(let key in data){
            data[key].id=key;
            formsArray.push(data[key]);
          }
          this.forms = formsArray;
        })
 },
 computed:{
  sortedPeople:function() {
    return this.forms.slice().sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 50px;
}
#list_people {
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
}
#list_people td, #list_people th {
  border: 1px solid #ddd;
  padding: 8px;
}
#list_people th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
#list_people  tr:nth-child(even){background-color: #f2f2f2;}

#list_people  tr:hover {background-color: #ddd;}
.edit {
  background-color: #4CAF50;
  color: #222;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 6px;
  border: none;
  margin: 0 0 0 5px;
}
th {
  text-align: inherit 
}
table input,select {
  border-radius: 4px;
  border: none;
  background-color: #4CAF50;
  color: #000;
  border-radius: 14px;
  cursor: pointer;
  padding: 5px 10px;
}
i {
  
  border: solid #fff;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 0px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
