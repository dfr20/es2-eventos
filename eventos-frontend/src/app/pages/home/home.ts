import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, ParticipanteInfo } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  participante: ParticipanteInfo | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadParticipanteInfo();
  }

  loadParticipanteInfo(): void {
    this.authService.getParticipanteInfo().subscribe({
      next: (data) => {
        this.participante = data;
      },
      error: (error) => {
        // Erro ao carregar informações do participante
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
