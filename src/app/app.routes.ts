import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { LegalNotice } from './pages/legal-notice/legal-notice';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Artur Marbach | Linux, Cloud & DevOps',
  },
  {
    path: 'projects/:slug',
    component: ProjectDetail,
  },
  {
    path: 'legal-notice',
    component: LegalNotice,
    title: 'Legal Notice | Artur Marbach',
  },
  {
    path: '**',
    redirectTo: '',
  },
];