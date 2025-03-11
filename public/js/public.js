

function renderTickets(tickets = []) {
    for (let i = 0; i < tickets.length; i++) {

        if (i >= 4) break;

        const ticket = tickets[i];

        if (!ticket) continue;

        const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
        const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

        lblTicket.innerText = `Ticket ${ticket.number}`;
        lblDesk.innerText = ticket.handleAtDesk;
    }


}

async function getWorkingOnTickets() {


    const tickets = await fetch(`/api/tickets/working-on`)
        .then(resp => resp.json());

    renderTickets(tickets);
}

function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
        console.log(event.data);
        const { type, payload } = JSON.parse(event.data);
        if (type !== 'on-ticket-workingon-changed') return;
        renderTickets(payload);
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
connectToWebSockets();
getWorkingOnTickets();
