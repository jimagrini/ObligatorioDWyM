import { IAdmin } from "./components/Admin/IAdmin";
import { IActivity } from "./components/Admin/activities/IActivity";

export const ADMINISTRATORS: IAdmin[] = [
    { id: 1, fullName: 'Juan Magrini', username: 'mcgreene', email: 'juan@gmail.com', password: '1234'},
    { id: 2, fullName: 'Francisco Cabarcos', username: 'panchei', email: 'fran@gmail.com',  password: '2345'},
    { id: 3, fullName: 'Diego Handalian', username: 'diego_Handa', email: 'diego@gmail.com',  password: '3456'},
    { id: 4, fullName: 'Felipe Villaronga', username: 'villoldo', email: 'felipe@gmail.com',  password: '4567'},
];

export const ACTIVITIES: IActivity[] = [
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

export const CATEGORIES = ['Deportiva', 'Visita', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual'];