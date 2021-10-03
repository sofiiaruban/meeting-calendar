//import "./style.css";
import "./style.scss";



let items = JSON.parse(localStorage.getItem('events'));

function getItem(arr){
    for (let i = 0; i < arr.length; i++) {
        let cell = document.querySelector(`tr[data-time="${arr[i]["time"]}"] td[data-day="${arr[i]["day"]}"]`);
        let eventName = document.createElement('span');
        eventName.innerHTML = `${arr[i]["eventName"]}` 
        cell.appendChild(eventName);
        cell.setAttribute("data-participant", `${arr[i]["participantName"]}`)
        cell.classList.add("occupied");
    }
}
getItem(items);

let table = document.querySelector('table');
table.onclick = function(event){
    let target = event.target;
    
    if (target.className =="close") {
        let getParent = target.parentNode;
        let getDay = getParent.dataset.day;
        let getTime = getParent.parentNode.dataset.time;
        deleteItem(getDay, getTime);
        rerenderTable(getDay, getTime);
    }
}
function deleteItem(day, time) {
    let index;
    for (let i = 0; i < items.length; i++) {
        if (items[i].day  == day && items[i].time == time) {
            index=i;
            break;
        }
    }
    if(index === undefined) return 
    items.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(items));

}
function rerenderTable(day, time) {
    let cell = document.querySelector(`tr[data-time="${time}"] td[data-day="${day}"]`);
    let eventName = cell.lastChild;
    cell.removeChild(eventName);
    cell.classList.remove(cell.classList[0],"occupied");

}
let input =  document.getElementById('participant');

input.addEventListener('change', filterMeeting);

function filterMeeting () {
    let inputedParticipant = input.value;
    let cells = document.querySelectorAll('td[data-participant]');
    
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('hide');
        if (cells[i].dataset.participant !== inputedParticipant && inputedParticipant !== "all") {
          cells[i].classList.add('hide');
        }  
    }
    
}
// to do 
// event-deliting-popup
// * fix close sign (markup);
// * fix redirect box

