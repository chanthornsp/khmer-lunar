<script setup>
import { onMounted, ref } from "vue";
import useKhmerDate from "./Composables/useKhmerDate";
import { Calendar } from "v-calendar";
import moment from "moment";
import usePublicHolidays from "./Composables/usePublicHolidays.js";
import TheHolidaysList from "./components/TheHolidaysList.vue";
import useKhmerNewYearDate from "./Composables/useKhmerNewYearDate.js";

const { khmerDate, khmerNewYearDate } = useKhmerDate();

const { events, traditional_events } = usePublicHolidays();
const khmerNewYearDatetime = ref();
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
          moment(
            element.start_date.day + "/" + day.month + "/" + day.year,
            "D/M/YYYY"
          ).format("YYYY-MM-DD"),
        customData: {
          title: element.summary,
          description: element.description,
          class: "bg-red-600 text-white",
        },
        dates: moment(
          element.start_date.day + "/" + day.month + "/" + day.year,
          "D/M/YYYY"
        ).format("YYYY-MM-DD"),
      });
    });

  for (
    let i = 1;
    i <= moment(day.month + "/" + day.year, "M/YYYY").daysInMonth();
    i++
  ) {
    let date = moment(day.year + "-" + day.month + "-" + i, "YYYY-M-D").format(
      "YYYY-MM-DD"
    );
    let lurna = khmerDate.value(date);
    khmerDaysInMonth.value.push({
      khmer_month: lurna.toKhDate("m"),
      khmer_day: lurna.toKhDate("dN"),
      date: date,
    });
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
};
const isHolidays = (attributes) => {
  let attrsObject = Object.assign([], attributes);
  if (!!attrsObject.length) {
    return !!attrsObject.filter(
      (attr) => attr.customData.description === "Holiday in Cambodia"
    ).length;
  } else {
    return false;
  }
};
</script>

<template>
  <pre>
  {{ khmerNewYearDatetime }}
  </pre>
  <div class="p-5 container mx-auto aspect-video">
    <div class="text-center section">
      <h2 class="p-2 text-xl font-bold">Khmer Calendar</h2>
      <Calendar
        class="custom-calendar max-w-full"
        @update:to-page="onUpdateToPage"
        :masks="masks"
        :attributes="attrs"
        disable-page-swipe
        is-expanded
      >
        <template #day-content="{ day, attributes }">
          <div
            @click.prevent="onDayClick(day)"
            class="cursor-pointer p-0.5 transform hover:scale-110 transition-all duration-150 ease-linear w-full"
          >
            <div
              :class="[
                'p-2 border rounded-md ',
                isHolidays(attributes)
                  ? 'bg-red-600 text-white'
                  : moment().format('YYY-M-D') ===
                    moment(day.date).format('YYY-M-D')
                  ? 'bg-blue-600 text-white'
                  : '',
              ]"
            >
              <span>
                {{ day.day }}
              </span>
              <div class="font-hanuman">
                {{ khmerDate(day.date).toKhDate("d N") }}
              </div>
            </div>
          </div>
        </template>
        <template #footer> Footer</template>
      </Calendar>
    </div>
    <div class="p-4">
      <TheHolidaysList :events="attrs" />
    </div>
  </div>
</template>
