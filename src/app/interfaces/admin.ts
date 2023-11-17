import { IProposal } from "./proposal";

export interface IAdmin {
    id: string;
    username: string;
    password: string;
    proposals: IProposal[];
}
