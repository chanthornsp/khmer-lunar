<script setup>
import moment from "moment/min/moment-with-locales";

defineProps({
  holidays: Object,
});
</script>

<template>
  <ol class="relative border-l border-gray-200 font-hanuman">
    <template v-for="(holiday, index) in holidays" :key="index">
      <template v-if="holiday.customData.title.en !== 'today'">
        <li class="ml-4 mt-4">
          <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400"
            >{{ moment(holiday.dates).locale("km").format("ll") }}
          </time>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ holiday.customData.title.kh }}
          </h3>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">
            {{ holiday.customData.title.en }}
          </p>
        </li>
      </template>
    </template>
  </ol>
</template>
