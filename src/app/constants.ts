import { IAdmin } from "./interfaces/admin";
import { IActivity } from "./interfaces/activity";
import { IGame } from "./interfaces/game";
import { IProposal } from "./interfaces/proposal";

export const ADMINISTRATORS: IAdmin[] = [
    { _id: "1", username: 'mcgreene', password: '1234', proposals: [] },
    { _id: "2", username: 'panchei', password: '2345', proposals: [] },
    { _id: "3", username: 'diego_Handa', password: '3456', proposals: [] },
    { _id: "4", username: 'villoldo', password: '4567', proposals: [] },
];

export const ACTIVITIES: IActivity[] = [
    { _id: "1", name: 'Paseo por el bosque', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "2", name: 'Tarde en la playa', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "3", name: 'Campeonato de fifa', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "4", name: 'Torneo de truco', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "5", name: 'Asado', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "6", name: 'Mates en en el parque', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "7", name: 'Ir al club', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "8", name: 'Ir al gimnasio', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "9", name: 'Chevrolet', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
    { _id: "10", name: 'Chevrolet', category: 'Onix Premiere', description: 'Onix Premiere', image: "https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg", selected: false },
];

export const CATEGORIES = ['Deportiva', 'Visita', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual'];

export const GAMES: IGame[] = [];

export const PROPOSALS: IProposal[] = [
    { _id: "1", activities: [ACTIVITIES[1], ACTIVITIES[2], ACTIVITIES[3]], name: "Proposal 1" },
    { _id: "2", activities: [ACTIVITIES[4], ACTIVITIES[5], ACTIVITIES[1]], name: "Proposal 2" },
    { _id: "3", activities: [ACTIVITIES[6], ACTIVITIES[2], ACTIVITIES[1]], name: "Proposal 3" },
    { _id: "4", activities: [ACTIVITIES[1], ACTIVITIES[0], ACTIVITIES[9]], name: "Proposal 4" },
    { _id: "5", activities: [ACTIVITIES[9], ACTIVITIES[8], ACTIVITIES[7]], name: "Proposal 5" },
    { _id: "6", activities: [ACTIVITIES[4], ACTIVITIES[2], ACTIVITIES[6]], name: "Proposal 6" },
    { _id: "7", activities: [ACTIVITIES[6], ACTIVITIES[1], ACTIVITIES[2]], name: "Proposal 7" },
];
