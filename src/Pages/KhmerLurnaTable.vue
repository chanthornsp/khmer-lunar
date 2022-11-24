<script setup>
import useKhmerDate from "../Composables/useKhmerDate.js";
import moment from "moment/min/moment-with-locales";
import { debounce } from "lodash";
import { onMounted, ref, watch } from "vue";

const { khmerDate } = useKhmerDate();
const currentYear = ref(moment().year());
const yearList = ref([]);
const dates = ref([]);
const loaded = ref(false);
onMounted(
  debounce(() => {
    //  init full year dates
    init().then(() => {
      loaded.value = true;
    });
    for (let x = 1900; x <= 2900; x++) {
      yearList.value.push(x);
    }
  }, 200)
);
const filterForm = ref({
  year: currentYear.value,
});
watch(
  filterForm.value,
  debounce(() => {
    currentYear.value = filterForm.value.year;
    init().then(() => {
      loaded.value = true;
    });
  }, 200)
);

watch(filterForm.value, () => {
  loaded.value = false;
});

const init = async () => {
  dates.value.length = 0;
  for (let month = 0; month < 12; month++) {
    let daysInMonth = moment({
      y: currentYear.value,
      M: month,
      d: 1,
    }).daysInMonth();
    //current days in month
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDate = moment({
        y: currentYear.value,
        M: month,
        d: i,
      });
      // let khmerLurnaDate = khmerDate.value(currentDate);
      let khmerLurnaDate = {
        khDay: khmerDate.value(currentDate).toKhDate("dN"),
        khMonth: khmerDate.value(currentDate).toKhDate("m"),
        animalYear: khmerDate.value(currentDate).toKhDate("a"),
        khYear: khmerDate.value(currentDate).toKhDate("e"),
        beYear: getBEYear(currentDate),
      };
      dates.value.push({
        day: i,
        date: currentDate,
        khDate: khmerLurnaDate,
      });
    }
  }
};

const getBEYear = (date) => {
  if (date.month() + 1 <= 4) {
    return date.clone().add(543, "years").locale("km").format("YYYY");
  } else {
    return date.clone().add(544, "years").locale("km").format("YYYY");
  }
};
</script>

<template>
  <div>
    <div class="flex items-center gap-2 p-2 mt-2">
      <label>Year:</label>
      <select v-model="filterForm.year" class="border p-2 rounded-md">
        <option v-for="year in yearList" :key="year">{{ year }}</option>
      </select>
    </div>
    <div class="mb-3 overflow-x-auto mt-4 border rounded-xl">
      <table
        class="base-table2 w-full text-center font-nokora whitespace-nowrap"
      >
        <thead>
          <tr>
            <th>Nº</th>
            <th>Day</th>
            <th>Khmer Day</th>
            <th>Month</th>
            <th>Khmer Month</th>
            <th>Year</th>
            <th>Khmer Year</th>
            <th>Animal Year</th>
            <th>Khmer Year Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loaded">
            <template v-for="(date, index) in dates" :key="index">
              <tr :class="date.day === 1 ? 'row-success' : ''">
                <td>{{ index + 1 }}</td>
                <td>{{ date.day }}</td>
                <td>{{ date.khDate.khDay }}</td>
                <td>{{ date.date.format("MMMM") }}</td>
                <td>{{ date.khDate.khMonth }}</td>
                <td>{{ date.date.format("YYYY") }}</td>
                <td>{{ date.khDate.beYear }}</td>
                <td>{{ date.khDate.animalYear }}</td>
                <td>{{ date.khDate.khYear }}</td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="9" class="!bg-gray-500 animate-pulse">Loading...</td>
            </tr>
            <tr>
              <td colspan="9" class="!bg-gray-500 animate-pulse">Loading...</td>
            </tr>
            <tr>
              <td colspan="9" class="!bg-gray-500 animate-pulse">Loading...</td>
            </tr>
            <tr>
              <td colspan="9" class="!bg-gray-500 animate-pulse">Loading...</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
