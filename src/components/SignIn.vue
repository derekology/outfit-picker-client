<template>
  <div class="signin">
    <h3>Sign in</h3>
    <div>
      <input type="text" v-model="email" placeholder="Email" />
      <br /><br />
      <input type="password" v-model="password" placeholder="Password" />
      <br /><br />
      <button @click="login">Sign In</button>
    </div>
    <br /><br />
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login: function () {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password).then(
        function () {
          // alert("Well done! You are now logged in.");
          // this.$router.replace('home')
        },
        function (err) {
          alert("Oops. " + err.message);
        }
      );
      this.$router.replace("closet");
    },
  },
};
</script>