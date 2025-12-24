import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil';
import { FormationsComponent } from './formations/formations';
import { FormationsDetailComponent } from './formations-detail/formations-detail';
import { InscriptionComponent } from './inscription/inscription';
import { AdminComponent } from './admin/admin';
import { AdminFormateursComponent } from './admin-formateurs/admin-formateurs';
import { AdminFormationsSessionsComponent } from './admin-formations-sessions/admin-formations-sessions';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'formations/:id', component: FormationsDetailComponent },
  { path: 'inscription/:sessionId', component: InscriptionComponent },
  
  // Admin routes
  { path: 'admin-space', component: AdminComponent },
  { path: 'admin-space/formateurs', component: AdminFormateursComponent },
  { path: 'admin-space/formations-sessions', component: AdminFormationsSessionsComponent }
];
