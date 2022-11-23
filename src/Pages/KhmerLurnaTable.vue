<script setup>
import useKhmerDate from "../Composables/useKhmerDate.js";
import moment from "moment/min/moment-with-locales";
import { onMounted, ref, watch } from "vue";

const { khmerDate } = useKhmerDate();
const currentYear = ref(moment().year());
const yearList = ref([]);
const dates = ref([]);
onMounted(() => {
  //  init full year dates
  init();
});
const init = () => {
  yearList.value.length = 0;
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
      let khmerLurnaDate = khmerDate.value(currentDate);
      dates.value.push({
        day: i,
        date: currentDate,
        khDate: khmerLurnaDate,
      });
    }
  }
  for (let x = 1900; x <= 2900; x++) {
    yearList.value.push(x);
  }
};

const getBEYear = (date) => {
  if (date.month() + 1 <= 4) {
    return date.clone().add(543, "years").locale("km").format("YYYY");
  } else {
    return date.clone().add(544, "years").locale("km").format("YYYY");
  }
};
const filterForm = ref({
  year: currentYear.value,
});

watch(filterForm.value, () => {
  currentYear.value = filterForm.value.year;
  init();
});
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
          <template v-for="(date, index) in dates" :key="index">
            <tr :class="date.day === 1 ? 'row-success' : ''">
              <td>{{ date.day }}</td>
              <td>{{ date.khDate.toKhDate("dN") }}</td>
              <td>{{ date.date.format("MMMM") }}</td>
              <td>{{ date.khDate.toKhDate("m") }}</td>
              <td>{{ date.date.format("YYYY") }}</td>
              <td>{{ getBEYear(date.date) }}</td>
              <td>{{ date.khDate.toKhDate("a") }}</td>
              <td>{{ date.khDate.toKhDate("e") }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
