import { Component } from '@angular/core';

import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { FeaturedProjects } from '../../sections/featured-projects/featured-projects';
import { Hero } from '../../sections/hero/hero';
import { Skills } from '../../sections/skills/skills';
import { InfrastructureDelivery } from '../../sections/infrastructure-delivery/infrastructure-delivery';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    About,
    InfrastructureDelivery,
    FeaturedProjects,
    Skills,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}