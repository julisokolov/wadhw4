<template>
  <main>
    <button v-if = "authResult" @click="Logout">Logout</button>
    <article v-for="post in posts" :key="post.id"  @click="Click(post.id)">
      <div style="text-align: right">{{post.datetime.substring(0, 16)}}</div>
      <div class="postText">{{post.body}}</div>
    </article>
    <div class="container">
      <button @click='this.$router.push("/addpost")'>Add post</button>
      <button @click="Deleteall">Delete all</button>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import auth from "../auth";

export default {
  name: "HomeView",
  components: {
  },
  data: function() {
    return {
      posts:[],
      authResult: auth.authenticated()
    }
  },
  methods: {
    Click (id){
      this.$router.push(`/posts/${id}`);
    },

    Deleteall(){
      fetch('http://localhost:3000/api/posts',{method: "DELETE"})
      .then((response) => response.json())
      .then(() => this.posts = [])
      .catch(err => console.log(err.message))
    },

    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
  }, 
  mounted() {
        fetch('http://localhost:3000/api/posts')
        .then((response) => response.json())
        .then(data => this.posts = data)
        .catch(err => console.log(err.message))
    }
};
</script>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	align-items: center
}
article {
	display: flex;
	background-color:	#D3D3D3;
	border-radius: 10px;
	width: 50%;
	padding: 1em;
	flex-direction: column;
	margin: 1em;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}
.container {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.postText {
  text-align: left;
  margin-top: 1em;
  margin-bottom: 1em;
}
@media (max-width: 800px) {
	article {
		width: 95%;
	}
  .container {
		width: 95%;
	}
}
</style>