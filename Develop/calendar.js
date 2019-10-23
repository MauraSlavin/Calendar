var date = moment().format('LL');   // get today
var agenda;        // agenda is an object.  keys are times of day, values are agenda items
var agendaJSON;         // Object "agenda" as a JSON
var agendaItems;  // array of agenda items [[9, "arrive"], [10,"email"]...]
var time;         //  what time slot working on
var agendaItem;           // agenda item (text) for this time slot

$("#currentDay").text(date);        // put today's date on the webpage

// get agenda from local Storage
agendaJSON = localStorage.getItem("agenda");
agenda = JSON.parse(agendaJSON);

if (agenda == null) {
    agenda = {                      // object agenda with each hour slot and text 
        9: "Arrive at office",           // values assigned for testing purposes
        10: "",
        11: "Answer letters",
        12: "lunch",
        13: "Do some coding",
        14: "Break",
        15: "Code review",
        16: "Clean up",
        17: "Go home"
    };
}

// pull agenda items from the object
agendaItems = Object.entries(agenda);

// for each agenda item, set the placeholder in the textarea to the agenda item that was saved in local storage
const keys = Object.entries(agendaItems);
for (const key of keys) {                    // get array of [time, agendaitem] for each time slot
    time = key[1][0];           // the key is the time slot ("9" for 9am, etc)
    agendaItem = key[1][1];     // the value is the agenda item text
    $("#agenda" + time).attr("placeholder", agendaItem);   // change the text in the textarea (the placeholder)
};





// clear what was in localStorage, and store new information
localStorage.clear();

// Store agenda in localStorage
agendaJSON = JSON.stringify(agenda);
localStorage.setItem("agenda", agendaJSON);
