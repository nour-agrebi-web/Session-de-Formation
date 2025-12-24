import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Formateur } from '../models/formateur.model';

@Injectable({
  providedIn: 'root'
})
export class FormateursService {
  private formateursList = new BehaviorSubject<Formateur[]>([
    {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@iset.tn',
      specialite: 'Angular',
      telephone: '+216 98 123 456'
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie.martin@iset.tn',
      specialite: 'TypeScript',
      telephone: '+216 98 789 012'
    },
    {
      id: '3',
      nom: 'Bernard',
      prenom: 'Pierre',
      email: 'pierre.bernard@iset.tn',
      specialite: 'Web Development',
      telephone: '+216 98 345 678'
    }
  ]);

  formateursList$ = this.formateursList.asObservable();

  constructor() {}

  getFormateurs(): Observable<Formateur[]> {
    return this.formateursList$;
  }

  getFormateur(id: string): Formateur | undefined {
    return this.formateursList.value.find(f => f.id === id);
  }

  addFormateur(formateur: Formateur): void {
    const formateurs = this.formateursList.value;
    this.formateursList.next([...formateurs, formateur]);
  }

  updateFormateur(id: string, formateur: Partial<Formateur>): void {
    const formateurs = this.formateursList.value.map(f =>
      f.id === id ? { ...f, ...formateur } : f
    );
    this.formateursList.next(formateurs);
  }

  deleteFormateur(id: string): void {
    const formateurs = this.formateursList.value.filter(f => f.id !== id);
    this.formateursList.next(formateurs);
  }
}
