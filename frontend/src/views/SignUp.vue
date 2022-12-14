<template>
  <div class="form">
    <div class="container">
      <label for="email">Email:</label>
      <input type="email" name="email"  required v-model="email">
    </div>
    <div class="container">
      <label for="password">Password:</label>
      <input type="password" name="password" required v-model="password">
    </div>
    <button @click="SignUp" class="SignUp">SignUp</button>
  </div>
</template>

<script>
export default {
name: "SignUp", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      this.$router.push("/");
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
  }
</script>

<style scoped>
.form {
  width: 30%;
  margin: 0 auto;
  background-color: #d3d3d3;
  padding: 30px;
  margin-top: 100px;
  border-radius: 20px;
  color: #2c3e50;
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  font-weight: bold;
  width: 35%;
  text-align: left;
}
input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    font-size: 1em;
    padding: 0.5em;
    margin: 10px 0 5px 0;
    width: 50%;
    border-radius: 5px;
}
button {
    background-color: #42b983;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    color: white;
    border-radius: 20px;
    font-size: 1em;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}

@media (max-width: 1100px) {
	.form {
		width: 40%;
	}
}
@media (max-width: 1100px) {
	.form {
		width: 70%;
	}
}
</style>