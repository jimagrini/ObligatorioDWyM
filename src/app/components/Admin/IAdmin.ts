import { IProposal } from "./proposal/IProposal";

export interface IAdmin {
    id: number;
    username: string;
    password: string;
    proposals: IProposal[];
}
