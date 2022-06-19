<template>
  <div>
    <span v-if="!signup">
        <SignIn />
        <br/>
        <a class="fakeLink" v-on:click="switchReg()">No account? Sign up now.</a>
    </span>
    <span v-else>
        <SignUp />
        <br/>
        <a class="fakeLink" v-on:click="switchReg()">Have an account? Sign in now.</a>
    </span>
  </div>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue"

export default {
  name: "NoAccountHandler",

  data() {
    return {
      signup: false,
    };
  },

  methods: {
      switchReg: function () {
          this.signup = !this.signup
          // console.log(this.signup)
      }
  },

  components: {
    SignIn,
    SignUp,
  },

};
</script>