let addbtn = document.querySelector(".add-btn");
let removebtn = document.querySelector(".delete-btn");
let modal = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let addFlag = false;
let removeFlag = false;
let ticketColor = "black";
let modalColors = document.querySelectorAll(".priority-color");
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let toolboxColors = document.querySelectorAll(".color");
let ticketsArr = [];

// If tickets are already present in local storage then retrieve the data by creating those tickets
if(localStorage.getItem("jira_tickets")){
    ticketsArr = JSON.parse(localStorage.getItem("jira_tickets"));
    ticketsArr.forEach((ticketObj) => {
        createTicket(ticketObj.ticket_color, ticketObj.ticket_task, ticketObj.ticket_Id, true);
    })
}


modalColors.forEach(function(priorityColor){
    priorityColor.addEventListener("click", (e) => {
        for(let i = 0; i < modalColors.length; i++){
            modalColors[i].classList.remove("border");
        }
        priorityColor.classList.add("border");
        ticketColor = priorityColor.classList[0];
        console.log(ticketColor);
    })
})

addbtn.addEventListener("click", (e) => {
    //Display Modal
    if(addFlag == false){
        modal.style.display = "flex";
        addFlag = true;
    }
    else{
        modal.style.display = "none";
        addFlag = false;
        setModalToDefault();
    }
})

modal.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key === "Shift"){
        createTicket(ticketColor, textareaCont.value, shortid(), false);
        setModalToDefault();
        addFlag = false;
    }
})

function createTicket(ticket_color, ticket_task, ticket_Id, ifCalledFromLocalStorage){
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket-cont");
    ticket.innerHTML = `
        <div class="ticket-color ${ticket_color}"></div>
        <div class="ticket-id">#${ticket_Id}</div>
        <div class="task-area">${ticket_task}</div>
        <div class="ticket-lock"><i class="fas fa-lock"></i></div>
    `;
    mainCont.appendChild(ticket);
    handleRemove(ticket, ticket_Id);
    handleLock(ticket, ticket_Id);
    handleColor(ticket, ticket_Id);
    setModalToDefault();

    if(ifCalledFromLocalStorage == false){
        ticketsArr.push({ticket_color, ticket_task, ticket_Id});
        localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
    }   
}

removebtn.addEventListener("click", (e) => {
    if(removeFlag == false){
        removeFlag = true;
        removebtn.style.backgroundColor = "#8395a7";
    }
    else{
        removeFlag = false;
        removebtn.style.removeProperty('background-color');
    }
})

function handleRemove(ticket, ticket_Id){
    ticket.addEventListener("click", (e) => {
        if(removeFlag == true){
            ticket.remove();

            let remIdx = findTicketIdx(ticket_Id);
            ticketsArr.splice(remIdx, 1);
            localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
        }
    });
}

function handleLock(ticket, ticket_Id){
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let lock = ticketLockElem.children[0];
    let taskArea = ticket.querySelector(".task-area");

    lock.addEventListener("click", (e) => {
        if(lock.classList.contains(lockClass)){
            lock.classList.remove(lockClass);
            lock.classList.add(unlockClass);
            taskArea.setAttribute("contenteditable", "true");
        }
        else{
            lock.classList.remove(unlockClass);
            lock.classList.add(lockClass);
            taskArea.setAttribute("contenteditable", "false");
        }

        let idxOfThisTicket = findTicketIdx(ticket_Id);
        ticketsArr[idxOfThisTicket].ticket_task = taskArea.innerText;
        localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
    })
}


function handleColor(ticket, ticket_Id){
    let ticketColorElem = ticket.querySelector(".ticket-color");
    ticketColorElem.addEventListener("click", (e) => {
        let currentTicketColor = ticketColorElem.classList[1];
        let currentColorIdx = "";

        for(let i = 0; i < colors.length; i++){
            if(colors[i] == currentTicketColor){
                currentColorIdx = i;
                break;
            }
        }

        let newColoridx = (currentColorIdx + 1) % colors.length;
        let newColor = colors[newColoridx];
        ticketColorElem.classList.remove(currentTicketColor);
        ticketColorElem.classList.add(newColor);

        let idxOfThisTicket = findTicketIdx(ticket_Id);
        ticketsArr[idxOfThisTicket].ticket_color = newColor;
        localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
    })  
}

for(let i = 0; i < toolboxColors.length; i++){
    toolboxColors[i].addEventListener("click", (e) => {
        let colorSelected = toolboxColors[i].classList[0];
        let allTickets = document.querySelectorAll(".ticket-cont");

        for(let j = 0; j < allTickets.length; j++){
            if(allTickets[j].querySelector(".ticket-color").classList[1] == colorSelected){
                allTickets[j].style.display = "block";
            }
            else{
                allTickets[j].style.display = "none";
            }
        }
    })
}

for(let i = 0; i < toolboxColors.length; i++){
    toolboxColors[i].addEventListener("dblclick", (e) => {
        let allTickets = document.querySelectorAll(".ticket-cont");

        for(let j = 0; j < allTickets.length; j++){
            allTickets[j].style.display = "block";
        }
    })
}

function setModalToDefault(){
    modal.style.display = "none";
    textareaCont.value = "";
    for(let i = 0; i < modalColors.length; i++){
        modalColors[i].classList.remove("border");
    }

    modalColors[modalColors.length - 1].classList.add("border");
    ticketColor = "black";
}

function findTicketIdx(id){
    let remIdx = 0;
    for(let i = 0; i < ticketsArr.length; i++){
        if(ticketsArr[i].ticket_Id == id){
            remIdx = i;
            break;
        }
    }
    return remIdx;
}