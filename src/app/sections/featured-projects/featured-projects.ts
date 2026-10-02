import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Project {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  image?: string;
}

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss',
})
export class FeaturedProjects {
  projects: Project[] = [
    {
      number: '01',
      title: 'Vikunja on AWS ECS Fargate',
      description:
        'Containerized application infrastructure on AWS with ECS Fargate, RDS PostgreSQL, S3, monitoring and tested recovery scenarios.',
      technologies: ['AWS', 'Terraform', 'ECS', 'RDS', 'S3'],
      slug: 'vikunja-aws-fargate',
    },
    {
      number: '02',
      title: 'Conduit AWS Infrastructure',
      description:
        'AWS infrastructure provisioned with Terraform and configured with Ansible, including Docker deployment and monitoring.',
      technologies: ['AWS', 'Terraform', 'Ansible', 'Docker'],
      slug: 'conduit-aws',
    },
    {
      number: '03',
      title: 'k3s Infrastructure',
      description:
        'Multi-node Kubernetes environment automated with Terraform and Ansible, using Traefik, cert-manager and Helm.',
      technologies: ['Kubernetes', 'Terraform', 'Ansible', 'Helm'],
      slug: 'k3s-infrastructure',
    },
    {
      number: '04',
      title: 'BookStore DevSecOps Pipeline',
      description:
        'Containerized application with automated CI/CD, security scanning and monitoring using GitHub Actions.',
      technologies: ['Docker', 'CI/CD', 'Trivy', 'Gitleaks'],
      slug: 'bookstore-devsecops',
    },
  ];
}