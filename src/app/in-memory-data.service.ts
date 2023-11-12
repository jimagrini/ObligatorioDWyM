import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IAdmin } from "./components/Admin/IAdmin";
import { IActivity } from "./components/Admin/activities/IActivity";
import { IProposal } from "./components/Admin/proposal/IProposal";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {    //The in-memory-data.service.ts file takes over the function of mock-heroes.ts
    const activities = [
      { id: 1, name: 'Paseo por el bosque', category: 'Onix Premiere', description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 2, name: 'Tarde en la playa', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 3, name: 'Campeonato de fifa', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 4, name: 'Torneo de truco', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 5, name: 'Asado', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 6, name: 'Mates en en el parque', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 7, name: 'Ir al club', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 8, name: 'Ir al gimnasio', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 9, name: 'Chevrolet', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
      { id: 10, name: 'Chevrolet', category: 'Onix Premiere',  description: 'Onix Premiere', image: new URL("https://www.megautos.com/wp-content/uploads/2019/10/chevrolet-onix-premier-2020-dinamica.jpg"), selected: false},
  ];

  const admins= [
    { id: 1, fullName: 'Juan Magrini', username: 'mcgreene', email: 'juan@gmail.com', password: '1234'},
    { id: 2, fullName: 'Francisco Cabarcos', username: 'panchei', email: 'fran@gmail.com',  password: '2345'},
    { id: 3, fullName: 'Diego Handalian', username: 'diego_Handa', email: 'diego@gmail.com',  password: '3456'},
    { id: 4, fullName: 'Felipe Villaronga', username: 'villoldo', email: 'felipe@gmail.com',  password: '4567'},
];

  const proposals = [
    { id: 1, activities: [activities[1],activities[2],activities[3]], name: "Proposal 1"},
    { id: 2, activities: [activities[4],activities[5],activities[1]], name: "Proposal 2"},
    { id: 3, activities: [activities[6],activities[2],activities[1]], name: "Proposal 3"},
    { id: 4, activities: [activities[1],activities[0],activities[9]], name: "Proposal 4"},
    { id: 5, activities: [activities[9],activities[8],activities[7]], name: "Proposal 5"},
    { id: 6, activities: [activities[4],activities[2],activities[6]], name: "Proposal 6"},
    { id: 7, activities: [activities[6],activities[1],activities[2]], name: "Proposal 7"},
  ];

  const categories = ['Deportiva', 'Visita', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual', 'Otros'];

    return {activities, proposals, admins, categories};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genActId(activities: IActivity[]): number {
    return activities.length > 0 ? Math.max(...activities.map(activity => activity.id)) + 1 : 11;
  }
  genPropId(proposals: IProposal[]): number {
    return proposals.length > 0 ? Math.max(...proposals.map(proposal => proposal.id)) + 1 : 11;
  }

}

