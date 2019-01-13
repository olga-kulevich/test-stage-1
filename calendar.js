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
        var updatedEvents = eventsList.add(event);
        eventsList.sendEvents(updatedEvents);
    }

    /**
     * @param {string} name
     *
     */
    function deleteEvent(name) {
        var updatedEvents = eventsList.delete(name);
        eventsList.sendEvents(updatedEvents);
    }

    /**
     * @param {string} name - existing event name
     * @param {string} newName - new event name
     * @param {number} newDate - new event date
     *
     */
    function updateEvent(name, newName, newDate) {
        var updatedEvents = eventsList.update(name, newName, newDate);
        eventsList.sendEvents(updatedEvents);
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
            return events;
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
            return events;
        };

        this.delete = function(name) {
            var foundEvents = events.filter(function(event) {
                return event.name === name
            });
            var index = events.indexOf(foundEvents[0]);
            events.splice(index, 1);
            return events;
        };
    }

    /**
     * @param {function} behavior
     * @constructor
     */
    function Observer(behavior) {
        this.notify = function(updatedEventList) {
            behavior(updatedEventList);
        }
    }

    var eventsList = new EventsList();

    var observer = new Observer(function(updatedEventList) {
        var timerId;

        stop();

        var arr = updatedEventList.map(function(a) {
            return a.date
        });
        console.log(arr);
        var min = arr.reduce(function(a, b) {
            return (a < b ? a : b)
        });
        var foundNearestEvent = updatedEventList.filter(function(event) {
            return (event.date === min)
        });

        console.log(foundNearestEvent);

        var currentDate = Math.floor((new Date).getTime() / 1000);
        var delay = (foundNearestEvent[0].date - currentDate) * 1000;

        function stop() {
            clearTimeout(timerId);
        }

        timerId = setTimeout(function() {
            foundNearestEvent[0].func()
        }, delay);

    });

    eventsList.addObserver(observer);

    return {
        addEvent: addEvent,
        deleteEvent: deleteEvent,
        updateEvent: updateEvent
    };
})();
