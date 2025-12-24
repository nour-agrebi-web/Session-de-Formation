import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormationsService } from '../services/formations.service';
import { Formation } from '../models/formation.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-formations',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formations.html',
  styleUrl: './formations.css',
})
export class FormationsComponent implements OnInit, OnDestroy {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  searchKeyword: string = '';
  private destroy$ = new Subject<void>();

  constructor(private formationsService: FormationsService) {}

  ngOnInit(): void {
    this.formationsService.getFormations()
      .pipe(takeUntil(this.destroy$))
      .subscribe((formations) => {
        this.formations = formations;
        this.filteredFormations = formations;
      });
  }

  onSearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredFormations = this.formations;
    } else {
      this.filteredFormations = this.formations.filter(f =>
        f.titre.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        f.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
