import { Request, Response } from "express";


export class TicketController {


    constructor() { }

    public getTickets = async (req: Request, res: Response) => {
        res.json('getTickets works!');
    }
    public getLastTicket = async (req: Request, res: Response) => {
        res.json('getLastTicket works!');
    }
    public pendingTickets = async (req: Request, res: Response) => {
        res.json('pendingTickets works!');
    }
    public createTicket = async (req: Request, res: Response) => {
        res.json('createTicket works!');
    }
    public drawTicket = async (req: Request, res: Response) => {
        res.json('drawTicket works!');
    }
    public ticketFinished = async (req: Request, res: Response) => {
        res.json('ticketFinished works!');
    }
    public workingOn = async (req: Request, res: Response) => {
        res.json('workingOn works!');
    }
    
    private handleError = () => {
        
    }

}