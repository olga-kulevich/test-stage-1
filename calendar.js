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

    /**
     * @param {number} date
     * @param {string} name
     * @param {function} func
     *
     */
    function addEvent(date, name, func) {
        var event = new Event(date, name, func);
        var currentDate = Math.floor((new Date).getTime()/1000);
        var delay = (date - currentDate)*1000;

        events.push(event);

        console.log(event);
        console.log(event.func);
        console.log(events);

        setTimeout(function() {event.func()}, delay);
    }

    /**
     * @param {string} name
     *
     */
    function deleteEvent(name) {
        var foundEvents = events.filter(function(event) {return event.name === name});
        var index = events.indexOf(foundEvents[0]);
        events.splice(index, 1);

        console.log(events);
    }

    /**
     * @param {string} name - existing event name
     * @param {string} newName - new event name
     * @param {number} newDate - new event date
     *
     */
    function updateEvent(name, newName, newDate) {
        var foundEvents = events.filter(function(event) {return event.name === name});

        if (newName) {
            foundEvents[0].name = newName;
        }

        if (newDate) {
            foundEvents[0].date = newDate;
        }

        console.log(events);
    }

    return {
        addEvent: addEvent,
        deleteEvent: deleteEvent,
        updateEvent: updateEvent
    };
})();
