import { Component } from '@angular/core';

import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { FeaturedProjects } from '../../sections/featured-projects/featured-projects';
import { Hero } from '../../sections/hero/hero';
import { Skills } from '../../sections/skills/skills';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    About,
    FeaturedProjects,
    Skills,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}