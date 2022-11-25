<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <footer class="shadow border-t mt-2 py-3 bg-gray-100">
    <div
      class="mx-auto container flex flex-col md:flex-row items-start justify-center md:divide-x"
    >
      <div class="p-3 md:p-0 md:px-3">
        <a
          href="https://github.com/ChanthornAcademy/khmer-lunar"
          target="_blank"
          ><strong>Github</strong></a
        >
      </div>
      <div class="p-3 md:p-0 md:px-3">
        <router-link to="/table"><strong>Table</strong></router-link>
      </div>
      <div class="p-3 md:p-0 md:px-3">
        Develop with love <span class="text-pink-600">♥</span> by:
        <a href="https://github.com/ChanthornAcademy" target="_blank"
          ><strong>ChanthornSP</strong></a
        >
      </div>
      <div class="p-3 md:p-0 md:px-3">
        Khmer Lunar Date By:
        <a href="https://github.com/ThyrithSor/momentkh" target="_blank"
          ><strong>Momentkh</strong></a
        >
      </div>
      <div class="p-3 md:p-0 md:px-3">
        Build With:
        <a href="https://vuejs.org/" target="_blank"><strong>Vue3</strong></a>
        and
        <a href="https://tailwindcss.com/" target="_blank"
          ><strong>Tailwind CSS</strong></a
        >
      </div>
    </div>
  </footer>
</template>
