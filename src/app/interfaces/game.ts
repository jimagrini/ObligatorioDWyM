import { IActivity } from "./activity";
import { IProposal } from "./proposal";

/**
 * Game interface
 */
export interface IGame {
    _id: string;
    proposal: IProposal;
    users: string[];
    votes: Map<string, number>;
    active: boolean;
    currentActivity: IActivity;
}