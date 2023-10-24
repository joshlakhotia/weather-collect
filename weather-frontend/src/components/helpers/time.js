export default function unixToTime(unix) {
    const date = new Date(unix * 1000);

    // Hours part from the timestamp
    const hours = date.getHours();

    return hours + ":00";
}
