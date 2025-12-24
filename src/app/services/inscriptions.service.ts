import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscription } from '../models/inscription.model';
import { SessionsService } from './sessions.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private inscriptionsList = new BehaviorSubject<Inscription[]>([
    {
      id: 'c1',
      sessionId: 's1',
      nom: 'Benali',
      prenom: 'Ali',
      email: 'ali.benali@email.com',
      dateInscription: new Date('2025-01-10')
    },
    {
      id: 'c2',
      sessionId: 's1',
      nom: 'Halioui',
      prenom: 'Mariam',
      email: 'mariam.halioui@email.com',
      dateInscription: new Date('2025-01-12')
    },
    {
      id: 'c3',
      sessionId: 's1',
      nom: 'Mansouri',
      prenom: 'Hassan',
      email: 'hassan.mansouri@email.com',
      dateInscription: new Date('2025-01-14')
    },
    {
      id: 'c4',
      sessionId: 's2',
      nom: 'Jlidi',
      prenom: 'Fatima',
      email: 'fatima.jlidi@email.com',
      dateInscription: new Date('2025-01-15')
    },
    {
      id: 'c5',
      sessionId: 's2',
      nom: 'Khatib',
      prenom: 'Youssef',
      email: 'youssef.khatib@email.com',
      dateInscription: new Date('2025-01-16')
    }
  ]);

  inscriptionsList$ = this.inscriptionsList.asObservable();

  constructor(private sessionsService: SessionsService) {}

  getInscriptions(): Observable<Inscription[]> {
    return this.inscriptionsList$;
  }

  getInscription(id: string): Inscription | undefined {
    return this.inscriptionsList.value.find(i => i.id === id);
  }

  getInscriptionsBySession(sessionId: string): Inscription[] {
    return this.inscriptionsList.value.filter(i => i.sessionId === sessionId);
  }

  addInscription(inscription: Inscription): boolean {
    // Vérifier si la session n'est pas pleine
    if (this.sessionsService.isSessionPlein(inscription.sessionId)) {
      return false;
    }

    const inscriptions = this.inscriptionsList.value;
    const newInscription = {
      ...inscription,
      id: Math.random().toString(36).substring(7),
      dateInscription: new Date()
    };

    // Ajouter le candidat à la liste des candidats de la session
    const session = this.sessionsService.getSession(inscription.sessionId);
    if (session) {
      session.candidats.push(newInscription.id);
      this.sessionsService.updateSession(inscription.sessionId, { candidats: session.candidats });
    }

    this.inscriptionsList.next([...inscriptions, newInscription]);
    return true;
  }

  deleteInscription(id: string): void {
    const inscription = this.getInscription(id);
    if (inscription) {
      const session = this.sessionsService.getSession(inscription.sessionId);
      if (session) {
        session.candidats = session.candidats.filter(c => c !== id);
        this.sessionsService.updateSession(inscription.sessionId, { candidats: session.candidats });
      }
    }

    const inscriptions = this.inscriptionsList.value.filter(i => i.id !== id);
    this.inscriptionsList.next(inscriptions);
  }
}
