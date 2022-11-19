<script setup>
import moment from "moment/min/moment-with-locales";

defineProps({
  events: Object,
});
</script>

<template>
  <ol class="relative border-l border-gray-200 font-nokora">
    <template v-for="(holiday, index) in events" :key="index">
      <template v-if="holiday.customData.title.en !== 'today'">
        <li
          class="ml-4 mt-4"
          :class="[
            holiday.customData.description === 'Holiday in Cambodia'
              ? 'text-red-500'
              : 'text-blue-500',
          ]"
        >
          <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none opacity-70"
            >{{ moment(holiday.dates).locale("km").format("dddd ll") }}
          </time>
          <h3 class="text-lg font-bold font-moul">
            {{ holiday.customData.title.kh }}
          </h3>
          <p class="text-base font-normal opacity-70">
            {{ holiday.customData.title.en }}
          </p>
        </li>
      </template>
    </template>
  </ol>
</template>
