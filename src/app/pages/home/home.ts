import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedProjects } from '../../sections/featured-projects/featured-projects';

@Component({
  imports: [RouterLink, FeaturedProjects],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
