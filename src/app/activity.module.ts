export interface Actividad {
    id: number;
    titulo: string;
    descripcion: string;
    imagenUrl: string;
  }
  
  export interface Voto {
    actividadId: number;
    voto: number; // +1: Me gusta, -1: No me gusta, 0: Me da igual
  }