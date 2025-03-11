
const span = document.getElementById('lbl-new-ticket');
const button = document.querySelector('button');

console.log('Nuevo Ticket HTML');

async function getLast() {
    const lastTicket = await fetch('http://localhost:3000/api/tickets/last')
        .then(response => response.json())
        .then(data => span.innerHTML = data);
}



async function createTicket() {

    const newTicket = await
        fetch('http://localhost:3000/api/tickets', {
            method: 'POST'
        }).then(response => response.json());

    span.innerHTML = newTicket.number;
}


button.addEventListener('click',createTicket);
getLast();