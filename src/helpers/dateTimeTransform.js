export default function dateTimeTransform(datetime) {
  const datetimeDb = new Date(datetime).toLocaleString().split(", ");
  const date = datetimeDb[0].split(".");
  return `${date[2]}-${date[1].padStart(2, "0")}-${date[0].padStart(2, "0")}T${
    datetimeDb[1]
  }`;
}
