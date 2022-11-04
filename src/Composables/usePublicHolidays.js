import { ref } from "@vue/reactivity";

export default function usePublicHolidays() {
  const holidays = ref([
    {
      id: 1, summary: {
        kh: "", en: ""
      },
      description: "",
      start_date: "",
      end_date: ""
    },
    {
      id: 1, summary: {
        kh: "", en: ""
      },
      description: "",
      start_date: "",
      end_date: ""
    }, {
      id: 1, summary: {
        kh: "", en: ""
      },
      description: "",
      start_date: "",
      end_date: ""
    }
  ]);
  const traditional_holidays = ref({
    id: 1, summary: {
      kh: "", en: ""
    }, description: "", start_date: "", end_date: ""
  });
  return { holidays, traditional_holidays };
}