<script setup>
import { onMounted, ref } from "vue";
import useKhmerDate from "../Composables/useKhmerDate";
import { Calendar } from "v-calendar";
import moment from "moment";
import usePublicHolidays from "../Composables/usePublicHolidays.js";
import TheHolidaysList from "../components/TheHolidaysList.vue";
import useKhmerNewYearDate from "../Composables/useKhmerNewYearDate.js";

const { khmerDate, khmerNewYearDate } = useKhmerDate();
const { events, traditional_events } = usePublicHolidays();
const masks = ref({
  weekdays: "WWW",
});
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
const onDayClick = (day) => {
  console.log(day);
};
const khmerDaysInMonth = ref([]);
const khmerMonthInCurrentMonth = ref();
const onUpdateToPage = (day) => {
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
    if (!!filteredHolidays.length) {
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
const isHolidays = (attributes) => {
  let attrsObject = Object.assign([], attributes);
  if (!!attrsObject.length) {
    if (
      !!attrsObject.filter(
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

onMounted(() => {
  weeksToKh();
});

const weeksToKh = () => {
  const vW = [...document.getElementsByClassName("vc-weekday")];
  vW.forEach((text) => {
    if (text.innerText === "Sun") {
      text.innerText = "អាទិត្យ";
    }
    if (text.innerText === "Mon") {
      text.innerText = "ច័ន្ទ";
    }
    if (text.innerText === "Tue") {
      text.innerText = "អង្គារ";
    }
    if (text.innerText === "Wed") {
      text.innerText = "ពុធ";
    }
    if (text.innerText === "Thu") {
      text.innerText = "ព្រហស្បតិ៍";
    }
    if (text.innerText === "Fri") {
      text.innerText = "សុក្រ";
    }
    if (text.innerText === "Sat") {
      text.innerText = "សៅរ៍";
    }
  });
};
</script>

<template>
  <div class="container mx-auto p-5">
    <div class="flex-col-reverse md:flex flex-col md:flex-row gap-4 mx-auto">
      <div class="w-full md:w-2/3 shrink-0">
        <Calendar
          class="w-full"
          @update:to-page="onUpdateToPage"
          @transition-start="weeksToKh"
          @transition-end="weeksToKh"
          :masks="masks"
          :attributes="attrs"
          is-expanded
        >
          <template #header-title="page">
            <div class="font-hanuman font-bold text-2xl">
              <span>{{ khmerMonthInCurrentMonth[0] }}</span>
              -
              <span>{{ khmerMonthInCurrentMonth[1] }}</span>
            </div>
            <div class="mt-3">
              {{
                moment({ y: page.year, M: page.month - 1, d: 1 }).format(
                  "MMMM, YYYY"
                )
              }}
            </div>
          </template>
          <template #day-content="{ day, attributes }">
            <div class="p-0.5">
              <div
                class="w-full aspect-square rounded-md border flex gap-1 p-2"
                :class="[isHolidays(attributes)]"
              >
                <div class="text-lg md:text-3xl font-bold shrink-0">
                  {{ day.day }}
                </div>
                <div
                  class="w-full flex justify-start flex-col items-end font-hanuman text-sm md:text-base"
                >
                  <div>{{ khmerDate(day.date).toKhDate("d") }}</div>
                  <div>{{ khmerDate(day.date).toKhDate("N") }}</div>
                  <div
                    v-if="khmerDate(day.date).khDay() === 0 || day.day === 1"
                    class="text-blue-600"
                  >
                    {{ khmerDate(day.date).toKhDate("m") }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Calendar>
      </div>
      <div class="w-full">
        <TheHolidaysList :events="attrs" />
      </div>
    </div>
  </div>
</template>
