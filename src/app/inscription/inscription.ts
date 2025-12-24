import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InscriptionsService } from '../services/inscriptions.service';
import { SessionsService } from '../services/sessions.service';
import { FormationsService } from '../services/formations.service';
import { Session } from '../models/session.model';
import { Formation } from '../models/formation.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inscription',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class InscriptionComponent implements OnInit, OnDestroy {
  inscriptionForm!: FormGroup;
  session: Session | undefined;
  formation: Formation | undefined;
  submitted = false;
  isSessionFull = false;
  inscriptionSuccess = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private inscriptionsService: InscriptionsService,
    private sessionsService: SessionsService,
    private formationsService: FormationsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const sessionId = params['sessionId'];
      this.session = this.sessionsService.getSession(sessionId);

      if (this.session) {
        this.isSessionFull = this.sessionsService.isSessionPlein(sessionId);
        this.formation = this.formationsService.getFormation(this.session.formationId);
      }
    });
  }

  initializeForm(): void {
    this.inscriptionForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get nom() {
    return this.inscriptionForm.get('nom');
  }

  get prenom() {
    return this.inscriptionForm.get('prenom');
  }

  get email() {
    return this.inscriptionForm.get('email');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.inscriptionForm.invalid || !this.session) {
      return;
    }

    if (this.isSessionFull) {
      alert('Cette session est complète. Impossible de s\'inscrire.');
      return;
    }

    const inscription = {
      id: '',
      sessionId: this.session.id,
      nom: this.nom?.value,
      prenom: this.prenom?.value,
      email: this.email?.value,
      dateInscription: new Date()
    };

    const success = this.inscriptionsService.addInscription(inscription);

    if (success) {
      this.inscriptionSuccess = true;
      this.inscriptionForm.reset();
      this.submitted = false;

      setTimeout(() => {
        this.router.navigate(['/formations', this.session?.formationId]);
      }, 2000);
    } else {
      alert('La session est complète. Impossible de s\'inscrire.');
    }
  }

  retourFormation(): void {
    if (this.session) {
      this.router.navigate(['/formations', this.session.formationId]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
