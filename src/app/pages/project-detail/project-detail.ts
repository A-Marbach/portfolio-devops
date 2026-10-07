import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

interface ProjectDecision {
  title: string;
  text: string;
}

interface ArchitectureMain {
  label: string;
  title: string;
  description?: string;
  active?: boolean;
}

interface ArchitectureService {
  label: string;
  title: string;
}

interface ProjectCaseStudy {
  slug: string;

  type: string;
  title: string;
  intro: string;
  repository: string;

  stack: string[];

  goal: {
    title: string;
    text: string;
  };

  approach: {
    title: string;
    text: string;
  };

  architecture: {
    title: string;
    main: ArchitectureMain[];
    services: ArchitectureService[];
  };

  decisions: ProjectDecision[];

  challenge: {
    title: string;
    problem: string;
    solution: string;
  };

  result: {
    title: string;
    items: string[];
  };
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  project?: ProjectCaseStudy;

 projects: ProjectCaseStudy[] = [
  {
    slug: 'vikunja-aws-fargate',

    type: 'AWS · ECS FARGATE · TERRAFORM',

    title: 'Vikunja on AWS ECS Fargate',

    intro:
      'I deployed Vikunja on AWS ECS Fargate and built the surrounding infrastructure with Terraform, including private networking, persistent data, monitoring, alerting and recovery testing.',

    repository:
      'https://github.com/A-Marbach/vikunja-aws-fargate',

    stack: [
      'AWS',
      'Terraform',
      'ECS Fargate',
      'ALB',
      'RDS',
      'S3',
      'CloudWatch',
      'SNS',
    ],

    goal: {
      title: 'Run Vikunja without tying data to the container.',
      text:
        'I wanted the ECS task to remain replaceable while database data and uploaded files stay persistent and recoverable.',
    },

    approach: {
      title: 'Separate compute, data and operations.',
      text:
        'The application runs on ECS Fargate behind an Application Load Balancer, while RDS and S3 store persistent data and CloudWatch and SNS handle monitoring and alerts.',
    },

    architecture: {
      title:
        'Public traffic enters through the ALB while application and database resources stay private.',

      main: [
        {
          label: 'ENTRY',
          title: 'Application Load Balancer',
          description: 'Public application traffic',
        },
        {
          label: 'COMPUTE',
          title: 'ECS Fargate',
          description: 'Private application tasks',
          active: true,
        },
        {
          label: 'DATABASE',
          title: 'RDS PostgreSQL',
          description: 'Private persistent database',
        },
      ],

      services: [
        {
          label: 'FILES',
          title: 'Amazon S3',
        },
        {
          label: 'SECRETS',
          title: 'Secrets Manager',
        },
        {
          label: 'MONITORING',
          title: 'CloudWatch',
        },
        {
          label: 'ALERTING',
          title: 'Amazon SNS',
        },
      ],
    },

    decisions: [
      {
        title: 'Private application layer',
        text:
          'ECS tasks and RDS run in private subnets. Only the Application Load Balancer accepts public application traffic.',
      },
      {
        title: 'RDS + S3',
        text:
          'Database data and uploaded files live outside the ECS task lifecycle, so replacing a container does not remove application state.',
      },
      {
        title: 'Terraform',
        text:
          'The AWS environment is defined as code, including networking, ECS, RDS, S3, IAM, monitoring and alerting.',
      },
    ],

    challenge: {
      title: 'The task can fail. The data must survive.',
      problem:
        'ECS tasks are disposable and can be stopped or replaced, so important application state cannot depend on the running container.',
      solution:
        'I stored structured data in RDS and attachments in S3, then tested ECS task replacement, S3 persistence and an RDS snapshot restore to verify recovery.',
    },

    result: {
      title: 'Infrastructure with tested persistence and recovery.',
      items: [
        'Private ECS and RDS networking',
        'Persistent data with RDS and S3',
        'CloudWatch alarms and SNS notifications',
        'RDS snapshot restore tested',
        'Automatic ECS task recovery tested',
        'Remote Terraform state with locking',
      ],
    },
  },

  {
    slug: 'conduit-aws',

    type: 'AWS · LINUX · AUTOMATION',

    title: 'Conduit AWS Infrastructure',

    intro:
      'I provisioned an AWS EC2 environment with Terraform, automated the Ubuntu server configuration with Ansible and deployed the containerized application through Docker Compose, NGINX and HTTPS.',

    repository:
      'https://github.com/A-Marbach/conduit-aws',

    stack: [
      'AWS',
      'Terraform',
      'Ansible',
      'Ubuntu',
      'Docker',
      'NGINX',
      'CloudWatch',
      'GitHub Actions',
    ],

    goal: {
      title: 'Automate the server from infrastructure to application.',
      text:
        'Instead of manually creating and configuring an EC2 server, I separated infrastructure provisioning, Linux configuration and application deployment into repeatable automation steps.',
    },

    approach: {
      title: 'Terraform provisions. Ansible configures. Docker runs.',
      text:
        'Terraform creates the AWS infrastructure, Ansible prepares the Ubuntu server, and Docker Compose runs the application behind NGINX with HTTPS.',
    },

    architecture: {
      title:
        'The application delivery process connects CI/CD with an automated AWS server environment.',

      main: [
        {
          label: 'SOURCE',
          title: 'GitHub Actions',
          description: 'Build & security scans',
        },
        {
          label: 'REGISTRY',
          title: 'GHCR',
          description: 'Container images',
        },
        {
          label: 'SERVER',
          title: 'AWS EC2',
          description: 'Ubuntu + Docker Compose',
          active: true,
        },
      ],

      services: [
        {
          label: 'PROVISIONING',
          title: 'Terraform',
        },
        {
          label: 'CONFIGURATION',
          title: 'Ansible',
        },
        {
          label: 'HTTPS',
          title: 'NGINX + Let\'s Encrypt',
        },
        {
          label: 'MONITORING',
          title: 'CloudWatch',
        },
      ],
    },

    decisions: [
      {
        title: 'Terraform + Ansible',
        text:
          'Terraform manages AWS resources while Ansible handles the operating system and server configuration. This keeps infrastructure and configuration responsibilities separate.',
      },
      {
        title: 'Docker Compose',
        text:
          'The application runs as containers on the configured Ubuntu server and can be updated by pulling new images from GHCR.',
      },
      {
        title: 'NGINX + HTTPS',
        text:
          'NGINX exposes the application through a reverse proxy and Let\'s Encrypt provides TLS instead of exposing the containers directly.',
      },
    ],

    challenge: {
      title: 'Creating an EC2 instance was only the beginning.',
      problem:
        'A newly provisioned server still needs Docker, NGINX, TLS, monitoring and the application itself before it is ready to operate.',
      solution:
        'I automated the AWS resources with Terraform and the Ubuntu configuration with Ansible, then connected the server to the application CI/CD workflow and GHCR.',
    },

    result: {
      title: 'A repeatable AWS server and deployment workflow.',
      items: [
        'AWS infrastructure provisioned with Terraform',
        'Ubuntu configured automatically with Ansible',
        'Docker Compose application deployment',
        'NGINX reverse proxy with HTTPS',
        'CloudWatch host monitoring',
        'Gitleaks, Hadolint and Trivy in CI/CD',
      ],
    },
  },

  {
    slug: 'k3s-infrastructure',

    type: 'KUBERNETES · HETZNER · AUTOMATION',

    title: 'k3s Infrastructure',

    intro:
      'I built a three-node k3s cluster on Hetzner Cloud with Terraform and Ansible and added ingress, automatic TLS, monitoring and alerting for running workloads.',

    repository:
      'https://github.com/A-Marbach/k3s-infrastructure',

    stack: [
      'Kubernetes',
      'k3s',
      'Hetzner',
      'Terraform',
      'Ansible',
      'Traefik',
      'Prometheus',
      'Grafana',
    ],

    goal: {
      title: 'Build and operate my own Kubernetes cluster.',
      text:
        'I wanted to automate both the underlying servers and the Kubernetes platform instead of manually creating nodes and configuring cluster services.',
    },

    approach: {
      title: 'Automate infrastructure first, then the cluster.',
      text:
        'Terraform creates the Hetzner servers, Ansible configures Linux and k3s, and Kubernetes resources provide ingress, TLS and monitoring.',
    },

    architecture: {
      title:
        'One control plane and two worker nodes run the Kubernetes workloads and platform services.',

      main: [
        {
          label: 'ENTRY',
          title: 'Traefik',
          description: 'Ingress routing',
        },
        {
          label: 'CONTROL',
          title: 'Control Plane',
          description: 'k3s server',
          active: true,
        },
        {
          label: 'WORKLOADS',
          title: '2 Worker Nodes',
          description: 'Application workloads',
        },
      ],

      services: [
        {
          label: 'TLS',
          title: 'cert-manager',
        },
        {
          label: 'CERTIFICATES',
          title: 'Let\'s Encrypt',
        },
        {
          label: 'METRICS',
          title: 'Prometheus',
        },
        {
          label: 'DASHBOARDS',
          title: 'Grafana',
        },
      ],
    },

    decisions: [
      {
        title: 'Terraform + Ansible',
        text:
          'Terraform provisions the Hetzner servers while Ansible handles Linux configuration and k3s installation across the nodes.',
      },
      {
        title: 'Traefik + cert-manager',
        text:
          'Ingress routing and TLS certificates are handled inside Kubernetes instead of being configured manually on every application.',
      },
      {
        title: 'Prometheus + Grafana',
        text:
          'The monitoring stack provides visibility into nodes, pods, deployments, container resources and workload availability.',
      },
    ],

    challenge: {
      title: 'Running Kubernetes nodes is not enough.',
      problem:
        'A usable cluster also needs networking, TLS, monitoring and visibility into whether workloads are actually healthy.',
      solution:
        'I added Traefik ingress, cert-manager with Let\'s Encrypt, kube-prometheus-stack and Grafana alerting on top of the automated three-node k3s cluster.',
    },

    result: {
      title: 'An automated Kubernetes environment with observability.',
      items: [
        '1 control plane and 2 worker nodes',
        'Hetzner infrastructure provisioned with Terraform',
        'Linux and k3s configured with Ansible',
        'Traefik ingress and automatic TLS',
        'Prometheus and Grafana monitoring',
        'Grafana workload availability alerts',
      ],
    },
  },

  {
    slug: 'bookstore-pipeline',

    type: 'CI/CD · DOCKER · MONITORING',

    title: 'BookStore API Pipeline',

    intro:
      'I containerized an ASP.NET Core API with MongoDB, built an automated GitHub Actions deployment pipeline and added image security scanning, health checks and Prometheus/Grafana monitoring.',

    repository:
      'https://github.com/A-Marbach/bookStoreAPI',

    stack: [
      'ASP.NET Core',
      'MongoDB',
      'Docker',
      'Docker Compose',
      'GitHub Actions',
      'Trivy',
      'Prometheus',
      'Grafana',
    ],

    goal: {
      title: 'Automate application delivery and monitor the running service.',
      text:
        'I wanted code changes to move through build, validation, container creation, security scanning and deployment without manually rebuilding the application on the server.',
    },

    approach: {
      title: 'Build, scan, publish and deploy.',
      text:
        'GitHub Actions builds the .NET application, checks the Dockerfile, publishes the image to GHCR, scans it with Trivy and deploys the updated application to the VM over SSH.',
    },

    architecture: {
      title:
        'The pipeline builds and validates the image before deploying the Docker Compose application.',

      main: [
        {
          label: 'SOURCE',
          title: 'Git Push',
          description: '.NET application',
        },
        {
          label: 'PIPELINE',
          title: 'GitHub Actions',
          description: 'Build · Lint · Scan',
          active: true,
        },
        {
          label: 'DEPLOY',
          title: 'Docker Compose',
          description: 'API + MongoDB',
        },
      ],

      services: [
        {
          label: 'REGISTRY',
          title: 'GHCR',
        },
        {
          label: 'SECURITY',
          title: 'Hadolint + Trivy',
        },
        {
          label: 'METRICS',
          title: 'Prometheus',
        },
        {
          label: 'DASHBOARDS',
          title: 'Grafana',
        },
      ],
    },

    decisions: [
      {
        title: 'Persistent MongoDB volume',
        text:
          'MongoDB data is stored in a Docker volume so container restarts and recreation do not automatically remove the database.',
      },
      {
        title: 'Security in the pipeline',
        text:
          'Hadolint checks the Dockerfile and Trivy scans the built image for high and critical vulnerabilities before deployment.',
      },
      {
        title: 'Health + metrics',
        text:
          'The API exposes a health endpoint and Prometheus metrics, while MongoDB has its own connectivity health check.',
      },
    ],

    challenge: {
      title: 'A successful build does not mean the application is healthy.',
      problem:
        'The application could build and deploy successfully while the container, database connection or runtime behavior still has problems.',
      solution:
        'I added API and MongoDB health checks together with Prometheus metrics, Grafana dashboards and container troubleshooting through Docker logs and health status.',
    },

    result: {
      title: 'An automated and observable container deployment.',
      items: [
        'ASP.NET Core API and MongoDB with Docker Compose',
        'Persistent MongoDB volume',
        'GitHub Actions build and deployment pipeline',
        'Hadolint Dockerfile validation',
        'Trivy container image scanning',
        'Prometheus, Grafana and health checks',
      ],
    },
  },
];

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.project = this.projects.find(
      (project) => project.slug === slug
    );
  }
}