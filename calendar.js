window.Calendar = (function () {
    function setEvent(unixTimeEvent, callback) {
        var unixTimeNow = Math.floor((new Date).getTime()/1000);
        var interval = unixTimeEvent - unixTimeNow;

        setTimeout(callback, interval*1000);
    }

    /**
     * @type {Event[]}
     */
    var events = [];

    /**
     * @param date
     * @param message
     * @constructor
     */
    function Event (date, message) {
        this.date = date;
        this.message = message;
    }

    function addNewEvent(date, message) {
        var event = new Event(date, message);
        events.push(event);
        saveEvents();
    }

    function saveEvents() {
        var str = JSON.stringify(events);
        localStorage.setItem("events", str);
    }

    function getEvents() {
        var str = localStorage.getItem("events");
        events = JSON.parse(str);
        if (!events) {
            events = [];
        }
    }

     function getMessage (d) {

        getEvents();

        var searchDate = d;
        var foundEvents = events.filter(function(event) {return event.date === searchDate});
        return foundEvents[0].message;
    }

    return {
        getMessage: getMessage,
        addNewEvent: addNewEvent,
        setEvent: setEvent
    };
})();