(function (global) {
    'use strict';

    var Calendar = {};

    global.Calendar = Calendar;

    Calendar.setEvent = function (unixTimeEvent, callback) {
        var unixTimeNow = Math.floor((new Date).getTime()/1000);
        var interval = unixTimeEvent - unixTimeNow;

        setTimeout(callback, interval*1000);
    };

    var events = [];

    function Event(date, message) {
        this.date = date;
        this.message = message;
    }

    Calendar.addNewEvent = function(date, message) {
        var event = new Event(date, message);
        events.push(event);
        saveEvents();
    };

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

    Calendar.getMessage = function (d) {

        getEvents();

        var searchDate = d;
        var mess = events.find(function(event) {event.date === searchDate}).message;
        return mess;
    }

})();