<template>
  <div>
    <form>
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <label for="type"><strong>Type</strong></label
        ><br /><br />
      </div>
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <span class="radiogroup">
          <input
            type="radio"
            id="Top"
            name="type"
            value="Top"
            v-model="type"
            v-on:change="checkSubmit(type, article, colour, weight)"
          />
          <label for="Top">Top</label>
        </span>
        <span class="radiogroup">
          <input
            type="radio"
            id="Bottom"
            name="type"
            value="Bottom"
            v-model="type"
            v-on:change="checkSubmit(type, article, colour, weight)"
          />
          <label for="Bottom">Bottom</label>
        </span>
      </div>
      <br />
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <label for="article"><strong>Article</strong></label
        ><br />
      </div>
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <input
          style="width: 200px"
          type="text"
          id="article"
          name="article"
          placeholder="T-Shirt, Sweater, etc"
          v-model="article"
          v-on:change="checkSubmit(type, article, colour, weight)"
        />
      </div>
      <br />
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <label for="colour"><strong>Colour</strong></label
        ><br />
      </div>
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <input
          style="width: 200px"
          type="text"
          id="colour"
          name="colour"
          v-model="colour"
          v-on:change="checkSubmit(type, article, colour, weight)"
        />
      </div>
      <br />
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <label for="weight"><strong>Weight</strong></label
        ><br />
      </div>
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <select
          style="width: 200px"
          id="weight"
          name="weight"
          v-model="weight"
          v-on:change="checkSubmit(type, article, colour, weight)"
        >
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Heavy">Heavy</option>
        </select>
      </div>
      <br />
      <div style="text-align: center; width: 200px; margin: 0 auto">
        <button
          id="btnSave"
          :style="[ this.showSubmit ? { backgroundColor: '#222222' } : { backgroundColor: '#adadad' }]"
          @click="saveNewClothing()"
        >
          <!-- <button id="btnSave" @click="createClothing(this.userId, type, article, colour, weight)"> -->
          Save
        </button>
        <!-- <br/><br/><button id="btnCancel" @click="clean()" >Clear</button> -->
      </div>
    </form>
  </div>
</template>

<script>
import { SHOW_ALL_CLOTHES, CREATE_CLOTHING } from "../constants/gql.js";
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default {
  name: "AddClothing",
  data() {
    return {
      id: null,
      userId: this.$store.state.user.data.uid,
      type: "",
      article: "",
      colour: "",
      weight: "",
      showSubmit: false,
      uid: '',
    };
  },

  created: function () {
       this.setUid();
  },

  methods: {
      setUid:
        function() {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.uid = this.$store.state.user.data.uid;
            }
            else {
                this.uid = "demo"
            }
            // console.log(this.uid)
        })
      },

    checkSubmit(type, article, colour, weight) {
      if (type != "" && article != "" && colour != "" && weight != "") {
        this.showSubmit = true;
      } else {
        this.showSubmit = false;
      }
    },

    createClothing(userId, type, article, colour, weight) {
      this.$apollo.mutate({
        mutation: CREATE_CLOTHING,
        variables: {
          userId: userId,
          type: type,
          article: article,
          colour: colour,
          weight: weight,
          wash: false,
          created: new Date().toISOString(),
        },
      });
      this.$apollo.queries.allClothes.refetch();
      this.clean();
    },

    saveNewClothing() {
      if ( this.showSubmit ) {
        this.createClothing(this.userId, this.type, this.article, this.colour, this.weight);
      }
    },

    clean() {
      this.type = "";
      this.article = "";
      this.colour = "";
      this.weight = "";
      this.showSubmit = false;
    },
  },
    apollo: {
        allClothes: { 
            query: SHOW_ALL_CLOTHES,
            variables() {
                return {
                    userId: this.uid,
                }
            }
        }
    },
};
</script>

<style scoped>
.radiogroup {
  padding: 0px 10px;
}
</style>