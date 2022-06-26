<template>
  <div>
    <h3>Sign in</h3>
    <div>
    <button v-on:click="emaillogin" class="login-button">
      <img alt="Email login" src="../assets/email-login.png">
    </button>
    <button @click="googlelogin" class="login-button">
      <img alt="Google logo" src="../assets/google-logo.png">
    </button>
    <button @click="facebooklogin" class="login-button">
      <img alt="Facebook logo" src="../assets/facebook-logo.png">
    </button>
    </div>
    <div v-if="emailloginshow">
    <span v-if="!signup">
        <SignIn />
        <br/>
    </span>
    <span v-else>
        <SignUp />
        <a class="fakeLink" v-on:click="switchReg()">Have an account? Sign in now.</a>
    </span>
    </div>
    <span v-if="!signup || !emailloginshow">
        <a class="fakeLink" v-on:click="switchReg()">No account? Sign up now.</a>
    </span>
  </div>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";


export default {
  name: "NoAccountHandler",

  data() {
    return {
      signup: false,
      emailloginshow: false,
    };
  },

  methods: {
    switchReg: function () {
        this.signup = !this.signup
        this.emailloginshow = true
        // console.log(this.signup)
    },
    emaillogin: function () {
        this.emailloginshow = !this.emailloginshow
        // console.log(this.emailloginshow)
    },
    googlelogin: function () {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithPopup(auth, provider).then(
        function () {
          // alert("Well done! You are now logged in.");
          // this.$router.replace('closet')
        },
        function (err) {
          if ( err.code != "auth/popup-closed-by-user" && err.code != "auth/cancelled-popup-request" ) {
            alert("Oops. " + err.message);
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
          // alert("Well done! You are now logged in.");
          // this.$router.replace('closet')
        },
        function (err) {
          if ( err.code != "auth/popup-closed-by-user" && err.code != "auth/cancelled-popup-request" ) {
            alert("Oops. " + err.message);
          }
        }
      );      
      this.$router.replace("closet");
    },
  },

  components: {
    SignIn,
    SignUp,
  },

};
</script>

<style scoped>
  .login-button img {
    width: 32px;
    padding: 10px;
  }
  .login-button img:hover {
    background: #eaeaea;
    transition-duration: 0.3s;
  }
  .login-button {
    margin: 0px 10px 15px 10px;
    background: rgb(255,255,255,0%);
    padding: 0px;
  }
</style>