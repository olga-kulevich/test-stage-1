(function (global) {
  var repeatEventList = [];
  var that;

  function Repeater() {
    global.Calendar.apply(this, arguments);
    that = this;
  }

  Repeater.prototype = Object.create(global.Calendar.prototype);
  Repeater.prototype.constructor = Repeater;

  Repeater.prototype.addRepeatedEvent = function (date, name, callback, repeatedDays) {
    var seriaOfEvents = {};
    var newEvent;
    var dateNow = new Date();
    var candidate;
    var dateAfterTwoYears;

    if (typeof (name) === 'string' && typeof (date) === 'number'
      && typeof (callback) === 'function' && typeof (repeatedDays) === 'object') {
      seriaOfEvents = {
        id: new Date().getTime() + '-' + Math.random().toFixed(36).substr(2, 10),
        time: date,
        name: name,
        callback: callback,
        days: repeatedDays,
        ids: []
      };

      candidate = new Date(date * 1000);
      dateAfterTwoYears = new Date(dateNow.setFullYear(dateNow.getFullYear() + 2));

      while (candidate < dateAfterTwoYears) {
        if (repeatedDays.indexOf(candidate.getDay()) !== -1) {
          newEvent = Repeater.prototype.addEvent(candidate.getTime() / 1000, name, callback);
          seriaOfEvents.ids.push(newEvent.id);
        }
        candidate.setDate(candidate.getDate() + 1);
      }
      repeatEventList.push(seriaOfEvents);
      console.log(repeatEventList);
    } else {
      return;
    }
  };

  Repeater.prototype.UpdateRepeatedEvent = function (id, newName, newDate, dates) {
  };

  Repeater.prototype.deleteEvent = function (id) {
    var i;
    var j;
    var series;

    for (i = 0; i < repeatEventList.length; i + 1) {
      if (repeatEventList[i].ids.indexOf(id) !== -1) {
        series = repeatEventList[i];
        console.log(series);
        return;
      }
    }

    if (series) {
      for (j = 0; j < series.ids.length; j + 1) {
        global.Calendar.prototype.deleteEvent.call(this, series.ids[j]);
      }
      repeatEventList = repeatEventList.filter(function (seriesEv) {
        return seriesEv.id !== series.id;
      });
    } else {
      global.Calendar.prototype.deleteEvent.call(this, id);
    }
  };

  global.Repeater = Repeater;
}(typeof module !== 'undefined' ? module.exports : window));
