import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { Notes } from './pages/notes/notes';

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
    path: 'notes',
    component: Notes,
    title: 'Engineering Notes | Artur Marbach',
  },
  {
    path: '**',
    redirectTo: '',
  },
];