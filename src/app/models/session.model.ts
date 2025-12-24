export interface Session {
  id: string;
  formationId: string;
  dateDebut: Date;
  dateFin: Date;
  formateurs: string[]; // IDs des formateurs
  capaciteMax: number;
  candidats: string[]; // IDs des candidats inscrits
}
