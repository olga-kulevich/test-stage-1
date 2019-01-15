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
        if (typeof(name) == 'string' && typeof(time) == 'number' && typeof(func) == 'function') {
            var event = new Event(time, name, func);
            var foundedElements = eventsList.getAllEvents().filter(function(ev) {
                return (ev.name === name)
            });

            if (foundedElements.length === 0) {
                eventsList.add(event);
            }
        }
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
        var events = eventsList.getAllEvents();
        var currentTime = new Date;
        var tomorrow = new Date;
        currentTime.setHours(0,0,0, 0);
        tomorrow.setDate(currentTime.getDate() + 1);
        return (events.filter(function(event) {
            return (event.time > currentTime / 1000 && event.time < tomorrow / 1000)
        }));
    }

    function getEventsForWeek() {
        var events = eventsList.getAllEvents();
        var currentTime = new Date;
        var startOfWeek = new Date;
        var endOfWeek = new Date;

        currentTime.setHours(0,0,0, 0);

        var dayOfStartWeek = 0;
        var currentDay = currentTime.getDay();
        var distance = dayOfStartWeek - currentDay;
        startOfWeek.setDate(currentTime.getDate() + distance);

        endOfWeek.setDate(startOfWeek.getDate() + 7);

        return events.filter(function(event) {
            return (event.time > startOfWeek / 1000 && event.time < endOfWeek / 1000)
        });
    }

    function getEventsForMonth() {
        var events = eventsList.getAllEvents();
        var currentTime = new Date;
        currentTime.setHours(0,0,0, 0);
        var startOfMonth =  currentTime.setDate(1) / 1000;
        var endOfMonth = currentTime.setMonth(currentTime.getMonth() + 1) / 1000;
        return events.filter(function(event) {
            return (event.time > startOfMonth && event.time < endOfMonth)
        });
    }

    function getEventsForPeriod(startOfPeriod, endOfPeriod) {
        var events = eventsList.getAllEvents();
        var foundedEvents;
        if (!endOfPeriod) {
            foundedEvents = events.filter(function (event) {
                return (event.time > startOfPeriod)
            });
        } else if (!startOfPeriod) {
            foundedEvents = events.filter(function (event) {
                return (event.time < endOfPeriod)
            });
        } else {
            foundedEvents = events.filter(function (event) {
                return (event.time > startOfPeriod && event.time < endOfPeriod)
            });
        }
        return foundedEvents;
    }

    /**
     *
     * @constructor
     */
    function Events() {
        var events = [];
        var observers = [];

        this.addObserver = function(observer) {
            observers.push(observer);
        };

        this.notifyAboutChanging = function(updatedEventsList) {
            for (var i = 0, len = observers.length; i < len; i++) {
                observers[i].notify(updatedEventsList);
            }
        };

        this.add = function(event) {
            events.push(event);
            this.notifyAboutChanging(events);
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
            this.notifyAboutChanging(events);
        };

        this.delete = function(name) {
            var foundedEvent = events.filter(function(event) {
                return event.name === name
            });
            var indexDeletedEvent = events.indexOf(foundedEvent[0]);
            events.splice(indexDeletedEvent, 1);

            this.notifyAboutChanging(events);
        };

        this.getAllEvents = function() {
            return events;
        };
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
            that.startNewTimer(updatedEventsList);
        };

        this.startNewTimer = function(updatedEventsList) {
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
                (function() {
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
        getEventsForMonth: getEventsForMonth,
        getEventsForWeek: getEventsForWeek,
        getEventsForPeriod: getEventsForPeriod
    };
})();
