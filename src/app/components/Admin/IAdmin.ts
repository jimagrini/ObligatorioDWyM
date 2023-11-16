import { IProposal } from "./proposal/IProposal";

export interface IAdmin {
    id: string;
    username: string;
    password: string;
    proposals: IProposal[];
}
