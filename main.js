
// проверка удаления
/*Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 7), "a",
    function() {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 10), "b",
    function() {
        console.log("callback 22222!")
    });
Calendar.updateEvent('a', 'c');
Calendar.deleteEvent('c');*/

//проверка выполнения нескольких событий друг за другом
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 5), "a",
    function() {
        console.log("callback 1!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 5), "aa",
    function() {
        console.log("callback 11!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 7), "b",
    function() {
        console.log("callback 2!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 9), "c",
    function() {
        console.log("callback 3!")
    });
Calendar.deleteEvent('c');
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 11), "d",
    function() {
        console.log("callback 4!")
    });
