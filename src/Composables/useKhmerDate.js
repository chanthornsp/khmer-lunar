import { ref } from "vue";
import momentkh from "@thyrith/momentkh";
import moment from "moment";

export default function useKhmerDate() {
  const { Moment, getKhNewYearMoment2 } = momentkh(moment);
  const khmerDate = ref(Moment);
  const khmerNewYearDate = ref(getKhNewYearMoment2);
  return { khmerDate, khmerNewYearDate };
}
