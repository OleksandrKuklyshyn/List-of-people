<template>
    <div class="container">
        <form action="" v-on:submit.prevent="validateBeforeSubmit" > 
            <div class="row">
                <h1>Form</h1>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="" >First Name</label>
                </div>
                <div class="col-75">
                    <input  type="text" name="name"   placeholder="Your Name ..." v-model.trim="form.fname"  v-validate.initial.$touched="'required|min:3|max:50|alpha'" >
                    <div>
                    <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                </div>
                </div>
                
               
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="">Last Name</label>
                </div>
                <div class="col-75">
                    <input  type="text" name="lastname"   placeholder="Your Last Name ..." v-model.trim="form.lname" v-validate.initial.$touched="'required|min:3|max:50|alpha'">
                </div>
                <div>
                    <span v-show="errors.has('lastname')" class="text-danger">{{ errors.first('lastname') }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="">Gender</label>
                </div>
                <div class="col-75">
                    <select name="gender"   v-model.trim='form.select' v-validate.initial.$touched="'required'" >
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <div>
                    <span  v-show="errors.has('gender')" class="text-danger">{{ errors.first('gender') }}</span>
                </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="">Date of Birth</label>
                </div>
                <div class="col-75">
                    <input  type="date" v-model.trim='form.date' name="date"  v-validate.initial.$touched="'required'">
                    <div>
                    <span v-show="errors.has('date')" class="text-danger">{{ errors.first('date') }}</span>
                </div>
                </div>
                
                <div class="row">
                <button type="submit" value="Submit" >Submit</button>
            </div>
            </div>
            
        </form>
   
    
    </div>

</template>

<script>
export default {
  data() {
      return {
          form: {
              fname: '',
              lname: '',
              select: '',
              date: '',
              
          }
         
      }
  },
  methods: {
    getFormValues: function (){
        this.$http.post('https://vue-first-project-2dd6f.firebaseio.com/posts.json', this.form);
        
        this.errors.clear();
        
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then( () => {
        
         if(!this.errors.any()){
          this.getFormValues();
          
          return;
         } 
        } 
      
      );
    }
  },
  mounted() {
   this.$validator.validate(
     this.$validator.reset(true)
   );
}
  }

</script>

<style scoped>
* {
    box-sizing: border-box;
}
input[type=text], select, textarea, input[type=date] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
button:hover {
  background-color: #45a049;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 5px;
  margin-top: 50px;
}
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
button {
    margin-top: 25px;
}
.text-danger {
    color: red;
}
</style>

