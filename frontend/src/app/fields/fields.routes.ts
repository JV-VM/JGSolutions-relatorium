import { Routes } from '@angular/router';
import { FieldList } from './pages/field-list/field-list';
import { FieldForms } from './components/field-forms/field-forms';

export const FIELDS_ROUTES: Routes = [
  { path: '', component: FieldList },
  { path: 'new', component: FieldForms },
  { path: 'edit/:id', component: FieldForms }, // ✅ rota de edição
];
