<template>
  <div class="form">
    <div class="container">
      <p class="center">Add post:</p>
    </div>
    <div class="container">
      <label for="post">Body:</label>
      <input type="text" name="post">
    </div>
    <div class="container">
        <button @click="AddPost"  class="center">Add</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "AddPost", 
    data: function() {
        return {
            post: '',
        }
    },
    methods: {
        AddPost() {
            var data = {
                post: this.post,
            };

            fetch("http://localhost:3000/api/posts", {
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
                    //this.$router.push("/");
                    location.assign("/");
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
p{
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  font-weight: bold;
  width: 35%;
  text-align: center;
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