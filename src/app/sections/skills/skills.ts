import { Component, ElementRef, ViewChild } from '@angular/core';

interface Skill {
  img: string;
  title: string;
  category: string;
  description: string[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  @ViewChild('mobileRow')
  mobileRow?: ElementRef<HTMLDivElement>;

  activePage = 0;

  skills: Skill[] = [
    {
      img: '/assets/linux.png',
      title: 'Linux',
      category: 'Systems',
      description: [
        'Ubuntu server administration',
        'SSH, systemd & troubleshooting',
        'Users, permissions & server hardening',
      ],
    },
    {
      img: '/assets/terraform.svg',
      title: 'Terraform',
      category: 'Infrastructure as Code',
      description: [
        'AWS & Hetzner infrastructure',
        'Cloud resource provisioning',
        'Reproducible environments & state',
      ],
    },
    {
      img: '/assets/ansible.svg',
      title: 'Ansible',
      category: 'Automation',
      description: [
        'Server configuration automation',
        'SSH, NGINX & package setup',
        'Playbooks for repeatable deployments',
      ],
    },
    {
      img: '/assets/aws.svg',
      title: 'AWS',
      category: 'Cloud',
      description: [
        'EC2, ECS Fargate & RDS',
        'S3, Secrets Manager & networking',
        'CloudWatch, persistence & recovery',
      ],
    },
    {
      img: '/assets/docker.svg',
      title: 'Docker',
      category: 'Containers',
      description: [
        'Containerized applications',
        'Docker Compose environments',
        'Images, volumes & deployment workflows',
      ],
    },
    {
      img: '/assets/cicd.svg',
      title: 'GitHub Actions',
      category: 'CI/CD',
      description: [
        'Automated CI/CD pipelines',
        'Container workflows with GHCR',
        'Security scanning in pipelines',
      ],
    },
    {
      img: '/assets/kubernetes.svg',
      title: 'Kubernetes',
      category: 'Orchestration',
      description: [
        'Multi-node k3s cluster',
        'Helm, Traefik & cert-manager',
        'Ingress, TLS & workload deployment',
      ],
    },
    {
      img: '/assets/grafana.svg',
      title: 'Monitoring',
      category: 'Observability',
      description: [
        'Prometheus metrics collection',
        'Grafana dashboards',
        'CloudWatch logs & monitoring',
      ],
    },
    {
      img: '/assets/python.svg',
      title: 'Bash / Python',
      category: 'Scripting',
      description: [
        'Shell scripting',
        'Python fundamentals',
        'Automation & utility scripts',
      ],
    },
  ];

  get skillPages(): Skill[][] {
    const pages: Skill[][] = [];

    for (let i = 0; i < this.skills.length; i += 3) {
      pages.push(this.skills.slice(i, i + 3));
    }

    return pages;
  }

  onMobileScroll(event: Event): void {
    const element = event.target as HTMLElement;

    if (!element.clientWidth) {
      return;
    }

    this.activePage = Math.round(
      element.scrollLeft / element.clientWidth
    );
  }

  scrollToPage(index: number): void {
    const row = this.mobileRow?.nativeElement;

    if (!row) {
      return;
    }

    row.scrollTo({
      left: row.clientWidth * index,
      behavior: 'smooth',
    });

    this.activePage = index;
  }
}