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
  
  // Dados do formulário
  nomeCompleto = '';
  cpf = '';
  email = '';
  telefone = '';
  dataNascimento = '';
  senha = '';
  confirmarSenha = '';

  constructor(private http: HttpClient) {
    this.carregarParticipantes();
  }

  carregarParticipantes() {
    this.http.get<Participante[]>('http://localhost:3000/participantes')
      .subscribe(data => this.participantes = data);
  }

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

    this.http.post('http://localhost:3000/participantes', novoParticipante)
      .subscribe(() => {
        this.carregarParticipantes();
        this.limparFormulario();
        alert('Cadastro realizado com sucesso!');
      });
  }

  remover(id: number | undefined) {
    if (id && confirm('Deseja realmente remover este participante?')) {
      this.http.delete(`http://localhost:3000/participantes/${id}`)
        .subscribe(() => {
          this.carregarParticipantes();
        });
    }
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