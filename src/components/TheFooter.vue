<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <footer class="shadow border-t mt-2 py-3 bg-gray-100">
    <div class="mx-auto container flex items-start justify-center divide-x">
      <div class="px-3">
        <a
          href="https://github.com/ChanthornAcademy/khmer-lunar"
          target="_blank"
          ><strong>Github</strong></a
        >
      </div>
      <div class="px-3">
        <router-link to="/table"><strong>Table</strong></router-link>
      </div>
      <div class="px-3">
        Develop with love <span class="text-pink-600">♥</span> by:
        <a href="https://github.com/ChanthornAcademy" target="_blank"
          ><strong>ChanthornSP</strong></a
        >
      </div>
      <div class="px-3">
        Khmer Lunar Date By:
        <a href="https://github.com/ThyrithSor/momentkh" target="_blank"
          ><strong>Momentkh</strong></a
        >
      </div>
    </div>
  </footer>
</template>
