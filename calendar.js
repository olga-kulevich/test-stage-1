window.Calendar = (function () {

    /**
     * @type {Event[]}
     */
    var events = [];

    /**
     * @param {number} date
     * @param {string} name
     * @param {function} func
     * @constructor
     */

    function Event (date, name, func) {
        this.date = date;
        this.name = name;
        this.func = func;
    }

    function addEvent(date, name, func) {
        var event = new Event(date, name, func);
        var currentDate = Math.floor((new Date).getTime()/1000);
        var delay = (date - currentDate + 7)*1000;

        events.push(event);

        console.log(event);
        console.log(event.func);

        setTimeout(function() {event.func()}, delay);
    }

     function getMessage (d) {

        var searchDate = d;
        var foundEvents = events.filter(function(event) {return event.date === searchDate});
        return foundEvents[0].name;
    }

    return {
        addEvent: addEvent
    };
})();
