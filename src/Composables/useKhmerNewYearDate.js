import moment from "moment";
import useKhmerDate from "./useKhmerDate.js";
import { ref } from "vue";

export default function useKhmerNewYearDate(day) {
  const khmerNewYearAttrs = ref([]);
  const { khmerNewYearDate } = useKhmerDate();

  let newYear = khmerNewYearDate.value(day.year).days;
  newYear.forEach((date, key) => {
    let title = {};
    //first day
    if (key === 0) {
      title = {
        kh: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ (មហាសង្រ្កាន្ត)",
        en: "Khmer New Year's Day (Moha Sangkranta)",
      };
      //  last day
    } else if (date === newYear[newYear.length - 1]) {
      title = {
        kh: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ (វារៈឡើងស័ក)",
        en: "Khmer New Year's Day (Veareak Laeung Sak)",
      };
    } else {
      title = {
        kh: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ (វារៈវ័នបត)",
        en: "Khmer New Year's Day (Veareak Vanabat)",
      };
    }
    khmerNewYearAttrs.value.push({
      key:
        "traditional_holidays" + moment(date).locale("en").format("YYYY-MM-DD"),
      customData: {
        title: title,
        description: "Holiday in Cambodia",
        class: "bg-red-600 text-white",
      },
      dates: moment(date).locale("en").format("YYYY-MM-DD"),
    });
  });

  return { khmerNewYearAttrs };
}
