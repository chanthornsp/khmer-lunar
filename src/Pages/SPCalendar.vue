<script setup>
import TheCalendar from "./TheCalendar.vue";
import TheHolidaysList from "../components/TheHolidaysList.vue";
import { ref } from "vue";
import moment from "moment/min/moment-with-locales";
import useKhmerNewYearDate from "../Composables/useKhmerNewYearDate.js";
import useKhmerDate from "../Composables/useKhmerDate.js";
import usePublicHolidays from "../Composables/usePublicHolidays.js";
import { XMarkIcon } from "@heroicons/vue/24/solid";

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
const khmerMonthInCurrentMonth = ref([1, 2]);
const currentMonthYear = ref({});
const detail = ref({});
const openModal = ref(false);
const onUpdatePage = (day) => {
  currentMonthYear.value = { m: day.month, y: day.year };

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

const onClick = (date) => {
  openModal.value = true;
  detail.value = {
    date: date,
    attributes: attrs.value.filter((item) => date.isSame(item.dates, "day")),
  };
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
        @onClick="onClick"
        :current-khmer-months="
          khmerMonthInCurrentMonth[0] + ' ~ ' + khmerMonthInCurrentMonth[1]
        "
      />
    </div>
    <div class="w-full">
      <TheHolidaysList
        :title="
          'ព្រឹត្តិការណ៍ប្រចាំ ខែ' +
          moment({ M: currentMonthYear.m - 1, y: currentMonthYear.y })
            .locale('km')
            .format('MMMM ឆ្នាំYYYY')
        "
        :events="attrs"
      />
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
    <div
      class="relative max-w-4xl max-h-screen h-full md:h-auto pointer-events-auto w-full"
    >
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
            {{ detail.date.clone().locale("km").format("LL") }},
            {{ detail.date.clone().format("LL") }}
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
