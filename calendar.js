window.Calendar = (function() {

    /**
     * @param {number} date
     * @param {string} name
     * @param {function} func
     * @constructor
     */
    function Event(date, name, func) {
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
        eventsList.add(event);
    }

    /**
     * @param {string} name
     *
     */
    function deleteEvent(name) {
        eventsList.delete(name);
    }

    /**
     * @param {string} name - existing event name
     * @param {string|null} newName - new event name
     * @param {number|null} newDate - new event date
     *
     */
    function updateEvent(name, newName, newDate) {
        eventsList.update(name, newName, newDate);
    }

    /**
     *
     * @constructor
     */
    function EventsList() {
        var events = [];
        var observers = [];

        this.addObserver = function(observer) {
            observers.push(observer);
        };

        this.sendEvents = function(updatedEvents) {
            for (var i = 0, len = observers.length; i < len; i++) {
                observers[i].notify(updatedEvents);
            }
        };

        this.add = function(event) {
            events.push(event);
            this.sendEvents(events);
        };

        this.update = function(name, newName, newDate) {
            var foundEvent = events.filter(function(event) {
                return event.name === name
            });
            if (newName) {
                foundEvent[0].name = newName;
            }
            if (newDate) {
                foundEvent[0].date = newDate;
            }
            this.sendEvents(events);

        };

        this.delete = function(name) {
            var foundEvents = events.filter(function(event) {
                return event.name === name
            });
            var index = events.indexOf(foundEvents[0]);
            events.splice(index, 1);
            this.sendEvents(events);
        };

        this.getAllEvents = function() {
            return events;
        }
    }

    /**
     *
     * @constructor
     */
    function Observer() {
        var timerId;
        this.notify = function(updatedEventList) {

            clearTimeout(timerId);

            var arr = updatedEventList.map(function(a) {
                return a.date
            });
            //console.log(arr);
            var min = arr.reduce(function(a, b) {
                return (a < b ? a : b)
            });
            var foundNearestEvent = updatedEventList.filter(function(event) {
                return (event.date === min)
            });

            //console.log(foundNearestEvent);

            var currentDate = Math.floor((new Date).getTime() / 1000);
            var delay = (foundNearestEvent[0].date - currentDate) * 1000;

            timerId = setTimeout(function() {
                foundNearestEvent[0].func()
            }, delay);
        }
    }

    var eventsList = new EventsList();

    var observer = new Observer();

    eventsList.addObserver(observer);

    return {
        addEvent: addEvent,
        deleteEvent: deleteEvent,
        updateEvent: updateEvent
    };
})();
