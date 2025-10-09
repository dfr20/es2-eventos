import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService, CadastroRequest } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-participante',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './cadastro-participante.html',
  styleUrls: ['./cadastro-participante.css']
})
export class CadastroParticipanteComponent {
  nomeCompleto = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  telefone = '';
  dataNascimento: string = '';
  endereco: Endereco = {
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    estado: ''
  };
  nro_casa = '';
  tipoParticipante = { id: 1, nome: 'Aluno' };
  tipoOptions = [
    { id: 1, nome: 'Aluno' },
    { id: 2, nome: 'Professor' },
    { id: 3, nome: 'Pesquisador' },
  ];
  isLoading = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  cadastrar() {
    // Validações
    if (!this.nomeCompleto || !this.email || !this.senha) {
      this.errorMessage = 'Por favor, preencha nome, email e senha.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (this.senha.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Email inválido.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Formata a data de nascimento para o formato esperado pela API (dd/MM/yyyy)
    const dataFormatada = this.formatarData(this.dataNascimento);

    // Formata CEP com hífen (ex: 01001-000)
    const cepFormatted = this.endereco.cep ? `${this.endereco.cep.slice(0,5)}-${this.endereco.cep.slice(5)}` : '';

    const tipoSelecionado = this.tipoOptions.find(t => t.id === this.tipoParticipante.id) || this.tipoOptions[0];

    const cadastroData: CadastroRequest = {
      id: 1,
      nome: this.nomeCompleto,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      dataNascimento: dataFormatada,
      tipoParticipante: {
        id: tipoSelecionado.id,
        nome: tipoSelecionado.nome
      },
      endereco: {
        id: 1,
        CEP: cepFormatted,
        logradouro: this.endereco.logradouro,
        bairro: this.endereco.bairro || '',
        localidade: this.endereco.localidade,
        estado: this.endereco.estado
      },
      nro_casa: this.nro_casa
    };

    console.log('Dados sendo enviados para API:', JSON.stringify(cadastroData, null, 2));

    this.authService.cadastrar(cadastroData).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso!');
        alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${this.nomeCompleto}`);
        // Redireciona para home já autenticado (token foi salvo automaticamente)
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro ao cadastrar:', error);
        console.error('Detalhes do erro:', error.error);

        if (error.status === 400) {
          const errorMsg = error.error?.message || error.error?.error || 'Dados inválidos. Verifique as informações.';
          this.errorMessage = `Erro 400: ${errorMsg}`;
          alert(`Erro ao cadastrar:\n${errorMsg}`);
        } else if (error.status === 409) {
          this.errorMessage = 'Email já cadastrado.';
        } else if (error.status === 0) {
          this.errorMessage = 'Não foi possível conectar ao servidor.';
        } else {
          this.errorMessage = error.error?.message || 'Erro ao realizar cadastro. Tente novamente.';
        }
      }
    });
  }

  private formatarData(dataISO: string): string {
    if (!dataISO) return '';
    
    // Converte de YYYY-MM-DD para DD/MM/YYYY
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  buscarCep(cep?: string) {
    const cepToUse = cep ?? this.endereco.cep;
    if (!cepToUse) {
      alert('Informe o CEP para busca');
      return;
    }

    const cleaned = cepToUse.replace(/\D/g, '');
    if (cleaned.length !== 8) {
      alert('CEP inválido. Deve conter 8 dígitos.');
      return;
    }

    const url = `https://viacep.com.br/ws/${cleaned}/json/`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (data.erro) {
          alert('CEP não encontrado');
          return;
        }
        this.endereco.logradouro = data.logradouro || '';
        this.endereco.bairro = data.bairro || '';
        this.endereco.localidade = data.localidade || '';
        this.endereco.estado = data.uf || '';
        this.endereco.cep = cleaned;
      },
      error: (err) => {
        console.error('Erro ao consultar CEP', err);
        alert('Erro ao consultar CEP');
      }
    });
  }

  onCepChange(raw: string) {
    const cleaned = (raw || '').replace(/\D/g, '');
    this.endereco.cep = cleaned;

    if (cleaned.length === 8) {
      this.buscarCep(cleaned);
    }
  }
}

export interface Endereco {
  id?: number;
  logradouro: string;
  bairro?: string;
  localidade: string;
  estado: string;
  cep: string;
}