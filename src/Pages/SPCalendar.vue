<script setup>
import TheCalendar from "./TheCalendar2.vue";
import TheHolidaysList from "../components/TheHolidaysList.vue";
import { ref } from "vue";

import useKhmerDate from "../Composables/useKhmerDate.js";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import moment from "moment";
import { useCalendarStore } from "../Stores/useCalendarStore.js";

const { khmerDate } = useKhmerDate();

const calendarStore = useCalendarStore();
const openModal = ref(false);
const detail = ref({});

const onClick = (date) => {
  openModal.value = true;
  detail.value = {
    date: date,
    attributes: calendarStore.attributes.filter((item) =>
      date.isSame(item.dates, "day")
    ),
  };
};
</script>

<template>
  <div class="flex-col-reverse lg:flex flex-col lg:flex-row gap-4 mx-auto">
    <div class="w-full lg:w-2/3 shrink-0">
      <TheCalendar @onClick="onClick" />
    </div>
    <div class="w-full">
      <TheHolidaysList />
    </div>
  </div>
  <!-- Modal-->
  <div
    :class="openModal ? 'fixed bg-black/50  z-10 inset-0 ' : 'hidden'"
    @click.prevent="openModal = false"
  ></div>

  <div
    tabindex="-1"
    aria-hidden="true"
    :class="[
      openModal ? 'fixed' : 'hidden',
      ' inset-0 z-50 flex items-center justify-center pointer-events-none',
    ]"
  >
    <div class="relative max-w-4xl h-auto pointer-events-auto w-full">
      <button
        type="button"
        @click.prevent="openModal = false"
        class="absolute -top-2 -right-2 w-6 h-6 grid place-content-center rounded-full bg-white z-30 text-red-600"
      >
        <XMarkIcon class="h-5" />
      </button>
      <div
        class="border-2 border-white rounded-xl overflow-hidden relative p-4 bg-white w-full font-nokora md:text-lg lg:text-2xl"
      >
        <template v-if="detail.date">
          <h4 class="text-lg md:text-xl lg:text-2xl font-bold">
            {{ detail.date.clone().format("LL") }},
            {{ detail.date.clone().locale("en").format("LL") }}
          </h4>
          <p class="mt-4">
            {{ khmerDate(detail.date).toLunarDate() }}
          </p>
          <ul v-if="detail.attributes" class="list-outside list-disc pl-3 mt-3">
            <li
              v-for="attr in detail.attributes"
              :key="attr.key"
              :class="
                attr.customData.description === 'Holiday in Cambodia'
                  ? 'text-red-600'
                  : ''
              "
            >
              {{ attr.customData.title.kh }}
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
