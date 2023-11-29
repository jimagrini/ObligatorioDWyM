import { IActivity } from "./activity";
import { IProposal } from "./proposal";

/**
 * Game interface
 */
export interface IGame {
    _id: string;              // Identificador único del juego
    proposal: IProposal;      // Propuesta asociada al juego
    users: string[];          // Lista de identificadores de usuarios en el juego
    votes: Map<string, number>; // Mapa de votos, donde la clave es el ID de la actividad y el valor es el voto
    active: boolean;          // Indica si el juego está activo o no
    currentActivity: IActivity; // Actividad actual en el juego
}
