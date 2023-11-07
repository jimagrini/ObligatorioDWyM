import { IActivity } from "../activities/IActivity";

export interface IProposal{
    id: string, 
    activities: IActivity[],
    name: string;
}