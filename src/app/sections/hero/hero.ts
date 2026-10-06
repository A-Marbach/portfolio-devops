import {
  AfterViewInit,
  Component,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

interface FlowStep {
  title: string;
  subtitle: string;
  items: string[];
}

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  activePhase = signal(0);
  activeItem = signal(0);
  finished = signal(false);

  private timers: ReturnType<typeof setTimeout>[] = [];

  flow: FlowStep[] = [
    {
      title: 'Provision',
      subtitle: 'Infrastructure as Code',
      items: [
        'Terraform',
        'AWS',
        'VPC',
        'EC2 / ECS',
        'RDS',
      ],
    },
    {
      title: 'Configure',
      subtitle: 'System Automation',
      items: [
        'Ansible',
        'Linux',
        'SSH',
        'NGINX',
        'Hardening',
      ],
    },
    {
      title: 'Deploy',
      subtitle: 'Containers & CI/CD',
      items: [
        'Docker',
        'GitHub Actions',
        'GHCR',
        'Build Pipeline',
        'Deployment',
      ],
    },
    {
      title: 'Operate',
      subtitle: 'Runtime & Observability',
      items: [
        'Kubernetes',
        'Prometheus',
        'Grafana',
        'CloudWatch',
        'Logs & Metrics',
      ],
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startAnimation();
  }

  private startAnimation(): void {
    const phaseDuration = 2600;
    const itemDelay = 350;

    this.flow.forEach((phase, phaseIndex) => {
      this.timers.push(
        setTimeout(() => {
          this.activePhase.set(phaseIndex + 1);
          this.activeItem.set(0);
        }, 800 + phaseIndex * phaseDuration)
      );

      phase.items.forEach((_, itemIndex) => {
        this.timers.push(
          setTimeout(() => {
            this.activeItem.set(itemIndex + 1);
          }, 1100 + phaseIndex * phaseDuration + itemIndex * itemDelay)
        );
      });
    });

    this.timers.push(
      setTimeout(() => {
        this.finished.set(true);
        this.activePhase.set(this.flow.length + 1);
      }, 800 + this.flow.length * phaseDuration)
    );
  }

  isPhaseDone(index: number): boolean {
    return this.activePhase() > index + 1;
  }

  isPhaseActive(index: number): boolean {
    return this.activePhase() === index + 1;
  }

  isItemVisible(
    phaseIndex: number,
    itemIndex: number
  ): boolean {
    if (this.isPhaseDone(phaseIndex)) {
      return true;
    }

    return (
      this.isPhaseActive(phaseIndex) &&
      this.activeItem() >= itemIndex + 1
    );
  }

  ngOnDestroy(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
  }
}