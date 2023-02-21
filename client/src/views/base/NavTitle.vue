<template>
    <div class="nav-content bg-[#324f90] p-[1.5rem] mx-6">
        <div class="nav-title text-[#fbfbff] font-bold text-[15px]">
          <div> {{ title }} </div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>
