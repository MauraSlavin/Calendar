var agenda;        // agenda is an object.  keys are times of day, values are agenda item
var agendaJSON;         // Object "agenda" in JSON form
var agendaItems;  // array of agenda items [[9, "arrive"], [10,"email"]...]
var agendaItem;           // agenda item (text) for this time slot
var time;         //  what time slot working on
var militaryHours   // use military time (hours) to determine how to shade rows
var date = moment().format('LL');   // get today



// get time information needed: today's date, current hour in military time (i.e. 13 for 1:xx pm)
$("#currentDay").text(date);        // put today's date on the webpage
militaryHours = moment()._d.getHours();   // get current military time; just the hours (i.e. 13 for 1:xx pm) as an integer

// get agenda from local Storage
agendaJSON = localStorage.getItem("agenda");
agenda = JSON.parse(agendaJSON);

// set default agenda items, if none stored
if (agenda == null) {
    agenda = {                      // object agenda with each hour slot and text 
        9: "",           // assume lunch is at noon, otherwise initialize with no text
        10: "",
        11: "",
        12: "Lunch",
        13: "",
        14: "",
        15: "",
        16: "",
        17: ""
    };
};

// pull agenda items from the object
agendaItems = Object.entries(agenda);

const keys = Object.entries(agendaItems);
// for each agenda item, set the placeholder in the textarea to the agenda item that was saved in local storage
for (const key of keys) {                    // get array of [time, agendaitem] for each time slot
    time = key[1][0];           // the key is the time slot ("9" for 9am, etc)
    agendaItem = key[1][1];     // the value is the agenda item text
    $("#agenda" + time).attr("placeholder", agendaItem);   // change the text in the textarea (the placeholder)

    time = parseInt(time);      // use time as an interger for the last part

    //  color past rows, current row, and future rows appropriately
    if (time < militaryHours) {
        $("#agenda" + time).addClass("past");
    }
    else if (time == militaryHours) {
        $("#agenda" + time).addClass("current");
    }
    else {
        $("#agenda" + time).addClass("future");
    };

};

// save item to localstorage; take highlighting that it has not been saved off
$(".saveAgendaItem").click(function (event) {
    event.preventDefault();
    time = $(this).val();     // time slot to change the agenda item for
    agendaItem = $("textarea#agenda" + time).val();     // get agenda item text entered
    agenda[time] = agendaItem;   // put new agenda item in calendar to be saved to local Storage
    
    // $(this).siblings().removeClass("notSaved");  // no longer highlighted as not saved.
    $(this).parent().parent().find("textarea").removeClass("notSaved");
    $(this).parent().parent().find("textarea").attr("color","black");  // make sure color is black, too (was going to white)
    // replace localStorage with new data
    localStorage.clear();
    agendaJSON = JSON.stringify(agenda);
    localStorage.setItem("agenda", agendaJSON);
});   // end of clicked on save button

// highlight text as not being saved, yet.
$("textarea").click(function(event) {
    event.preventDefault();
    $(this).addClass("notSaved");   // highlight text as not having been saved
});