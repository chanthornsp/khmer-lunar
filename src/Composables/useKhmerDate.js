import { ref } from "vue";
import momentkh from "@thyrith/momentkh";
import moment from "moment";

export default function useKhmerDate() {
    const khmerDate = ref(momentkh(moment))

    return { khmerDate }
}
