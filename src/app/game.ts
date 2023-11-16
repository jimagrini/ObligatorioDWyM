import { IProposal } from "./components/Admin/proposal/IProposal";

/**
 * Game interface
 */
export interface IGame {
    id: number;
    proposal: IProposal;
    users: string[];
    active: boolean;
}