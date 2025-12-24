import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private sessionsList = new BehaviorSubject<Session[]>([
    {
      id: 's1',
      formationId: '1',
      dateDebut: new Date('2025-02-01'),
      dateFin: new Date('2025-02-15'),
      formateurs: ['1', '2'],
      capaciteMax: 15,
      candidats: ['c1', 'c2', 'c3']
    },
    {
      id: 's2',
      formationId: '1',
      dateDebut: new Date('2025-03-10'),
      dateFin: new Date('2025-03-24'),
      formateurs: ['1'],
      capaciteMax: 15,
      candidats: ['c4', 'c5']
    },
    {
      id: 's3',
      formationId: '2',
      dateDebut: new Date('2025-01-20'),
      dateFin: new Date('2025-02-03'),
      formateurs: ['2', '3'],
      capaciteMax: 15,
      candidats: ['c6', 'c7', 'c8', 'c9', 'c10']
    },
    {
      id: 's4',
      formationId: '3',
      dateDebut: new Date('2025-04-01'),
      dateFin: new Date('2025-05-31'),
      formateurs: ['1', '2', '3'],
      capaciteMax: 15,
      candidats: []
    },
    {
      id: 's5',
      formationId: '3',
      dateDebut: new Date('2025-06-01'),
      dateFin: new Date('2025-07-31'),
      formateurs: ['1', '3'],
      capaciteMax: 15,
      candidats: ['c11', 'c12']
    },
    {
      id: 's6',
      formationId: '4',
      dateDebut: new Date('2025-02-10'),
      dateFin: new Date('2025-03-03'),
      formateurs: ['2'],
      capaciteMax: 15,
      candidats: ['c13', 'c14', 'c15', 'c16', 'c17']
    }
  ]);

  sessionsList$ = this.sessionsList.asObservable();

  constructor() {}

  getSessions(): Observable<Session[]> {
    return this.sessionsList$;
  }

  getSession(id: string): Session | undefined {
    return this.sessionsList.value.find(s => s.id === id);
  }

  getSessionsByFormation(formationId: string): Session[] {
    return this.sessionsList.value.filter(s => s.formationId === formationId);
  }

  addSession(session: Session): void {
    const sessions = this.sessionsList.value;
    this.sessionsList.next([...sessions, session]);
  }

  updateSession(id: string, session: Partial<Session>): void {
    const sessions = this.sessionsList.value.map(s =>
      s.id === id ? { ...s, ...session } : s
    );
    this.sessionsList.next(sessions);
  }

  deleteSession(id: string): void {
    const sessions = this.sessionsList.value.filter(s => s.id !== id);
    this.sessionsList.next(sessions);
  }

  isSessionPlein(sessionId: string): boolean {
    const session = this.getSession(sessionId);
    return session ? session.candidats.length >= session.capaciteMax : false;
  }

  getNbCandidats(sessionId: string): number {
    const session = this.getSession(sessionId);
    return session ? session.candidats.length : 0;
  }
}
