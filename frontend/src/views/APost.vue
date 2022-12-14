<template>
    <div class="form">
      <div class="container">
        <p class="center">A post:</p>
      </div>
      <div class="container">
        <label for="body">Body:</label>
        <input name="body" required v-model="post.body">
      </div>
      <div class="container">
        <button @click="updatePost" class="center">Update</button>
        <button @click="deletePost" class="center">Delete</button>
      </div>
    </div>
</template>
  
<script>
export default {
  name: "HomeView",
  components: {
  },
  data: function() {
    return {
      post: {
        id: "",
        datetime: "",
        body: "nope",
      }
    };
    
  },
  methods: {
    fetchAPost(id) {
      console.log('fetch was called')
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.post = data;
        })
        .catch((err) => console.log(err.message));
    },
    updatePost() {
      // using Fetch - put method - updates a specific post based on the passed id and the specified body
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post),
      })
        .then((response) => {
          console.log(response.data);
          //this.$router.push("/apost/" + this.post.id);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost() {
      // using Fetch - delete method - delets a specific post based on the passed id
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {this.fetchAPost(this.$route.params.id)}
};
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