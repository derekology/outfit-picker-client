<template>
  <div id="main">
    <section id="header">
      <!-- <h1>Outfit Picker</h1> -->
    </section>
    <section id="content"><OutfitPicker /><br /><br /></section>
  </div>
</template>

<script>
import OutfitPicker from "@/components/outfit-picker.vue";

export default {
  name: "OutfitPickerView",

  components: {
    OutfitPicker,
  },
};
</script>
