export interface IActivity {
    id: number,
    name: string,
    category: string,
    description: string,
    image: URL,
    selected: boolean,
}

export const CATEGORIES = ['Deportiva', 'Visita', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual'];

