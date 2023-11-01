export interface IActivity {
    id: number;
    /*gameUrl: string;*/
    name: string;
    category: string;
    description: string;
    image: URL;
}

export const CATEGORIES = ['Deportiva', 'Visita', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual'];

