<template>
  <div class="signup">
    <span id="signup">
      <h3>Sign Up</h3>
      <div>
      <input type="text" v-model="email" placeholder="Email" />
      <br /><br />
      <input type="password" v-model="password" placeholder="Password" />
      <br /><br />
      <input type="password" v-model="confirmPass" placeholder="Confirm Password" />
      <br /><br />
      <button @click="signUp">Sign Up</button>
      </div>
      <br /><br />
    </span>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      confirmPass: "",
    };
  },

  methods: {
    signUp: function () {

      if ( this.password == this.confirmPass && this.password.length > 0 ) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password).then(
          function () {
            alert("Your account has been created!");
          },
          function (err) {
            alert("Oops. " + err.message);
          }
        );
      }
      else {
        alert("Error. Check that password is valid and confirmed.")
      }
    },
  },
};
</script>