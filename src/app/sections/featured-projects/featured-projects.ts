import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Project {
  title: string;
  shortTitle: string;
  slug: string;
  description: string;
  image: string;
  github: string;
  technologies: string[];
  highlights: string[];
}

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss',
})
export class FeaturedProjects {
  @ViewChild('showcaseStart')
  showcaseStart?: ElementRef<HTMLElement>;

  currentIndex = 0;

  projects: Project[] = [
    {
      title: 'Vikunja on AWS ECS Fargate',
      shortTitle: 'Vikunja AWS',
      slug: 'vikunja-aws-fargate',
      github: 'https://github.com/A-Marbach/vikunja-aws-fargate',
      description:
        'Production-style AWS infrastructure for Vikunja using ECS Fargate, RDS PostgreSQL, S3, Secrets Manager and CloudWatch, fully provisioned with Terraform.',
      image: '/assets/vikunja-aws-img.png',
      technologies: [
        'AWS',
        'Terraform',
        'ECS Fargate',
        'RDS',
        'S3',
        'CloudWatch',
      ],
      highlights: [
        'Infrastructure provisioned with Terraform',
        'Persistent data with RDS PostgreSQL and S3',
        'Monitoring, secrets management and recovery testing',
      ],
    },

    {
      title: 'Conduit AWS Infrastructure',
      shortTitle: 'Conduit AWS',
      slug: 'conduit-aws',
      github: 'https://github.com/A-Marbach/conduit-aws',
      description:
        'AWS infrastructure provisioned with Terraform and configured with Ansible, including EC2, networking, Docker deployment, CI/CD and monitoring.',
      image: '/assets/aws-img.png',
      technologies: [
        'AWS',
        'Terraform',
        'Ansible',
        'Docker',
        'GitHub Actions',
      ],
      highlights: [
        'AWS infrastructure provisioned with Terraform',
        'Server configuration and deployment automated with Ansible',
        'Docker deployment with CI/CD and monitoring',
      ],
    },

    {
      title: 'k3s Infrastructure',
      shortTitle: 'k3s Infrastructure',
      slug: 'k3s-infrastructure',
      github: 'https://github.com/A-Marbach/k3s-infrastructure',
      description:
        'Multi-node Kubernetes environment built on cloud servers with Terraform and Ansible, including ingress, TLS, Helm and monitoring.',
      image: '/assets/k3s-img.png',
      technologies: [
        'Kubernetes',
        'k3s',
        'Terraform',
        'Ansible',
        'Helm',
        'Grafana',
      ],
      highlights: [
        'Multi-node k3s cluster provisioned automatically',
        'Ingress and TLS configured with Traefik and cert-manager',
        'Monitoring implemented with Prometheus and Grafana',
      ],
    },

    {
      title: 'BookStore DevSecOps Pipeline',
      shortTitle: 'BookStore Pipeline',
      slug: 'bookstore-devsecops',
      github: 'https://github.com/A-Marbach/bookStoreAPI',
      description:
        'Containerized application with an automated CI/CD pipeline including security scanning, image analysis and monitoring.',
      image: '/assets/bookstore-img.png',
      technologies: [
        'Docker',
        'GitHub Actions',
        'Trivy',
        'Gitleaks',
        'Hadolint',
      ],
      highlights: [
        'Automated CI/CD pipeline with GitHub Actions',
        'Container and source code security scanning',
        'Docker-based deployment with monitoring',
      ],
    },
  ];

  get currentProject(): Project {
    return this.projects[this.currentIndex];
  }

  get hasPreviousProject(): boolean {
    return this.currentIndex > 0;
  }

  get hasNextProject(): boolean {
    return this.currentIndex < this.projects.length - 1;
  }

  selectProject(index: number): void {
    this.currentIndex = index;
  }

  previousProject(): void {
    if (!this.hasPreviousProject) {
      return;
    }

    this.currentIndex--;
    this.scrollToProject();
  }

  nextProject(): void {
    if (!this.hasNextProject) {
      return;
    }

    this.currentIndex++;
    this.scrollToProject();
  }

  private scrollToProject(): void {
    setTimeout(() => {
      this.showcaseStart?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}