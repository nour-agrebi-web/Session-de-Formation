export interface Formation {
  id: string;
  titre: string;
  description: string;
  chargeHoraire: number;
  programme?: string; // URL ou contenu du PDF
  sessions?: string[]; // IDs des sessions
}
