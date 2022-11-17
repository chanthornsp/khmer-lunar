<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="bg-gray-200 p-2">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between gap-2"
    >
      <div>
        <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">Khmer Chhankitek Calendar</h1>
      </div>
      <div>
        <ul class="flex gap-2">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/author">Thanks to</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>
