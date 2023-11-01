export interface IActivity {
    id: number,
    /*gameUrl: string,*/
    name: string,
    category: string,
    description: string,
    image: URL,
    selected: boolean,
}

export const CATEGORIES = ['Deportiva', 'Visita', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual'];

