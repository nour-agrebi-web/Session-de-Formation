import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationsService } from '../services/formations.service';
import { SessionsService } from '../services/sessions.service';
import { InscriptionsService } from '../services/inscriptions.service';
import { FormateursService } from '../services/formateurs.service';
import { Formation } from '../models/formation.model';
import { Session } from '../models/session.model';
import { Formateur } from '../models/formateur.model';
import { Inscription } from '../models/inscription.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-formations-sessions',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-formations-sessions.html',
  styleUrl: './admin-formations-sessions.css',
})
export class AdminFormationsSessionsComponent implements OnInit, OnDestroy {
  formations: Formation[] = [];
  sessions: Session[] = [];
  formateurs: Formateur[] = [];
  formationForm!: FormGroup;
  sessionForm!: FormGroup;
  selectedFormation: Formation | null = null;
  selectedSession: Session | null = null;
  sessionCandidats: Inscription[] = [];
  showFormationForm = false;
  showSessionForm = false;
  editingFormationId: string | null = null;
  editingSessionId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private formationsService: FormationsService,
    private sessionsService: SessionsService,
    private inscriptionsService: InscriptionsService,
    private formateursService: FormateursService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadData();
  }

  initializeForms(): void {
    this.formationForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      chargeHoraire: ['', [Validators.required, Validators.min(1)]],
      programme: ['']
    });

    this.sessionForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      formateurs: [[], Validators.required],
      capaciteMax: [15, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  loadData(): void {
    this.formationsService.getFormations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formations) => {
        this.formations = formations;
      });

    this.sessionsService.getSessions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((sessions) => {
        this.sessions = sessions;
      });

    this.formateursService.getFormateurs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formateurs) => {
        this.formateurs = formateurs;
      });
  }

  // FORMATIONS
  onAddFormation(): void {
    this.showFormationForm = true;
    this.editingFormationId = null;
    this.formationForm.reset();
  }

  onSaveFormation(): void {
    if (this.formationForm.invalid || !this.selectedFormation) {
      return;
    }

    const formation: Formation = {
      id: this.editingFormationId || Math.random().toString(36).substring(7),
      titre: this.formationForm.get('titre')?.value,
      description: this.formationForm.get('description')?.value,
      chargeHoraire: this.formationForm.get('chargeHoraire')?.value,
      programme: this.formationForm.get('programme')?.value,
      sessions: this.selectedFormation.sessions || []
    };

    if (this.editingFormationId) {
      this.formationsService.updateFormation(this.editingFormationId, formation);
    } else {
      this.formationsService.addFormation(formation);
    }

    this.closeFormationForm();
  }

  onEditFormation(formation: Formation): void {
    this.selectedFormation = formation;
    this.editingFormationId = formation.id;
    this.formationForm.patchValue(formation);
    this.showFormationForm = true;
  }

  onDeleteFormation(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation?')) {
      this.formationsService.deleteFormation(id);
      if (this.selectedFormation?.id === id) {
        this.selectedFormation = null;
        this.selectedSession = null;
      }
    }
  }

  closeFormationForm(): void {
    this.showFormationForm = false;
    this.formationForm.reset();
    this.editingFormationId = null;
  }

  selectFormation(formation: Formation): void {
    this.selectedFormation = formation;
  }

  // SESSIONS
  onAddSession(): void {
    if (!this.selectedFormation) {
      alert('Veuillez sélectionner une formation d\'abord');
      return;
    }
    this.showSessionForm = true;
    this.editingSessionId = null;
    this.sessionForm.reset({ capaciteMax: 15 });
  }

  onSaveSession(): void {
    if (this.sessionForm.invalid || !this.selectedFormation) {
      return;
    }

    const session: Session = {
      id: this.editingSessionId || Math.random().toString(36).substring(7),
      formationId: this.selectedFormation.id,
      dateDebut: new Date(this.sessionForm.get('dateDebut')?.value),
      dateFin: new Date(this.sessionForm.get('dateFin')?.value),
      formateurs: this.sessionForm.get('formateurs')?.value || [],
      capaciteMax: this.sessionForm.get('capaciteMax')?.value,
      candidats: (this.sessionsService.getSession(this.editingSessionId || '')?.candidats) || []
    };

    if (this.editingSessionId) {
      this.sessionsService.updateSession(this.editingSessionId, session);
    } else {
      this.sessionsService.addSession(session);
      if (!this.selectedFormation.sessions) {
        this.selectedFormation.sessions = [];
      }
      this.selectedFormation.sessions.push(session.id);
    }

    this.closeSessionForm();
  }

  onEditSession(session: Session): void {
    this.editingSessionId = session.id;
    this.sessionForm.patchValue({
      dateDebut: this.formatDateForInput(session.dateDebut),
      dateFin: this.formatDateForInput(session.dateFin),
      formateurs: session.formateurs,
      capaciteMax: session.capaciteMax
    });
    this.showSessionForm = true;
  }

  onDeleteSession(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette session?')) {
      this.sessionsService.deleteSession(id);
      if (this.selectedSession?.id === id) {
        this.selectedSession = null;
        this.sessionCandidats = [];
      }
    }
  }

  closeSessionForm(): void {
    this.showSessionForm = false;
    this.sessionForm.reset();
    this.editingSessionId = null;
  }

  selectSession(session: Session): void {
    this.selectedSession = session;
    this.loadSessionCandidats(session.id);
  }

  loadSessionCandidats(sessionId: string): void {
    this.sessionCandidats = this.inscriptionsService.getInscriptionsBySession(sessionId);
  }

  deleteCandidat(candidatId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce candidat?')) {
      this.inscriptionsService.deleteInscription(candidatId);
      if (this.selectedSession) {
        this.loadSessionCandidats(this.selectedSession.id);
      }
    }
  }

  getFormationSessions(formationId: string): Session[] {
    return this.sessions.filter(s => s.formationId === formationId);
  }

  getFormateurName(id: string): string {
    const formateur = this.formateurs.find(f => f.id === id);
    return formateur ? `${formateur.prenom} ${formateur.nom}` : '';
  }

  private formatDateForInput(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
