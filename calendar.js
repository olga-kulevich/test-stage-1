window.Calendar = (function() {

    /**
     * @param {number} time
     * @param {string} name
     * @param {function} func
     * @constructor
     */
    function Event(time, name, func) {
        this.time = time;
        this.name = name;
        this.func = func;
    }

    /**
     * @param {number} time
     * @param {string} name
     * @param {function} func
     *
     */
    function addEvent(time, name, func) {
        var event = new Event(time, name, func);
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
     * @param {number|null} newTime - new event time
     *
     */
    function updateEvent(name, newName, newTime) {
        eventsList.update(name, newName, newTime);
    }
    
    function getEventsForDay() {
        eventsList.getForDay();
    }

    function getEventsForMonth() {
        eventsList.getForMonth();
    }

    /**
     *
     * @constructor
     */
    function Events() {
        var that = this;
        var events = [];
        var observers = [];

        this.addObserver = function(observer) {
            observers.push(observer);
        };

        this.sendUpdatedEventsList = function(updatedEventsList) {
            for (var i = 0, len = observers.length; i < len; i++) {
                observers[i].notify(updatedEventsList);
            }
        };

        this.add = function(event) {
            events.push(event);
            this.sendUpdatedEventsList(events);
        };

        this.update = function(name, newName, newTime) {
            var foundedEvents = events.filter(function(event) {
                return event.name === name
            });
            if (newName) {
                foundedEvents[0].name = newName;
            }
            if (newTime) {
                foundedEvents[0].time = newTime;
            }
            this.sendUpdatedEventsList(events);

        };

        this.delete = function(name) {
            var foundedEvent = events.filter(function(event) {
                return event.name === name
            });
            var indexDeletedEvent = events.indexOf(foundedEvent[0]);
            events.splice(indexDeletedEvent, 1);
            this.sendUpdatedEventsList(events);
        };

        this.getAllEvents = function() {
            return events;
        };

        this.getForDay = function() {
            var currentTime = new Date;
            var startOfDay = (currentTime.setHours(0,0,0, 0) / 1000);
            var endOfDay = startOfDay + 86400;
            var foundedEvents = events.filter(function(event) {
                return (event.time > startOfDay && event.time < endOfDay)
            });
            console.log(foundedEvents);
        };
        this.getForMonth = function() {
            var currentTime = new Date;
            currentTime.setHours(0,0,0, 0);
            currentTime.setDate(1);
            var startOfMonth = currentTime / 1000;
            currentTime.setMonth(currentTime.getMonth() + 1);
            var endOfMonth = currentTime / 1000;
            var foundedEvents = events.filter(function(event) {
                return (event.time > startOfMonth && event.time < endOfMonth)
            });
            console.log(foundedEvents);
        }
    }

    /**
     *
     * @constructor
     */
    function Observer() {
        var that = this;
        var nearestTime;
        var timerId;
        var currentTime = Math.floor((new Date).getTime() / 1000);

        this.notify = function(updatedEventsList) {
            if (updatedEventsList.length > 0) {
                clearTimeout(timerId);

                var timesList = updatedEventsList.map(function(event) {
                    return event.time
                });

                if (timesList.length === 1) {
                    nearestTime = timesList[0];
                } else {
                    nearestTime = timesList.reduce(function(a, b) {
                        return (a < b ? a : b)
                    });
                }

                var delay = (nearestTime - currentTime) * 1000;

                timerId = setTimeout(function() {
                    that.processEventsInTime(nearestTime)
                    }, delay);
            }
        };

        this.processEventsInTime = function (nearestTime) {
            var updatedEventsList = eventsList.getAllEvents();

                var foundedNearestEvents = updatedEventsList.filter(function(event) {
                    return (event.time === nearestTime)
                });

                var eventsListWithoutDuringTime = updatedEventsList.filter(function(event) {
                    return (event.time >  nearestTime);
                });

                that.notify(eventsListWithoutDuringTime);

            for (var i = 0; i < foundedNearestEvents.length; i++) {
                (function(){
                    var delay = (nearestTime - currentTime) * 1000;
                    var event =  foundedNearestEvents[i];
                    timerId = setTimeout(function() {
                        event.func()
                    }, delay);
                })();
            }
        }
    }

    var eventsList = new Events();

    var observer = new Observer();

    eventsList.addObserver(observer);

    return {
        addEvent: addEvent,
        deleteEvent: deleteEvent,
        updateEvent: updateEvent,
        getEventsForDay: getEventsForDay,
        getEventsForMonth: getEventsForMonth
    };
})();
