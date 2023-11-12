import { IAdmin } from "./components/Admin/IAdmin";
import { IProposal } from "./components/Admin/proposal/IProposal";
import { IUser } from "./components/User/IUser";

export class Game implements IGame {

    id: number;
    private users: IUser[];
    admin: IAdmin;
    proposal: IProposal;
    active: boolean;
    fromDate: Date;
    upToDate: Date;

    index = 0;

    constructor(id: number, admin: IAdmin, proposal: IProposal, fromDate: Date, upToDate: Date) {
        this.id = id;
        this.users = [];
        this.admin = admin;
        this.proposal = proposal;
        this.active = false;
        this.fromDate = fromDate;
        this.upToDate = upToDate;
    }

    genId(): string {
        const id = this.id + "-" + this.index;
        return id;
    }

    addUser(user: IUser){
        this.users.push(user);
    }
}

export interface IGame {
    id: number;
    admin: IAdmin;
    proposal: IProposal;
    active: boolean;
    fromDate: Date;
    upToDate: Date;
}