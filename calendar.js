export default function setEvent(unixTimeEvent, callback) {
    let unixTimeNow = Math.floor((new Date).getTime()/1000);
    let interval = unixTimeEvent - unixTimeNow;

    setTimeout(callback, interval*1000);
}