import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, ParticipanteInfo } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <header class="header">
        <h1>Gestão de Eventos</h1>
        <div class="user-info">
          <span *ngIf="participante">Olá, {{ participante.nome }}</span>
          <button (click)="logout()" class="btn-logout">Sair</button>
        </div>
      </header>

      <main class="content">
        <div *ngIf="participante" class="welcome-card">
          <h2>Bem-vindo(a), {{ participante.nome }}!</h2>
          <p>Email: {{ participante.email }}</p>
          <p>Telefone: {{ participante.telefone }}</p>
          <p *ngIf="participante.tipoParticipante">
            Tipo: {{ participante.tipoParticipante.nome }}
          </p>
        </div>

        <div class="actions">
          <button class="action-card" (click)="navigateTo('/eventos')">
            <h3>Eventos</h3>
            <p>Ver e gerenciar eventos</p>
          </button>
          
          <button class="action-card" (click)="navigateTo('/perfil')">
            <h3>Meu Perfil</h3>
            <p>Editar informações pessoais</p>
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #13072e 0%, #2d1b4e 100%);
      color: white;
    }

    .header {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid rgba(167, 139, 250, 0.2);
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .btn-logout {
      padding: 8px 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      color: white;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-logout:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .welcome-card {
      background: linear-gradient(135deg, #3f2182 0%, #2d1b4e 100%);
      padding: 30px;
      border-radius: 20px;
      margin-bottom: 40px;
      border: 1px solid rgba(167, 139, 250, 0.2);
    }

    .welcome-card h2 {
      margin: 0 0 20px 0;
      color: #a78bfa;
    }

    .welcome-card p {
      margin: 8px 0;
      color: #c4b5fd;
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .action-card {
      background: linear-gradient(135deg, #3f2182 0%, #2d1b4e 100%);
      padding: 30px;
      border-radius: 20px;
      border: 1px solid rgba(167, 139, 250, 0.2);
      cursor: pointer;
      transition: all 0.3s;
      text-align: left;
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
      border-color: #a78bfa;
    }

    .action-card h3 {
      margin: 0 0 10px 0;
      color: #a78bfa;
      font-size: 20px;
    }

    .action-card p {
      margin: 0;
      color: #c4b5fd;
    }
  `]
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
        console.error('Erro ao carregar informações do participante:', error);
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