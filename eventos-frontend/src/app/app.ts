import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Participante {
  id?: number;
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  participantes: Participante[] = [];

  nomeCompleto = '';
  cpf = '';
  email = '';
  telefone = '';
  dataNascimento = '';
  senha = '';
  confirmarSenha = '';

  constructor(private http: HttpClient) {}

  cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!this.nomeCompleto || !this.cpf || !this.email || !this.telefone || !this.dataNascimento || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoParticipante: Participante = {
      nomeCompleto: this.nomeCompleto,
      cpf: this.cpf,
      email: this.email,
      telefone: this.telefone,
      dataNascimento: this.dataNascimento,
      senha: this.senha
    };

    // 🔹 Envia para seu servidor Node.js
    this.http.post('http://localhost:3000/participantes', novoParticipante)
      .subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.limparFormulario();
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao cadastrar participante.');
        }
      });
  }

  limparFormulario() {
    this.nomeCompleto = '';
    this.cpf = '';
    this.email = '';
    this.telefone = '';
    this.dataNascimento = '';
    this.senha = '';
    this.confirmarSenha = '';
  }
}
