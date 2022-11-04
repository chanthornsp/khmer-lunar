import { ref } from "@vue/reactivity";

export default function usePublicHolidays() {
  const holidays = ref([
    {
      id: 1,
      summary: {
        kh: "ទិវាចូលឆ្នាំសកល",
        en: "International New Year Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 1,
        month: 1,
      },
      end_date: {
        day: 1,
        month: 1,
      },
      image: "",
    },
    {
      id: 2,
      summary: {
        kh: "ទិវាជ័យជំនះលើរបបប្រល័យពូជសាសន៍",
        en: "Day of Victory over the Genocidal Regime",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 7,
        month: 1,
      },
      end_date: {
        day: 7,
        month: 1,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ទិវានារីអន្តរជាតិ",
        en: "International Women's Rights Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 8,
        month: 3,
      },
      end_date: {
        day: 8,
        month: 3,
      },
      image: "",
    },
    {
      id: 4,
      summary: {
        kh: "ទិវាពលកម្មអន្តរជាតិ",
        en: "International Labor Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 1,
        month: 5,
      },
      end_date: {
        day: 1,
        month: 5,
      },
      image: "",
    },
    {
      id: 5,
      summary: {
        kh: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះករុណា ព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា)",
        en: "Birthday of His Majesty Preah Bat Samdech Preah Boromneath NORODOM SIHAMONI, King of Cambodia",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 14,
        month: 5,
      },
      end_date: {
        day: 14,
        month: 5,
      },
      image: "",
    },
    {
      id: 7,
      summary: {
        kh: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី នរោត្តម មុនិនាថ សីហនុ ព្រះវររាជមាតាជាតិខ្មែរ",
        en: "Birthday of Her Majesty the Queen-Mother NORODOM MONINEATH SIHANOUK of Cambodia",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 18,
        month: 6,
      },
      end_date: {
        day: 18,
        month: 6,
      },
      image: "",
    },
    {
      id: 8,
      summary: {
        kh: "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ",
        en: "Constitution Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 24,
        month: 9,
      },
      end_date: {
        day: 24,
        month: 9,
      },
      image: "",
    },
    {
      id: 9,
      summary: {
        kh: "ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះករុណា ព្រះបាទសម្តេច ព្រះនរោត្តម សីហនុ ព្រះមហាវីរក្សត្រ ព្រះវររាជបិតា ឯករាជ្យបូរណភាពទឹកដី និងឯកភាពជាតិខ្មែរ “ព្រះបរមរតនកោដ្ឋ”",
        en: "Mourning Day of the Late King-Father NORODOM SIHANOUK of Cambodia",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 15,
        month: 10,
      },
      end_date: {
        day: 15,
        month: 10,
      },
      image: "",
    },
    {
      id: 10,
      summary: {
        kh: "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិរបស់  ព្រះករុណាព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា",
        en: "Coronation Day of His Majesty Preah Bat Samdech Preah Boromneath NORODOM SIHAMONI, King of Cambodia",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 29,
        month: 10,
      },
      end_date: {
        day: 29,
        month: 10,
      },
      image: "",
    },
    {
      id: 11,
      summary: {
        kh: "ពិធីបុណ្យឯករាជ្យជាតិ",
        en: "National Independence Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: 9,
        month: 11,
      },
      end_date: {
        day: 9,
        month: 11,
      },
      image: "",
    },
  ]);
  const traditional_holidays = ref([
    {
      id: 1,
      summary: {
        kh: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ (ថ្ងៃទី១)",
        en: "Khmer New Year's Day (Day 1)",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 2,
      summary: {
        kh: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ (ថ្ងៃទី២)",
        en: "Khmer New Year's Day (Day 2)",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ (ថ្ងៃទី៣)",
        en: "Khmer New Year's Day (Day 3)",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ពិធីបុណ្យ​វិសាខបូជា",
        en: "Visaka Bochea Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
        en: "Pchum Ben Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ព្រះរាជ​ពិធីបុណ្យ​អុំទូក បណ្តែតប្រទីប និង​សំពះព្រះខែ អកអំបុក",
        en: "Water Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ព្រះរាជ​ពិធីបុណ្យ​អុំទូក បណ្តែតប្រទីប និង​សំពះព្រះខែ អកអំបុក",
        en: "Water Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 3,
      summary: {
        kh: "ព្រះរាជ​ពិធីបុណ្យ​អុំទូក បណ្តែតប្រទីប និង​សំពះព្រះខែ អកអំបុក",
        en: "Water Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: null,
        month: null,
      },
      end_date: {
        day: null,
        month: null,
      },
      image: "",
    },
    {
      id: 6,
      summary: {
        kh: "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល",
        en: "Royal Ploughing Ceremony",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "៤រោច",
        month: "ពិសាខ",
      },
      end_date: {
        day: 14,
        month: 5,
      },
      image: "",
    },
  ]);
  return { holidays, traditional_holidays };
}
