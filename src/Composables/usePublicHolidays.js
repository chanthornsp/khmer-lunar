import { ref } from "@vue/reactivity";

export default function usePublicHolidays() {
  const events = ref([
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

      image: "",
    },
    {
      id: 5,
      summary: {
        kh: "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះករុណា ព្រះបាទសម្តេចព្រះបរមនាថ នរោត្តម សីហមុនី ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា",
        en: "Birthday of His Majesty Preah Bat Samdech Preah Boromneath NORODOM SIHAMONI, King of Cambodia",
      },
      description: "Holiday in Cambodia",
      start_date: {
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

      image: "",
    },
    {
      id: 12,
      summary: {
        kh: "ថ្ងៃបុណ្យនៃសេចក្តីស្រលាញ់",
        en: "Valentine's Day",
      },
      description: "General Event",
      start_date: {
        day: 14,
        month: 2,
      },

      image: "",
    },
    {
      id: 13,
      summary: {
        kh: "ទិវាជាតិសុខភាពមាតា និងទារក",
        en: "National Day on Maternal, Newborn and Child Health",
      },
      description: "General Event",
      start_date: {
        day: 21,
        month: 2,
      },

      image: "",
    },
    {
      id: 14,
      summary: {
        kh: "ទិវាជាតិយល់ដឹងពីមីន",
        en: "National Mine Awareness Day",
      },
      description: "General Event",
      start_date: {
        day: 24,
        month: 2,
      },

      image: "",
    },
    {
      id: 15,
      summary: {
        kh: "ទិវាវប្បធម៌ជាតិ",
        en: "National Culture Day",
      },
      description: "General Event",
      start_date: {
        day: 3,
        month: 3,
      },

      image: "",
    },
    {
      id: 15,
      summary: {
        kh: "ទិវានយោបាយទឹក",
        en: "Water Policy Day",
      },
      description: "General Event",
      start_date: {
        day: 4,
        month: 3,
      },

      image: "",
    },
    {
      id: 16,
      summary: {
        kh: "គោរពវិញ្ញាណក្ខន្ធសម្តេចព្រះសុរាម្រឹត",
        en: "",
      },
      description: "General Event",
      start_date: {
        day: 6,
        month: 3,
      },

      image: "",
    },
    {
      id: 17,
      summary: {
        kh: "ទិវាពិភពលោកទឹក និងឧតុនិយម",
        en: "World Water and World Meteorological Day",
      },
      description: "General Event",
      start_date: {
        day: 22,
        month: 3,
      },

      image: "",
    },
    {
      id: 18,
      summary: {
        kh: "ទិវាពិភពលោកកំចាត់ជម្ងឺរបេង",
        en: "World Tuberculosis Day",
      },
      description: "General Event",
      start_date: {
        day: 24,
        month: 3,
      },

      image: "",
    },
  ]);
  const traditional_events = ref([
    // https://5000-years.org/kh/read/2929
    {
      id: 3,
      summary: {
        kh: "ពិធីបុណ្យ​វិសាខបូជា",
        en: "Visaka Bochea Day",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១៥កើត",
        month: "ពិសាខ",
      },

      image: "",
    },
    {
      id: 4,
      summary: {
        kh: "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
        en: "Pchum Ben Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១៤រោច",
        month: "ភទ្របទ",
      },

      image: "",
    },
    {
      id: 5,
      summary: {
        kh: "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
        en: "Pchum Ben Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១៥រោច",
        month: "ភទ្របទ",
      },

      image: "",
    },
    {
      id: 6,
      summary: {
        kh: "ពិធីបុណ្យភ្ជុំបិណ្ឌ",
        en: "Pchum Ben Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១កើត",
        month: "អស្សុជ",
      },

      image: "",
    },
    {
      id: 7,
      summary: {
        kh: "ព្រះរាជ​ពិធីបុណ្យ​អុំទូក បណ្តែតប្រទីប និង​សំពះព្រះខែ អកអំបុក",
        en: "Water Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១៤កើត",
        month: "កក្ដិក",
      },

      image: "",
    },
    {
      id: 8,
      summary: {
        kh: "ព្រះរាជ​ពិធីបុណ្យ​អុំទូក បណ្តែតប្រទីប និង​សំពះព្រះខែ អកអំបុក",
        en: "Water Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១៥កើត",
        month: "កក្ដិក",
      },

      image: "",
    },
    {
      id: 9,
      summary: {
        kh: "ព្រះរាជ​ពិធីបុណ្យ​អុំទូក បណ្តែតប្រទីប និង​សំពះព្រះខែ អកអំបុក",
        en: "Water Festival",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "១រោច",
        month: "កក្ដិក",
      },

      image: "",
    },
    {
      id: 10,
      summary: {
        kh: "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល",
        en: "Royal Ploughing Ceremony",
      },
      description: "Holiday in Cambodia",
      start_date: {
        day: "៤រោច",
        month: "ពិសាខ",
      },

      image: "",
    },
    // https://www.facebook.com/watch/?v=977845659054895
    // https://www.facebook.com/CambodiaLiteratureAssociation/posts/320801221914504
    {
      id: 11,
      summary: {
        kh: "តាំងពិធីត្រស្តិសង្ក្រាន្ត",
        en: "",
      },
      description: "General Event",
      start_date: {
        day: "១២រោច",
        month: "ផល្គុន",
      },

      image: "",
    },
    {
      id: 12,
      summary: {
        kh: "តាំងពិធីត្រស្តិសង្ក្រាន្ត",
        en: "",
      },
      description: "General Event",
      start_date: {
        day: "១៣រោច",
        month: "ផល្គុន",
      },

      image: "",
    },
    {
      id: 13,
      summary: {
        kh: "តាំងពិធីត្រស្តិសង្ក្រាន្ត",
        en: "",
      },
      description: "General Event",
      start_date: {
        day: "១៤រោច",
        month: "ផល្គុន",
      },

      image: "",
    },
    {
      id: 14,
      summary: {
        kh: "ព្រះរាជពិធីត្រស្តិសង្ក្រាន្ត",
        en: "",
      },
      description: "General Event",
      start_date: {
        day: "១៥រោច",
        month: "ផល្គុន",
      },

      image: "",
    },
  ]);
  return { events, traditional_events };
}
