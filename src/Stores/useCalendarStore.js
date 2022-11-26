import { defineStore } from "pinia";
import moment from "moment";
import usePublicHolidays from "../Composables/usePublicHolidays.js";
import useKhmerDate from "../Composables/useKhmerDate.js";
import useKhmerNewYearDate from "../Composables/useKhmerNewYearDate.js";
import { useAttributeStore } from "./useAttributeStore.js";

const { khmerDate } = useKhmerDate();
const { events, traditional_events } = usePublicHolidays();
const attrStore = useAttributeStore();
export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    days: [],
    daysOfWeek: [],
    currentMonth: moment().month() + 1,
    currentYear: moment().year(),
    currentKhmerMonths: [],
    initKhDate: [],
  }),
  getters: {
    initDate: (state) =>
      moment({
        y: state.currentYear,
        M: state.currentMonth - 1,
        D: 1,
      }).locale("en"),
  },
  actions: {
    initDay() {
      //init start date
      let date = this.initDate;
      //reset attrs
      attrStore.attrs.length = 0;
      this.currentKhmerMonths.length = 0;
      //get khmer new year date time
      if (this.initDate.clone().month() + 1 === 4) {
        const { khmerNewYearAttrs } = useKhmerNewYearDate({
          year: this.initDate.clone().year(),
          month: this.initDate.clone().month() + 1,
        });
        attrStore.attrs.push(...khmerNewYearAttrs.value);
      }

      //get event

      events.value
        .filter((item) => item.start_date.month === date.clone().month() + 1)
        .forEach((element) => {
          attrStore.attrs.push({
            key:
              "events" +
              moment({
                y: date.clone().year(),
                M: date.clone().month(),
                D: element.start_date.day,
              })
                .locale("en")
                .format("YYYY-MM-DD"),
            customData: {
              title: element.summary,
              description: element.description,
              class: "bg-red-600 text-white",
            },
            dates: moment({
              y: date.clone().year(),
              M: date.clone().month(),
              D: element.start_date.day,
            })
              .locale("en")
              .format("YYYY-MM-DD"),
          });
        });

      // generate days of the week Sun-Sat
      this.daysOfWeek.length = 0;
      for (let w = 0; w < 7; w++) {
        this.daysOfWeek.push({
          en: moment().locale("en").day(w),
          km: moment().clone().day(w),
        });
      }
      // generate full calendar
      let currentDaysInMonth = date.clone().daysInMonth();
      let firstDayIndex = date.day();
      let lastDayIndex = moment(
        date.format("YYYY-MM-" + currentDaysInMonth)
      ).day();
      let nextDay = 7 - lastDayIndex - 1;
      let lastDayOfPrevMonth = date.clone().subtract(1, "months").daysInMonth();

      //Prev. days in month
      for (let X = firstDayIndex; X > 0; X--) {
        let day = lastDayOfPrevMonth - X + 1;
        let prevDate = moment(
          date
            .clone()
            .subtract(1, "months")
            .format("YYYY-MM-" + day),
          "YYYY-MM-D"
        );
        let khmerLurnaDate = khmerDate.value(prevDate);
        this.traditionalEventFilter({
          date: prevDate,
          khDate: khmerLurnaDate,
        });
        this.days.push({
          prevMonth: true,
          day: day,
          date: prevDate,
          khDate: khmerLurnaDate,
          nextMonth: false,
          attributes: attrStore.attrs.filter((item) =>
            prevDate.isSame(item.dates)
          ),
        });
      }

      //current days in month
      let currentKhMonth = [];
      for (let i = 1; i <= currentDaysInMonth; i++) {
        let currentDate = moment(date.format("YYYY-MM-" + i), "YYYY-MM-D");
        let khmerLurnaDate = khmerDate.value(currentDate);
        this.traditionalEventFilter({
          date: currentDate,
          khDate: khmerLurnaDate,
        });
        this.days.push({
          prevMonth: false,
          day: i,
          date: currentDate,
          khDate: khmerLurnaDate,
          nextMonth: false,
          attributes: attrStore.attrs.filter((item) =>
            currentDate.isSame(item.dates)
          ),
        });

        currentKhMonth.push(khmerLurnaDate.toKhDate("m"));
      }

      //next days in month
      for (let Y = 1; Y <= nextDay; Y++) {
        let nextDate = moment(
          date
            .clone()
            .add(1, "months")
            .format("YYYY-MM-" + Y),
          "YYYY-MM-D"
        );
        let khmerLurnaDate = khmerDate.value(nextDate);
        this.traditionalEventFilter({
          date: nextDate,
          khDate: khmerLurnaDate,
        });
        this.days.push({
          prevMonth: false,
          day: Y,
          date: nextDate,
          khDate: khmerLurnaDate,
          nextMonth: true,
          attributes: attrStore.attrs.filter((item) =>
            nextDate.isSame(item.dates)
          ),
        });
      }
      this.currentKhmerMonths = [
        ...new Set(currentKhMonth.map((item) => item)),
      ];
      //get BEYear
      let beYear;
      if (date.clone().month() + 1 <= 4) {
        beYear = date.clone().add(543, "years").locale("km").format("YYYY");
      } else {
        beYear = date.clone().add(544, "years").locale("km").format("YYYY");
      }
      this.initKhDate = (
        khmerDate.value(date.clone()).toKhDate("ឆ្នាំa_e_ព.ស") + beYear
      ).split("_");

      //sorting attrs
      attrStore.attrs.sort(function (x, y) {
        return new Date(x.dates) - new Date(y.dates);
      });
    },
    traditionalEventFilter(dates) {
      let lurna = [...dates.khDate.toKhDate("dN_m").split("_")];
      // console.log(lurna)
      traditional_events.value
        .filter(
          (item) =>
            item.start_date.day === lurna[0] &&
            item.start_date.month === lurna[1]
        )
        .forEach((element) => {
          attrStore.attrs.push({
            key: "traditional_events" + dates.date,
            customData: {
              title: element.summary,
              description: element.description,
              class: "bg-red-600 text-white",
            },
            dates: dates.date.locale("en").format("YYYY-MM-DD"),
          });
        });
      if (this.getBuddhistHolyDay(lurna[0], dates.date)) {
        attrStore.attrs.push({
          key: "holy-day" + dates.date,
          customData: {
            title: {
              kh: "ថ្ងៃ​សីល",
              en: "Holy Day",
            },
            description: "Buddhist Holy Day",
            class: "text-yellow-600",
          },
          dates: dates.date.locale("en").format("YYYY-MM-DD"),
        });
      }
    },
    getBuddhistHolyDay(khDate, date) {
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
    },
  },
});
