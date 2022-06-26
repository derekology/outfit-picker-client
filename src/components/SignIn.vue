<template>
  <div class="signin">
    <h3>Sign in</h3>
    <div>
      <input type="text" v-model="email" placeholder="Email" />
      <br /><br />
      <input type="password" v-model="password" placeholder="Password" />
      <br /><br />
      <button @click="login">Sign In</button>
      <br /><br />
      <p>or Sign in with:
      <br />
      <button @click="googlelogin" class="social-login-button">
        <img alt="Google logo" src="../assets/google-logo.png">
      </button>
      <button @click="facebooklogin" class="social-login-button">
        <img alt="Facebook logo" src="../assets/facebook-logo.png">
      </button>
      </p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

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
          alert("Well done! You are now logged in.");
          // this.$router.replace('home')
        },
        function (err) {
          alert("Oops. " + err.message);
        }
      );
      this.$router.replace("closet");
    },
    googlelogin: function () {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithPopup(auth, provider).then(
        function () {
          alert("Well done! You are now logged in.");
          // this.$router.replace('closet')
        },
        function (err) {
          if ( err.code != "auth/popup-closed-by-user" && err.code != "auth/cancelled-popup-request" ) {
            alert("Oops. " + err.code);
          }
        }
      );      
      this.$router.replace("closet");
    },
    facebooklogin: function () {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();

      signInWithPopup(auth, provider).then(
        function () {
          alert("Well done! You are now logged in.");
          // this.$router.replace('closet')
        },
        function (err) {
          if ( err.code != "auth/popup-closed-by-user" && err.code != "auth/cancelled-popup-request" ) {
            alert("Oops. " + err.code);
          }
        }
      );      
      this.$router.replace("closet");
    },
  },
};
</script>

<style scoped>
  .social-login-button img {
    width: 32px;
    padding: 10px;
    border-radius: 100%;
  }
  .social-login-button img:hover {
    background: #eaeaea;
    transition-duration: 0.3s;
  }
  .social-login-button {
    margin: 15px;
    background: rgb(255,255,255,0%);
    padding: 0px;
  }
</style>