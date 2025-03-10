import { v4 } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/tickets";

export class TicketService {



    private readonly tickets: Ticket[] = [
        { id: v4(), number: 1, createdAt: new Date(), done: false },
        { id: v4(), number: 2, createdAt: new Date(), done: false },
        { id: v4(), number: 3, createdAt: new Date(), done: false },
        { id: v4(), number: 4, createdAt: new Date(), done: false },
        { id: v4(), number: 5, createdAt: new Date(), done: false },
        { id: v4(), number: 6, createdAt: new Date(), done: false },
    ];

}