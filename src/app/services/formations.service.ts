import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Formation } from '../models/formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {
  private formationsList = new BehaviorSubject<Formation[]>([
    {
      id: '1',
      titre: 'Angular Avancé',
      description: 'Maîtriser les concepts avancés d\'Angular, l\'architecture modulaire et les bonnes pratiques de développement.',
      chargeHoraire: 40,
      programme: 'Programme complet disponible',
      sessions: ['s1', 's2']
    },
    {
      id: '2',
      titre: 'TypeScript Masterclass',
      description: 'Apprendrez TypeScript en profondeur avec les types génériques, les décorateurs et la programmation fonctionnelle.',
      chargeHoraire: 30,
      programme: 'Programme complet disponible',
      sessions: ['s3']
    },
    {
      id: '3',
      titre: 'Web Development Fullstack',
      description: 'Développement fullstack avec Angular en frontend et Node.js en backend.',
      chargeHoraire: 60,
      programme: 'Programme complet disponible',
      sessions: ['s4', 's5']
    },
    {
      id: '4',
      titre: 'RxJS et Programmation Réactive',
      description: 'Maîtriser RxJS, les Observables et la programmation réactive avec Angular.',
      chargeHoraire: 25,
      programme: 'Programme complet disponible',
      sessions: ['s6']
    }
  ]);

  formationsList$ = this.formationsList.asObservable();

  constructor() {}

  getFormations(): Observable<Formation[]> {
    return this.formationsList$;
  }

  getFormation(id: string): Formation | undefined {
    return this.formationsList.value.find(f => f.id === id);
  }

  searchFormations(keyword: string): Observable<Formation[]> {
    const formations = this.formationsList.value.filter(f =>
      f.titre.toLowerCase().includes(keyword.toLowerCase()) ||
      f.description.toLowerCase().includes(keyword.toLowerCase())
    );
    return new BehaviorSubject<Formation[]>(formations).asObservable();
  }

  addFormation(formation: Formation): void {
    const formations = this.formationsList.value;
    this.formationsList.next([...formations, formation]);
  }

  updateFormation(id: string, formation: Partial<Formation>): void {
    const formations = this.formationsList.value.map(f =>
      f.id === id ? { ...f, ...formation } : f
    );
    this.formationsList.next(formations);
  }

  deleteFormation(id: string): void {
    const formations = this.formationsList.value.filter(f => f.id !== id);
    this.formationsList.next(formations);
  }
}
