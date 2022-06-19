<template>
    <div id="main">
        <section id="header">
            <!-- <h1>Outfit Picker</h1> -->
        </section>
        <section id="content">
            <Picker /><br/><br/>
        </section>
    </div>
</template>

<script>
import Picker from "@/components/Picker.vue"

export default {
  name: "OutfitPicker",

  components: {
      Picker,
  },

};
</script>