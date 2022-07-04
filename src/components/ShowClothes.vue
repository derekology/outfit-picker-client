<template>
  <section>
    <div class="x-overflow">  
          <table>
            <thead>
              <tr>
                <th v-on:click="showIds = !showIds"></th>
                <th>Type</th>
                <th>Article</th>
                <th>Colour</th>
                <th>Weight</th>
                <th>In Wash</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="clothing in allClothes"
                :key="clothing.id"
                v-on:mouseover="hoverId = clothing.id"
                v-on:mouseout="hoverId = ''"
                v-bind:class="{ evenRow: clothing.id % 2 == 0}"
              >
                <td class="id end-col" width="20"><span v-show="showIds === true">{{ clothing.id }}</span></td>
                <td>
                  <span v-show="updateId != clothing.id">{{ clothing.type }}</span>
                  <span v-show="updateId === clothing.id">
                    <select class="editField" :style="{ width: clothing.type.length+3 + 'ch' }" v-model="clothing.type">
                      <option value="Top">Top</option>
                      <option value="Bottom">Bottom</option>
                    </select>
                  </span>
                </td>
                <td>
                  <span v-show="updateId != clothing.id">{{ clothing.article }}</span>
                  <span v-show="updateId === clothing.id">
                    <input class="editField" :style="{ width: clothing.article.length + 'ch' }" type="text" v-model="clothing.article">
                  </span>
                </td>
                <td>
                  <span v-show="updateId != clothing.id">{{ clothing.colour }}</span>
                  <span v-show="updateId === clothing.id">
                    <input class="editField" :style="{ width: clothing.colour.length + 'ch' }" type="text" v-model="clothing.colour">
                  </span>
                </td>
                <td>
                  <span v-show="updateId != clothing.id">{{ clothing.weight }}</span>
                  <span v-show="updateId === clothing.id">
                    <select class="editField" v-model="clothing.weight">
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Heavy">Heavy</option>
                    </select>
                  </span>
                </td>
                <td>
                  <span v-on:click="washClothing(clothing.id, !clothing.wash)"><input type="checkbox" :checked="clothing.wash"></span>
                </td>
                <td class="end-col" width="20">
                  <span class="mod-btn" v-on:click="setUpdateId(clothing, clothing.id, clothing.userid)" v-show="hoverId === clothing.id && updateId != clothing.id"><svg xmlns="http://www.w3.org/2000/svg" fill="#FFA500" width="12" height="12" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg> </span>
                  <span class="mod-btn" v-on:click="updateClothing(clothing.id, clothing.type, clothing.article, clothing.colour, clothing.weight)" v-show="updateId === clothing.id"><svg xmlns="http://www.w3.org/2000/svg" fill="#30BA00" width="12" height="12" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg></span>
                  <span class="mod-btn" v-on:click="cancelUpdateClothing(clothing)" v-show="updateId === clothing.id"><svg xmlns="http://www.w3.org/2000/svg" fill="#FF0000" width="12" height="12" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg></span>
                  <span class="mod-btn" v-on:click="deleteClothing(clothing.id, clothing.userid)" v-show="hoverId === clothing.id && updateId != clothing.id"><svg xmlns="http://www.w3.org/2000/svg" fill="#FF0000" width="12" height="12" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /> "></svg></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  </section>
</template>

<script>
import { SHOW_ALL_CLOTHES, UPDATE_CLOTHING, DELETE_CLOTHING, WASH_CLOTHING } from "../constants/gql.js"
import { getAuth, onAuthStateChanged } from '@firebase/auth'

export default {
    name: "ShowClothes",
    data() {
        return {
            allClothes: [],
            hoverId: "",
            showIds: false,
            uid: '',
            updateId: "",
            oClothingObj: "",
        }
    },

  created: function () {
       this.setUid();
  },

  updated: function () {
       this.$apollo.queries.allClothes.refetch()
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

      setUpdateId(clothing, id, userid) {
        if (userid === 'demo') {
          alert('Cannot edit demo clothing.') }
        else {
          this.oClothingObj = Object.assign({}, clothing);
          this.updateId = id;
          // console.log(this.updateId);
        }
      },

      cancelUpdateClothing(clothing) {
        Object.assign(clothing, this.oClothingObj);
        // console.log(this.oClothingObj);
        this.updateId = "";
        this.oClothingObj = "";
      },

      updateClothing(id, type, article, colour, weight) {
        if (id != "" && type != "" && article != "" && colour != "" && weight != "") {   
          this.$apollo.mutate({
            mutation: UPDATE_CLOTHING,
            variables: {
            id: id,
            type: type,
            article: article,
            colour: colour,
            weight: weight,
            updated: new Date().toISOString(),
            },
          });
            this.$apollo.queries.allClothes.refetch();
            this.updateId = "";
          // console.log(this.updateId)
          }
        else {
            alert('Error. Check that all fields are filled in.');
          }
        },

      deleteClothing(id, userid) {
        if (userid === 'demo') {
          alert('Cannot delete demo clothing.') }
        else {
          const res = this.$apollo.mutate({
            mutation: DELETE_CLOTHING,
            variables: {
              id: id,
            }
          })
          console.log(res)
          this.$apollo.queries.allClothes.refetch() 
          }
        },
      washClothing(id,wash) {
        const res = this.$apollo.mutate({
          mutation: WASH_CLOTHING,
          variables: {
            id: id,
            wash: wash,
          }
        })
        console.log(res)
        this.$apollo.queries.allClothes.refetch()
        },
    },

    apollo: {
        allClothes: { 
            query: SHOW_ALL_CLOTHES,
            variables() {
                return {
                    userid: this.uid,
                }
            }
        }
    },
};
</script>

<style scoped>
table {  
  margin: auto;
  border-collapse: collapse;
}

td {
  padding: 10px 5px 10px 5px;
  max-width: 150px;
}

tr {  
  min-height: 40px;
}

th {
  background-color: #EAEAEA;
  padding: 10px;
}

tr.evenRow {
  background: #FAFAFA;
}

.mod-btn {
  padding-left: 4px;
  padding-right: 4px;
}

.end-col {
  width: 45px;
}

td.end-col {  
  padding: 0px;
}

.editField {
  min-width: 50px;
}

</style>