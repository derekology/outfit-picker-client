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
                <td class="id" width="20"><span v-show="showIds === true">{{ clothing.id }}</span></td>
                <td>{{ clothing.type }}</td>
                <td>{{ clothing.article }}</td>
                <td>{{ clothing.colour }}</td>
                <td>{{ clothing.weight }}</td>
                <td><span v-on:click="washClothing(clothing.id, !clothing.wash)"><input type="checkbox" :checked="clothing.wash"></span></td>
                <td class="delete" width="20"><span v-on:click="deleteClothing(clothing.id)" v-show="hoverId === clothing.id"><svg xmlns="http://www.w3.org/2000/svg" fill="#FF0000" width="12" height="12" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /> "></svg></span></td>
              </tr>
            </tbody>
          </table>
        </div>
  </section>
</template>

<script>
import { SHOW_ALL_CLOTHES, DELETE_CLOTHING, WASH_CLOTHING } from "../constants/gql.js"
import { getAuth, onAuthStateChanged } from '@firebase/auth'

export default {
    name: "ShowClothes",
    data() {
        return {
            allClothes: [],
            hoverId: "",
            showIds: false,
            uid: '',
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

      deleteClothing(id) {
        if (this.uid == 'demo') {
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
                    userId: this.uid,
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
}

th {
  background-color: #EAEAEA;
  padding: 10px;
}

tr.evenRow {
  background: #FAFAFA;
}

</style>