export function setEvent(unixTimeEvent, callback) {
    let unixTimeNow = Math.floor((new Date).getTime()/1000);
    let interval = unixTimeEvent - unixTimeNow;

    setTimeout(callback, interval*1000);
}

let events = [];

function Event(date, message) {
    this.date = date;
    this.message = message;
}

export function addNewEvent(date, message) {
    let event = new Event(date, message);
    events.push(event);
    saveEvents();
}

function saveEvents() {
    let str = JSON.stringify(events);
    localStorage.setItem("events", str);
}

function getEvents() {
    let str = localStorage.getItem("events");
    events = JSON.parse(str);
    if (!events) {
        events = [];
    }
}

export function getMessage(d) {
    getEvents();

    let searchDate = d;
    let mess = events.find(event => event.date === searchDate).message;
    return mess;
}