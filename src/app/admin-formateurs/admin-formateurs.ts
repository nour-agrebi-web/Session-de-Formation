import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormateursService } from '../services/formateurs.service';
import { Formateur } from '../models/formateur.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-formateurs',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-formateurs.html',
  styleUrl: './admin-formateurs.css',
})
export class AdminFormateursComponent implements OnInit, OnDestroy {
  formateurForm!: FormGroup;
  formateurs: Formateur[] = [];
  submitted = false;
  editingId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private formateursService: FormateursService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadFormateurs();
  }

  initializeForm(): void {
    this.formateurForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', [Validators.required, Validators.minLength(3)]],
      telephone: ['', [Validators.pattern(/^[+]?[0-9]{8,}$/)]]
    });
  }

  loadFormateurs(): void {
    this.formateursService.getFormateurs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formateurs) => {
        this.formateurs = formateurs;
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.formateurForm.invalid) {
      return;
    }

    const formateur: Formateur = {
      id: this.editingId || Math.random().toString(36).substring(7),
      nom: this.formateurForm.get('nom')?.value,
      prenom: this.formateurForm.get('prenom')?.value,
      email: this.formateurForm.get('email')?.value,
      specialite: this.formateurForm.get('specialite')?.value,
      telephone: this.formateurForm.get('telephone')?.value || ''
    };

    if (this.editingId) {
      this.formateursService.updateFormateur(this.editingId, formateur);
      this.editingId = null;
    } else {
      this.formateursService.addFormateur(formateur);
    }

    this.resetForm();
  }

  editFormateur(formateur: Formateur): void {
    this.editingId = formateur.id;
    this.formateurForm.patchValue(formateur);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteFormateur(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur?')) {
      this.formateursService.deleteFormateur(id);
      if (this.editingId === id) {
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.formateurForm.reset();
    this.submitted = false;
    this.editingId = null;
  }

  get nom() {
    return this.formateurForm.get('nom');
  }

  get prenom() {
    return this.formateurForm.get('prenom');
  }

  get email() {
    return this.formateurForm.get('email');
  }

  get specialite() {
    return this.formateurForm.get('specialite');
  }

  get telephone() {
    return this.formateurForm.get('telephone');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
