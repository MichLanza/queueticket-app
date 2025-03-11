
const lblPending = document.querySelector('#lbl-pending');
const deskH = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const draw = document.querySelector('#btn-draw');
const finish = document.querySelector('#btn-done');
const currentTicketlbl = document.querySelector('small');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('escritorio requerido');
}
const deskNumber = searchParams.get('escritorio');
let workingTicket = null;
deskH.innerHTML = deskNumber;



async function getTicket() {

    await finishTicket();

    const { status, ticket, message } = await fetch(`/api/tickets/draw/${deskNumber}`)
        .then(resp => resp.json());

    if (status === 'error') {
        currentTicketlbl.innerHTML = message;
        return;
    }

    workingTicket = ticket;
    currentTicketlbl.innerHTML = ticket.number;

}

async function finishTicket() {

    if (!workingTicket) return;

    const { status, message } = await fetch(`/api/tickets/done/${workingTicket.id}`, {
        method: 'PUT'
    }).then(resp => resp.json());

    if (status === 'error') {
        currentTicketlbl.innerHTML = message;
        return;
    }
    workingTicket = null;
    currentTicketlbl.innerHTML = 'nadie';
}

function checkTicketCount(currentCount = 0) {
    if (currentCount === 0) {
        noMoreAlert.classList.remove('d-none');
    } else {
        noMoreAlert.classList.add('d-none');
    }
    lblPending.innerHTML = currentCount;
}


async function loadInitialCount() {
    const pending = await fetch('/api/tickets/pending').then(res => res.json());
    checkTicketCount(pending.length);
}


function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        console.log(event.data);
        const { type, payload } = JSON.parse(event.data);
        if (type !== 'on-ticket-count-changed') return;
        checkTicketCount(payload);
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}

draw.addEventListener('click', getTicket);
finish.addEventListener('click', finishTicket);

connectToWebSockets();

loadInitialCount();