import { IActivity } from "./activity";

export interface IProposal{
    _id: string;
    activities: IActivity[];
    name: string;
}