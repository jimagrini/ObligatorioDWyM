import { IActivity } from "./activity";

export interface IProposal{
    id: string;
    activities: IActivity[];
    name: string;
}