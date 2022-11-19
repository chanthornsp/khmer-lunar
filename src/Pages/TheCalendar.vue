<script setup>
import moment from "moment";
import { computed, onMounted, ref, watch } from "vue";
import useKhmerDate from "../Composables/useKhmerDate.js";

const { khmerDate } = useKhmerDate();
const days = ref([]);
const currentMonth = ref(moment().month() + 1);
const currentYear = ref(moment().year());
const initDate = computed(() =>
  moment(currentYear.value + "-" + currentMonth.value + "-" + "1", "YYYY-M-D")
);

const emit = defineEmits(["onPrev", "onNext", "onUpdatePage"]);
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
    });
  }
};
</script>

<template>
  <div class="p-5">
    <div class="font-nokora max-w-3xl bg-gray-200 mx-auto p-2 rounded-xl">
      <!--Header calendar-->
      <div class="items-center justify-between flex mb-3">
        <div>
          <button type="button" @click.prevent="onPrev">Prev.</button>
        </div>
        <div>{{ initDate }}</div>
        <div>
          <button type="button" @click.prevent="onNext">Next</button>
        </div>
      </div>
      <!--Week Day-->
      <div class="flex gap-2 justify-between text-center items-center mb-2">
        <div class="bg-green-100 w-full">អាទិត្យ</div>
        <div class="bg-green-100 w-full">ច័ន្ទ</div>
        <div class="bg-green-100 w-full">អង្គារ</div>
        <div class="bg-green-100 w-full">ពុធ</div>
        <div class="bg-green-100 w-full">ព្រហស្បតិ៍</div>
        <div class="bg-green-100 w-full">សុក្រ</div>
        <div class="bg-green-100 w-full">សៅរ៍</div>
      </div>
      <!--Days-->
      <div class="grid gap-2 grid-cols-7">
        <template v-for="day in days" :key="day">
          <div
            class="text-center"
            :class="
              day.prevMonth
                ? 'bg-gray-100'
                : day.nextMonth
                ? 'bg-gray-300'
                : 'bg-green-100'
            "
          >
            <div>
              {{ day.day }}
            </div>
            <div>
              {{ day.khDate.toKhDate("d N") }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
