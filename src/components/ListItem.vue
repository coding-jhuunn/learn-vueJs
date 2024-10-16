<script setup>
import { onUpdated } from "vue";
const props = defineProps({
  id: Number,
  msg: String,
  isActive: Boolean,
});
onUpdated(() => {
  console.log("updating" + props.id);
});
</script>
<template>
  <li>
    <span v-if="isActive">-></span>
    {{ msg }}
  </li>
</template>
