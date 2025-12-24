import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormationsService } from '../services/formations.service';
import { SessionsService } from '../services/sessions.service';
import { FormateursService } from '../services/formateurs.service';
import { Formation } from '../models/formation.model';
import { Session } from '../models/session.model';
import { Formateur } from '../models/formateur.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-formations-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './formations-detail.html',
  styleUrl: './formations-detail.css',
})
export class FormationsDetailComponent implements OnInit, OnDestroy {
  formation: Formation | undefined;
  sessions: Session[] = [];
  formateurMap: Map<string, Formateur> = new Map();
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private formationsService: FormationsService,
    private sessionsService: SessionsService,
    private formateursService: FormateursService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const formationId = params['id'];
      this.formation = this.formationsService.getFormation(formationId);

      if (this.formation?.id) {
        this.sessions = this.sessionsService.getSessionsByFormation(this.formation.id);
        this.sessions.sort((a, b) => a.dateDebut.getTime() - b.dateDebut.getTime());
      }
    });

    // Charger tous les formateurs
    this.formateursService.getFormateurs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formateurs) => {
        formateurs.forEach(f => this.formateurMap.set(f.id, f));
      });
  }

  getFormateurNames(formateurIds: string[]): string {
    return formateurIds
      .map(id => {
        const formateur = this.formateurMap.get(id);
        return formateur ? `${formateur.prenom} ${formateur.nom}` : '';
      })
      .filter(name => name)
      .join(', ');
  }

  getNbCandidats(sessionId: string): number {
    return this.sessionsService.getNbCandidats(sessionId);
  }

  isSessionFull(sessionId: string): boolean {
    return this.sessionsService.isSessionPlein(sessionId);
  }

  downloadPDF(): void {
    alert('Le programme PDF sera disponible au téléchargement.');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
