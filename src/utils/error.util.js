import { useToast } from "vue-toastification";
import { isArray } from "@/utils/inspect.util";

export function toastErrorMessage(e) {
  const toast = useToast();
  console.error(e);
  if (e?.response?.data?.message) {
    const { message } = e.response.data;
    if (isArray(message) && message.length) {
      toast.error(message[0]);
    } else {
      toast.error(message);
    }
  } else {
    toast.error(e.message);
  }
}
