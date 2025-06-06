import moment from "moment";

export function getCurrentTimeInReadableForm() {
  return moment().format("YYYY MMMM DD, HH:mm:ss");
}
