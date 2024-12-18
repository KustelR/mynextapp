export default function UnixToUTC(time) {
  const date = new Date(time);

  const minutes = date.getMinutes().toString();
  const hours = date.getHours().toString();
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();

  return `${hours.length > 1 ? hours : "0" + hours}:${minutes.length > 1 ? minutes : "0" + minutes} 
            ${day}.${month}.${year}`;
}
