<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="bg-white shadow-md p-2">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between gap-2 items-center"
    >
      <div>
        <h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          Khmer Chhankitek Calendar
        </h1>
      </div>
      <div>
        <ul class="flex overflow-x-auto whitespace-nowrap divide-x font-bold">
          <li
            class="p-2 hover:bg-gray-200 rounded-md transition-all duration-150 ease-in-out"
          >
            <a href="https://github.com/ChanthornAcademy/khmer-lunar">Github</a>
          </li>
          <li
            class="p-2 hover:bg-gray-200 rounded-md transition-all duration-150 ease-in-out"
          >
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li
            class="p-2 hover:bg-gray-200 rounded-md transition-all duration-150 ease-in-out"
          >
            <RouterLink to="/home-2">Home 2</RouterLink>
          </li>
          <li
            class="p-2 hover:bg-gray-200 rounded-md transition-all duration-150 ease-in-out"
          >
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
