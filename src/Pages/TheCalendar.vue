<script setup>
import moment from "moment/min/moment-with-locales";
import { computed, onMounted, ref, watch } from "vue";
import useKhmerDate from "../Composables/useKhmerDate.js";

const props = defineProps({
  attributes: Object,
  currentKhmerMonths: String,
});
const emit = defineEmits(["onPrev", "onNext", "onUpdatePage"]);
const { khmerDate } = useKhmerDate();
const daysOfWeek = ref([]);
const days = ref([]);
const currentMonth = ref(moment().month() + 1);
const currentYear = ref(moment().year());
const initDate = computed(() =>
  moment(currentYear.value + "-" + currentMonth.value + "-" + "1", "YYYY-M-D")
);

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
watch(initDate, () => {
  // reset days
  days.value.length = 0;
  init();
});
onMounted(() => {
  emit("onPrev", { month: currentMonth.value, year: currentYear.value });
  emit("onNext", { month: currentMonth.value, year: currentYear.value });
  emit("onUpdatePage", { month: currentMonth.value, year: currentYear.value });
  // reset days
  days.value.length = 0;
  init();
});
const init = () => {
  // generate days of the week Sun-Sat
  daysOfWeek.value.length = 0;
  for (let w = 0; w < 7; w++) {
    daysOfWeek.value.push(moment().locale("km").day(w).format("dddd"));
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
</script>

<template>
  <div class="p-5">
    <div class="font-nokora w-full bg-white border mx-auto p-2 rounded-xl">
      <!--Header calendar-->
      <div class="items-center justify-between flex mb-4">
        <div>
          <button type="button" @click.prevent="onPrev">Prev.</button>
        </div>
        <div class="text-center">
          <h2 class="text-lg md:text-xl lg:text-2xl font-bold">
            {{ currentKhmerMonths }}
          </h2>
          <h2 class="text-lg md:text-xl text-gray-600 font-bold">
            {{ initDate.format("MMMM, YYYY") }}
          </h2>
        </div>
        <div>
          <button type="button" @click.prevent="onNext">Next</button>
        </div>
      </div>
      <!--Week Day-->
      <div
        class="flex gap-2 justify-between text-center items-center mb-2 bg-white rounded-md border overflow-hidden font-bold text-lg"
      >
        <template v-for="(week, key) in daysOfWeek" :key="week">
          <div
            :class="[key === 0 ? 'bg-red-600 text-white' : '', 'w-full py-3']"
          >
            {{ week }}
          </div>
        </template>
      </div>
      <!--Days-->
      <div class="grid gap-2 grid-cols-7">
        <template v-for="day in days" :key="day">
          <div
            class="w-full aspect-[10/8] shadow rounded-md border md:p-2"
            :class="[
              day.prevMonth || day.nextMonth
                ? 'opacity-20 bg-gray-100'
                : 'bg-white',
              isHolidays(day.attributes),
              day.date.weekday() === 0 ? 'text-red-600' : '',
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
                  {{ day.khDate.toKhDate("d N") }}
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
