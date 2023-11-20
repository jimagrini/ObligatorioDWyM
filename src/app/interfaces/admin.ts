import { IProposal } from "./proposal";

export interface IAdmin {
    _id: string;
    username: string;
    password: string;
    proposals: IProposal[];
}
