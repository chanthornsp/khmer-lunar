<script setup>
import moment from "moment/min/moment-with-locales";
import { computed, onMounted, ref, watch } from "vue";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid";
import useKhmerDate from "../Composables/useKhmerDate.js";
import { debounce } from "lodash";

const props = defineProps({
  attributes: Object,
  currentKhmerMonths: String,
});
const emit = defineEmits(["onPrev", "onNext", "onUpdatePage", "onClick"]);
const { khmerDate } = useKhmerDate();
const daysOfWeek = ref([]);
const days = ref([]);
const currentMonth = ref(moment().month() + 1);
const currentYear = ref(moment().year());
const initDate = computed(() =>
  moment(currentYear.value + "-" + currentMonth.value + "-" + "1", "YYYY-M-D")
);
const initKhDate = ref([]);

const onPrev = () => {
  currentMonth.value--;
  if (currentMonth.value === 0) {
    currentMonth.value = 12;
    currentYear.value--;
  }
  emit("onPrev", { month: currentMonth.value, year: currentYear.value });
  emit("onUpdatePage", { month: currentMonth.value, year: currentYear.value });
};
const onNext = () => {
  currentMonth.value++;
  if (currentMonth.value === 13) {
    currentMonth.value = 1;
    currentYear.value++;
  }
  emit("onNext", { month: currentMonth.value, year: currentYear.value });
  emit("onUpdatePage", { month: currentMonth.value, year: currentYear.value });
};

const reset = () => {
  currentMonth.value = moment().month() + 1;
  currentYear.value = moment().year();
};

const onClick = (date) => {
  emit("onClick", date);
};

watch(
  initDate,
  debounce(() => {
    // reset days
    days.value.length = 0;
    init();
    initKhDate.value = khmerDate
      .value(initDate.value.clone())
      .toKhDate("ឆ្នាំa_e_ព.ស b")
      .split("_");
  }, 300)
);
onMounted(() => {
  // reset days
  days.value.length = 0;
  init();
  initKhDate.value = khmerDate
    .value(initDate.value.clone())
    .toKhDate("ឆ្នាំa_e_ព.ស b")
    .split("_");
});
const init = () => {
  //emit events
  emit("onPrev", { month: currentMonth.value, year: currentYear.value });
  emit("onNext", { month: currentMonth.value, year: currentYear.value });
  emit("onUpdatePage", { month: currentMonth.value, year: currentYear.value });
  // generate days of the week Sun-Sat
  daysOfWeek.value.length = 0;
  for (let w = 0; w < 7; w++) {
    daysOfWeek.value.push({
      en: moment().day(w),
      km: moment().clone().locale("km").day(w),
    });
  }
  // generate full calendar
  let date = initDate.value;
  let currentDaysInMonth = date.clone().daysInMonth();
  let firstDayIndex = date.day();
  let lastDayIndex = moment(date.format("YYYY-MM-" + currentDaysInMonth)).day();
  let nextDay = 7 - lastDayIndex - 1;
  let lastDayOfPrevMonth = date.clone().subtract(1, "months").daysInMonth();
  //Prev. days in month
  for (let X = firstDayIndex; X > 0; X--) {
    let day = lastDayOfPrevMonth - X + 1;
    let prevDate = moment(
      date
        .clone()
        .subtract(1, "months")
        .format("YYYY-MM-" + day),
      "YYYY-MM-D"
    );
    days.value.push({
      prevMonth: true,
      day: day,
      date: prevDate,
      khDate: khmerDate.value(prevDate),
      nextMonth: false,
      attributes: attrsFilter(prevDate),
    });
  }
  //current days in month
  for (let i = 1; i <= currentDaysInMonth; i++) {
    let currentDate = moment(date.format("YYYY-MM-" + i), "YYYY-MM-D");
    days.value.push({
      prevMonth: false,
      day: i,
      date: currentDate,
      khDate: khmerDate.value(currentDate),
      nextMonth: false,
      attributes: attrsFilter(currentDate),
    });
  }
  //next days in month
  for (let Y = 1; Y <= nextDay; Y++) {
    let nextDate = moment(
      date
        .clone()
        .add(1, "months")
        .format("YYYY-MM-" + Y),
      "YYYY-MM-D"
    );
    days.value.push({
      prevMonth: false,
      day: Y,
      date: nextDate,
      khDate: khmerDate.value(nextDate),
      nextMonth: true,
      attributes: attrsFilter(nextDate),
    });
  }
};

const attrsFilter = (dates) => {
  return props.attributes.filter((item) => dates.isSame(item.dates));
};

const isHolidays = (attributes) => {
  let attrsObject = Object.assign([], attributes);
  if (attrsObject.length) {
    if (
      attrsObject.filter(
        (attr) => attr.customData.description === "Holiday in Cambodia"
      ).length
    ) {
      return "text-red-600 bg-red-100";
    } else {
      return "text-blue-600 bg-blue-100";
    }
  } else {
    return "bg-white";
  }
};

const getBuddhistHolyDay = (khDate, date) => {
  console.log();
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
</script>

<template>
  <div class="p-5">
    <div class="font-nokora w-full bg-white border mx-auto p-2 rounded-xl">
      <!--Header calendar-->
      <div class="items-center justify-between flex mb-4">
        <div class="shrink-0 text-right text-lg font-bold">
          <div>
            {{ initKhDate[0] }}
          </div>
          <div>
            {{ initKhDate[1] }}
          </div>
          <div>
            {{ initKhDate[2] }}
          </div>
        </div>
        <div class="text-center w-full">
          <h2 class="text-lg md:text-xl lg:text-2xl font-bold">
            {{ currentKhmerMonths }}
          </h2>
          <h2 class="text-lg md:text-xl text-gray-600 font-bold">
            {{ initDate.format("MMMM, YYYY") }}
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
        class="flex gap-2 justify-between text-center items-center mb-2 bg-white rounded-md border overflow-hidden font-bold text-lg"
      >
        <template v-for="(week, key) in daysOfWeek" :key="week">
          <div :class="[key === 0 ? 'text-red-600' : '', 'w-full py-3']">
            <div>{{ week.km.format("dddd") }}</div>
          </div>
        </template>
      </div>
      <!--Days-->
      <div class="grid gap-2 grid-cols-7">
        <template v-for="day in days" :key="day">
          <div
            @click.prevent="onClick(day.date)"
            class="w-full aspect-[10/8] shadow rounded-md border md:p-2 whitespace-nowrap cursor-pointer transform duration-150 hover:scale-105 ease-in-out"
            :class="[
              day.prevMonth || day.nextMonth
                ? 'opacity-20 bg-gray-100'
                : 'bg-white',
              isHolidays(day.attributes),
              day.date.weekday() === 0 ? 'text-red-600' : '',
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
                  class="text-red-600 text-xs"
                >
                  ថ្ងៃសីល
                </div>
              </div>
            </div>
            <div
              v-if="
                (day.khDate.khDay() === 0 || day.day === 1) &&
                day.nextMonth === false
              "
              class="text-blue-600 hidden md:block"
            >
              {{ day.khDate.toKhDate("m") }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
