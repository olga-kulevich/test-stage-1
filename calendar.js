window.Calendar = (function () {

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

    function EventsList() {
        var events = [];
        var observers = [];
        
        this.addObserver = function (observer) {
            observers.push(observer);
        };

        this.sendEvents = function (updatedEvents) {
            for (var i = 0, len = observers.length; i < len; i++) {
                observers[i].notify(updatedEvents);
            }
        };

        this.add = function(event) {
            events.push(event);
            return events;
        }
    }
    
    function Observer(behavior) {
        this.notify = function(updatedEventList) {
            behavior(updatedEventList);
        }
    }

    var eventsList = new EventsList();
    
    var observer = new Observer(function(updatedEventList) {
        var timerId;
        //ищем ближайшее событие и отправляем его на выполнение
        var arr = updatedEventList.map(function(a) {return a.date});
        console.log(arr);
        var min = arr.reduce(function(a, b) {return ( a < b ? a : b )});
        var foundNearestEvent = updatedEventList.filter(function(event)
        {return (event.date === min)});

        console.log(foundNearestEvent);

        var currentDate = Math.floor((new Date).getTime()/1000);
        var delay = (foundNearestEvent[0].date - currentDate)*1000;

        function stop() {
            clearTimeout(timerId);
        }
        stop();

        timerId = setTimeout(function() {foundNearestEvent[0].func()}, delay);

    });

    eventsList.addObserver(observer);

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
    /*function deleteEvent(name) {
        var foundEvents = eventsList.events.filter(function(event) {return event.name === name});
        var index = eventsList.events.indexOf(foundEvents[0]);
        eventsList.events.splice(index, 1);

        console.log(eventsList.events);
    }*/

    /**
     * @param {string} name - existing event name
     * @param {string} newName - new event name
     * @param {number} newDate - new event date
     *
     */
    /*function updateEvent(name, newName, newDate) {
        var foundEvent = eventsList.events.filter(function(event) {return event.name === name});

        if (newName) {
            foundEvent[0].name = newName;
        }

        if (newDate) {
            foundEvent[0].date = newDate;
        }

        console.log(eventsList.events);
    }*/

    return {
        addEvent: addEvent
        /*deleteEvent: deleteEvent,
        updateEvent: updateEvent*/
    };
})();
