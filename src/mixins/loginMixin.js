import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default {
  created() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("fetchUser", user);
      } else {
        // this.$store.dispatch("fetchUser", user);
        console.log("Not logged in");
      }
    });
  },
};
