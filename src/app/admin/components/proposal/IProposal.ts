import { IActivity } from "../../../activities/IActivity";

export interface IProposal{
    id: number, 
    activities: IActivity[],
    name: string;
}