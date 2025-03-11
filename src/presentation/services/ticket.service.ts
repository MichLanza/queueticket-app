import { v4 } from "../../config/uuid.adapter";
import { Ticket } from '../../domain/interfaces/tickets';
import { WssService } from './wss.serivice';

export class TicketService {


    constructor(
        private readonly wssService: WssService = WssService.instance,
    ) { }

    public tickets: Ticket[] = [
        { id: v4(), number: 1, createdAt: new Date(), done: false },
        { id: v4(), number: 2, createdAt: new Date(), done: false },
        { id: v4(), number: 3, createdAt: new Date(), done: false },
        { id: v4(), number: 4, createdAt: new Date(), done: false },
        { id: v4(), number: 5, createdAt: new Date(), done: false },
        { id: v4(), number: 6, createdAt: new Date(), done: false },
    ];

    private readonly workingOnTickets: Ticket[] = [];

    public get pendingTickets(): Ticket[] {
        return this.tickets.filter(t => !t.handleAtDesk);
    }

    public get lastWorkingOnTickets(): Ticket[] {
        return this.workingOnTickets.slice(0, 4);
    }

    public get lastTicket(): number {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
    }

    public createTicket() {

        const newTicket: Ticket = {
            id: v4(),
            number: this.lastTicket + 1,
            createdAt: new Date(),
            done: false,
        }
        this.tickets.push(newTicket);

        this.onTicketNumberChanged();
        return newTicket;
    }

    public drawTicket(desk: string) {

        const ticket = this.tickets.find(t => !t.handleAtDesk);

        if (!ticket) return { status: 'error', message: 'No hay tickets pendientes' };
        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({ ...ticket });

        this.onTicketNumberChanged();
        this.onWorkingOnChanged();

        return { status: 'ok', ticket }
    }

    public finishTicket(id: string) {
        const ticket = this.tickets.find(t => t.id === id);
        if (!ticket) return { status: 'error', message: 'Ticket no encontrado' };
        this.tickets = this.tickets.map(ticket => {
            if (ticket.id === id) {
                ticket.done = true;
            }
            return ticket;
        });


        return { status: 'ok' }
    }

    private onTicketNumberChanged() {
        this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length);
    }

    private onWorkingOnChanged() {
        this.wssService.sendMessage('on-ticket-workingon-changed', this.lastWorkingOnTickets);
    }
}