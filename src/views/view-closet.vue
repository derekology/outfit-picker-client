<template>
  <div id="main">
    <section id="header">
      <!-- <h1>Closet</h1> -->
    </section>
    <section id="content">
      <button id="addOrCancel" @click="isHidden = !isHidden">
        <span v-if="isHidden"> Add Something </span>
        <span v-else> Cancel </span>
      </button>
      <span v-if="!isHidden"
        ><br /><br />
        <span v-if="this.$store.state.user.data"
          ><AddClothing /><br /><a class="fakeLink" v-on:click="signOut"
            >Logout</a
          ><br
        /></span>
        <span v-else><NoAccountHandler /></span>
      </span>
      <br /><br />
      <ShowClothes />
    </section>
  </div>
</template>

<script>
import ShowClothes from "@/components/show-clothes.vue";
import AddClothing from "@/components/add-clothing.vue";
import NoAccountHandler from "@/components/no-account-handler.vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "view-closet",

  data() {
    return {
      isHidden: true,
    };
  },

  methods: {
    signOut: function () {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.state.user.data = null;
          alert("Sign-out successful.");
        })
        .catch(() => {
          alert("An error happened.");
        });
    },
  },

  components: {
    AddClothing,
    ShowClothes,
    NoAccountHandler,
  },
};
</script>

<style scoped>
#addOrCancel {
  margin-top: 16px;
}
</style>
