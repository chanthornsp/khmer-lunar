<script setup>
import TheCalendar from "./TheCalendar.vue";
import TheHolidaysList from "../components/TheHolidaysList.vue";
import { ref } from "vue";
import moment from "moment";
import useKhmerNewYearDate from "../Composables/useKhmerNewYearDate.js";
import useKhmerDate from "../Composables/useKhmerDate.js";
import usePublicHolidays from "../Composables/usePublicHolidays.js";

const { khmerDate } = useKhmerDate();
const { events, traditional_events } = usePublicHolidays();
const attrs = ref([
  {
    key: 1,
    customData: {
      title: {
        kh: "ថ្ងៃ",
        en: "today",
      },
      class: "bg-blue-600 text-white",
    },
    dates: moment().format(),
  },
]);
const khmerDaysInMonth = ref([]);
const khmerMonthInCurrentMonth = ref([1,2]);
const onUpdatePage = (day) => {
  //reset khmerDaysInMonth
  khmerDaysInMonth.value.length = 0;
  attrs.value.length = 0;
  // General date events
  generateHolidaysFromCurrentMonth(day);
  // sorting by date
  attrs.value.sort(function (x, y) {
    return new Date(x.dates) - new Date(y.dates);
  });
};

const generateHolidaysFromCurrentMonth = (day) => {
  //get khmer new year date
  if (day.month === 4) {
    const { khmerNewYearAttrs } = useKhmerNewYearDate(day);
    attrs.value.push(...khmerNewYearAttrs.value);
  }
  events.value
    .filter((item) => item.start_date.month === day.month)
    .forEach((element) => {
      attrs.value.push({
        key:
          "events" +
          moment({
            y: day.year,
            M: day.month - 1,
            D: element.start_date.day,
          }).format("YYYY-MM-DD"),
        customData: {
          title: element.summary,
          description: element.description,
          class: "bg-red-600 text-white",
        },
        dates: moment({
          y: day.year,
          M: day.month - 1,
          D: element.start_date.day,
        }).format("YYYY-MM-DD"),
      });
    });

  let daysInMonth = moment({
    y: day.year,
    M: day.month - 1,
  }).daysInMonth();
  for (let i = 1; i <= daysInMonth; i++) {
    let date = moment({
      y: day.year,
      M: day.month - 1,
      D: i,
    }).format("YYYY-MM-DD");
    let lurna = khmerDate.value(date);
    khmerDaysInMonth.value.push({
      khmer_month: lurna.toKhDate("m"),
      khmer_day: lurna.toKhDate("dN"),
      date: date,
    });
    //filter traditional events
    traditional_events.value.filter((item) =>
      khmerDaysInMonth.value
        .filter(
          (item2) =>
            item2.khmer_month === item.start_date.month &&
            item2.khmer_day === item.start_date.day
        )
        .includes(item)
    );
  }

  khmerDaysInMonth.value.reduce(function (filtered, option) {
    let filteredHolidays = traditional_events.value.filter(
      (item) =>
        item.start_date.month === option.khmer_month &&
        item.start_date.day === option.khmer_day
    );
    if (filteredHolidays.length) {
      filteredHolidays.forEach((element) => {
        attrs.value.push({
          key: "traditional_events" + option.date,
          customData: {
            title: element.summary,
            description: element.description,
            class: "bg-red-600 text-white",
          },
          dates: option.date,
        });
      });
    }
  });

  //get two Khmer months =  កក្ដិក - មិគសិរ
  khmerMonthInCurrentMonth.value = [
    ...new Set(khmerDaysInMonth.value.map((item) => item.khmer_month)),
  ];
};
</script>

<template>
  <div class="flex-col-reverse lg:flex flex-col lg:flex-row gap-4 mx-auto">
    <div class="w-full lg:w-2/3 shrink-0">
      <TheCalendar
        :attributes="attrs"
        @onUpdatePage="onUpdatePage"
        :current-khmer-months="
          khmerMonthInCurrentMonth[0] + ' ~ ' + khmerMonthInCurrentMonth[1]
        "
      />
    </div>
    <div class="w-full">
      <TheHolidaysList :events="attrs" />
    </div>
  </div>
</template>
