var date = moment().format('LL');
$("#currentDay").text(date);
var agendaJSON;
var agenda = {
    9: "Arrive at office",
    10: "Check email",
    11: "Answer letters",
    12: "lunch",
    13: "Do some coding",
    14: "Break",
    15: "Code review",
    16: "Clean up",
    17: "Go home"
};
var agendaItems;  // array of agenda items [[9, "arrive"], [10,"email"]...]
var time;         //  what time slot working on
var agendaItem;           // agenda item (text) for this time slot

// var object = JSON.parse(localStorage.getItem("object-json"));

agendaJSON = JSON.stringify(agenda);
localStorage.setItem("agenda", agendaJSON);
console.log("agenda:  " + agenda);
console.log("agendaJSON:  " + agendaJSON);
// alert("Check localStorage");

agendaItems = Object.entries(agenda);
console.log("agendaItems:  " + agendaItems);

console.log("begin to loop through agenda items")
const keys = Object.entries(agendaItems);
for (const key of keys) {                    // get array of [time, agendaitem] for each time slot
    time = key[1][0];           // the key is the time slot ("9" for 9am, etc)
    agendaItem = key[1][1];
    $("#time" + time).text(agendaItem);

};
    



//agenda.time9 = "Forget emails";
//$("#time9").text(agenda.time9);
//console.log()



agendaJSON = localStorage.getItem("agenda");
agenda = JSON.parse(agendaJSON);
console.log("agendaJSON from localStorage:  " + agendaJSON);
console.log("agenda from localStorage:  " + agenda);
localStorage.removeItem("agenda");
// alert("check localStorage - agenda should be gone");
