<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div @click="selectedId = 1" :class="{ selected: selectedId === 1 }">
      1 aaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <div @click="selectedId = 2" :class="{ selected: selectedId === 2 }">
      2 aaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <div @click="selectedId = 3" :class="{ selected: selectedId === 3 }">
      3 aaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <div @click="selectedId = 4" :class="{ selected: selectedId === 4 }">
      4 aaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <div @click="selectedId = 5" :class="{ selected: selectedId === 5 }">
      5 aaaaaaaaaaaaaaaaaaaaaaaaaaaa 
    </div>
  </div>
</template>

<style>
.selected {
  background-color: red;
}
</style>

<script>
export default {
  data() {
    return {
      selectedId: null, // to keep track of the selected div ID
    };
  },
};
</script>
