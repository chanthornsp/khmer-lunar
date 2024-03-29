<script setup>
import moment from "moment";
import { computed, onMounted, ref, watch } from "vue";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid";
import useKhmerDate from "../Composables/useKhmerDate.js";
import { useCalendarStore } from "../Stores/useCalendarStore.js";

const calendarStore = useCalendarStore();
const emit = defineEmits(["onPrev", "onNext", "onUpdatePage", "onClick"]);
const { khmerDate } = useKhmerDate();
const daysOfWeek = calendarStore.daysOfWeek;
const days = calendarStore.days;
const onPrev = () => {
  calendarStore.currentMonth--;
  if (calendarStore.currentMonth === 0) {
    calendarStore.currentMonth = 12;
    calendarStore.currentYear--;
  }
  emit("onPrev", {
    month: calendarStore.currentMonth,
    year: calendarStore.currentYear,
  });
};
const onNext = () => {
  calendarStore.currentMonth++;
  if (calendarStore.currentMonth === 13) {
    calendarStore.currentMonth = 1;
    calendarStore.currentYear++;
  }
  emit("onNext", {
    month: calendarStore.currentMonth,
    year: calendarStore.currentYear,
  });
};

const onPrevYear = () => {
  calendarStore.currentYear--;
};
const onNextYear = () => {
  calendarStore.currentYear++;
};

const reset = () => {
  calendarStore.currentMonth = moment().month() + 1;
  calendarStore.currentYear = moment().year();
};

const onClick = (date) => {
  emit("onClick", date);
  emit("onUpdatePage", {
    month: calendarStore.currentMonth,
    year: calendarStore.currentYear,
  });
};

onMounted(() => {
  calendarStore.days.length = 0;
  calendarStore.initDay();
  emit("onUpdatePage", {
    month: calendarStore.currentMonth,
    year: calendarStore.currentYear,
  });
});
const isHolidays = (attributes) => {
  let attrsObject = Object.assign([], attributes);
  if (attrsObject.length) {
    if (
      attrsObject.filter(
        (attr) => attr.customData.description === "Holiday in Cambodia"
      ).length
    ) {
      return "text-red-600 bg-red-100";
    } else if (
      attrsObject.filter(
        (attr) => attr.customData.description === "General Event"
      ).length
    ) {
      return "text-blue-600 bg-blue-100";
    }
  } else {
    return "bg-white";
  }
};

const getBuddhistHolyDay = (khDate, date) => {
  if (
    khDate === "៨រោច" ||
    khDate === "៨កើត" ||
    khDate === "១៥កើត" ||
    khDate === "១៥រោច"
  ) {
    return true;
  } else if (
    khDate === "១៤រោច" &&
    khmerDate.value(date.clone().add(1, "days")).toKhDate("dN") === "១កើត"
  ) {
    return true;
  }

  return false;
};

const filterForm = ref({
  month: calendarStore.currentMonth,
  year: calendarStore.currentYear,
});
watch(filterForm.value, () => {
  calendarStore.currentYear = filterForm.value.year;
  calendarStore.currentMonth = filterForm.value.month;
  emit("onUpdatePage", {
    month: calendarStore.currentMonth,
    year: calendarStore.currentYear,
  });
});
const initDates = computed(() => calendarStore.initDate);
watch(initDates, () => {
  filterForm.value.year = calendarStore.currentYear;
  filterForm.value.month = calendarStore.currentMonth;
  // reset days
  calendarStore.days.length = 0;
  calendarStore.initDay();
});
</script>

<template>
  <div class="p-5">
    <div
      class="mb-3 rounded-xl md:divide-x-4 border p-2 flex flex-col md:flex-row items-center justify-center text-lg font-hanuman"
    >
      <div class="flex items-center gap-1 px-4">
        <label>Month: </label>
        <button
          @click.prevent="onPrev"
          class="rounded-md hover:bg-gray-200 p-2"
          type="button"
        >
          <ChevronLeftIcon class="w-5" />
        </button>
        <select v-model="filterForm.month" class="border rounded-md py-2 px-3">
          <option v-for="month in 12" :key="month" :value="month">
            {{ moment({ M: month - 1 }).format("MMMM") }}
          </option>
        </select>
        <button
          @click.prevent="onNext"
          class="rounded-md hover:bg-gray-200 p-2"
          type="button"
        >
          <ChevronRightIcon class="w-5" />
        </button>
      </div>
      <div class="flex items-center gap-1 px-4">
        <label>Year: </label>
        <button
          @click.prevent="onPrevYear"
          class="rounded-md hover:bg-gray-200 p-2"
          type="button"
        >
          <ChevronLeftIcon class="w-5" />
        </button>
        <select v-model="filterForm.year" class="border rounded-md py-2 px-3">
          <option v-for="(year, key) in 1000" :key="year" :value="1900 + key">
            {{ 1900 + key }}
          </option>
        </select>
        <button
          @click.prevent="onNextYear"
          class="rounded-md hover:bg-gray-200 p-2"
          type="button"
        >
          <ChevronRightIcon class="w-5" />
        </button>
      </div>
    </div>
    <div class="font-nokora w-full bg-white border mx-auto p-2 rounded-xl">
      <!--Header calendar-->
      <div class="items-center justify-between flex mb-4">
        <div class="shrink-0 text-right text-lg font-bold">
          <div>
            {{ calendarStore.initKhDate[0] }}
          </div>
          <div>
            {{ calendarStore.initKhDate[1] }}
          </div>
          <div>
            {{ calendarStore.initKhDate[2] }}
          </div>
        </div>
        <div class="text-center w-full">
          <h2 class="text-lg md:text-xl lg:text-2xl font-bold">
            {{ calendarStore.currentKhmerMonths.toString() }}
          </h2>
          <h2 class="text-lg md:text-xl text-gray-600 font-bold">
            {{ calendarStore.initDate.format("MMMM, YYYY") }}
          </h2>
        </div>
        <div class="flex gap-1 items-center justify-between shrink-0">
          <button
            type="button"
            class="rounded-md hover:bg-gray-200 p-2"
            @click.prevent="onPrev"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="rounded-full w-3 h-3 bg-gray-200 hover:bg-gray-300"
            @click.prevent="reset"
          ></button>
          <button
            type="button"
            class="rounded-md hover:bg-gray-200 p-2"
            @click.prevent="onNext"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
      <!--Week Day-->
      <div
        class="flex gap-2 justify-between text-center items-center mb-2 bg-white rounded-md border overflow-hidden font-bold text-base md:text-lg whitespace-nowrap"
      >
        <template v-for="(week, key) in daysOfWeek" :key="week">
          <div
            :class="[key === 0 ? 'text-red-600' : '', 'w-full py-2 md:py-3']"
          >
            <div>{{ week.km.format("dddd") }}</div>
          </div>
        </template>
      </div>
      <!--Days-->
      <div class="grid gap-2 grid-cols-7">
        <template v-for="day in days" :key="day">
          <div
            @click.prevent="onClick(day.date)"
            class="w-full aspect-[10/8] relative shadow rounded-md border md:p-2 whitespace-nowrap cursor-pointer transform duration-150 hover:scale-105 ease-in-out"
            :class="[
              day.prevMonth || day.nextMonth ? 'opacity-40' : '',
              isHolidays(day.attributes),
              day.date.weekday() === 6 ? 'text-red-600' : '',
              moment().isSame(day.date, 'day') ? 'bg-blue-600 text-white' : '',
            ]"
          >
            <div
              class="flex lg:gap-1 flex-col items-center md:flex-row md:items-start"
            >
              <div class="text-lg md:text-3xl font-bold shrink-0">
                {{ day.day }}
              </div>
              <div
                class="w-full flex justify-center flex-col md:justify-start items-center md:items-end font-nokora text-sm md:text-base text-center"
              >
                <div>
                  {{ day.khDate.toKhDate("dN") }}
                </div>
                <div
                  v-if="getBuddhistHolyDay(day.khDate.toKhDate('dN'), day.date)"
                  class="absolute inset-0 rounded-md overflow-hidden flex justify-center z-10 opacity-30 lg:static lg:opacity-100 p-1"
                >
                  <img
                    src="../assets/buddhist-icon.webp"
                    alt="Buddhist"
                    class="h-full object-cover object-top lg:w-6 lg:h-auto lg:object-contain"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="
                (day.khDate.khDay() === 0 || day.day === 1) &&
                day.nextMonth === false
              "
              class="text-blue-600 font-bold hidden md:block"
            >
              {{ day.khDate.toKhDate("m") }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
