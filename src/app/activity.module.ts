export interface Activity {
  id: number;
  name: string;
  category: string;
  description: string;
  image: URL;
}

export const CATEGORIES = ['Deportiva', 'Al aire libre', 'Cultural', 'Lúdica', 'Relajación', 'Audio-visual'];

export interface Vote {
  activityId: number;
  value: number; // +1: Me gusta, -1: No me gusta, 0: Me da igual
}