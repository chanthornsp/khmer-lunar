<script setup>
import TheCalendar from "./TheCalendar.vue";
import TheHolidaysList from "../components/TheHolidaysList.vue";
import { onMounted, ref, watch } from "vue";
import moment from "moment/min/moment-with-locales";
import useKhmerNewYearDate from "../Composables/useKhmerNewYearDate.js";
import useKhmerDate from "../Composables/useKhmerDate.js";
import usePublicHolidays from "../Composables/usePublicHolidays.js";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import throttle from "lodash/throttle";
import { useAttributeStore } from "../Stores/useAttributeStore.js";

const { khmerDate } = useKhmerDate();
const { events, traditional_events } = usePublicHolidays();
const attrs = ref([]);

const attrStore = useAttributeStore();

const currentMonthYear = ref({});
const detail = ref({});
const openModal = ref(false);
const dayMonth = ref({
  month: null,
  year: null,
});
const onUpdatePage = (day) => {
  currentMonthYear.value = { m: day.month, y: day.year };
  dayMonth.value = day;
  generateHolidaysFromCurrentMonth(day);
};

watch(
  dayMonth,
  throttle(() => {
    attrStore.attrs.length = 0;
    generateHolidaysFromCurrentMonth(dayMonth.value);
  }, 0)
);

const onClick = (date) => {
  openModal.value = true;
  detail.value = {
    date: date,
    attributes: attrStore.attrs.filter((item) =>
      date.isSame(item.dates, "day")
    ),
  };
};

const generateHolidaysFromCurrentMonth = (day) => {
  //get khmer new year date
  if (day.month === 4) {
    const { khmerNewYearAttrs } = useKhmerNewYearDate(day);
    attrStore.attrs.push(...khmerNewYearAttrs.value);
  }
  events.value
    .filter((item) => item.start_date.month === day.month)
    .forEach((element) => {
      attrStore.attrs.push({
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
    });
    let lurna = [...khmerDate.value(date).toKhDate("dN_m").split("_")];
    // console.log(lurna)
    traditional_events.value
      .filter(
        (item) =>
          item.start_date.day === lurna[0] && item.start_date.month === lurna[1]
      )
      .forEach((element) => {
        attrStore.attrs.push({
          key: "traditional_events" + date,
          customData: {
            title: element.summary,
            description: element.description,
            class: "bg-red-600 text-white",
          },
          dates: date.format("YYYY-MM-DD"),
        });
      });
    if (getBuddhistHolyDay(lurna[0], date)) {
      attrStore.attrs.push({
        key: "holy-day" + date,
        customData: {
          title: {
            kh: "ថ្ងៃ​សីល",
            en: "Holy Day",
          },
          description: "Buddhist Holy Day",
          class: "text-yellow-600",
        },
        dates: date.format("YYYY-MM-DD"),
      });
    }
  }
  attrStore.attrs.sort(function (x, y) {
    return new Date(x.dates) - new Date(y.dates);
  });
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
    khmerDate.value(date.clone().add(1, "days")).toKhDate("dN") !== "១៥រោច"
  ) {
    return true;
  }
  return false;
};
</script>

<template>
  <div class="flex-col-reverse lg:flex flex-col lg:flex-row gap-4 mx-auto">
    <div class="w-full lg:w-2/3 shrink-0">
      <TheCalendar @onUpdatePage="onUpdatePage" @onClick="onClick" />
    </div>
    <div class="w-full">
      <TheHolidaysList
        :events="attrStore.attrs"
        :title="
          'ព្រឹត្តិការណ៍ប្រចាំ ខែ' +
          moment({ M: currentMonthYear.m - 1, y: currentMonthYear.y })
            .locale('km')
            .format('MMMM ឆ្នាំYYYY')
        "
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
