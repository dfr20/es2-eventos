# 🎉 Sistema de Gestão de Eventos - Frontend# EventosFrontend



> Aplicação web moderna desenvolvida em Angular 20 para gerenciamento de eventos e participantes.This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.



[![Angular](https://img.shields.io/badge/Angular-20.3.0-red?logo=angular)](https://angular.io/)## Development server

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)](https://www.typescriptlang.org/)

[![RxJS](https://img.shields.io/badge/RxJS-7.8.0-purple?logo=reactivex)](https://rxjs.dev/)To start a local development server, run:



---```bash

ng serve

## 📋 Índice```



- [Sobre o Projeto](#-sobre-o-projeto)Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

- [Funcionalidades](#-funcionalidades)

- [Tecnologias](#-tecnologias)## Code scaffolding

- [Arquitetura](#-arquitetura)

- [Pré-requisitos](#-pré-requisitos)Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

- [Instalação](#-instalação)

- [Como Usar](#-como-usar)```bash

- [Estrutura do Projeto](#-estrutura-do-projeto)ng generate component component-name

- [Componentes Principais](#-componentes-principais)```

- [Serviços](#-serviços)

- [Segurança](#-segurança)For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

- [Integração com API](#-integração-com-api)

```bash

---ng generate --help

```

## 🎯 Sobre o Projeto

## Building

Sistema frontend para gerenciamento de eventos desenvolvido como projeto da disciplina de Engenharia de Software 2. A aplicação permite que usuários se cadastrem, façam login e gerenciem suas participações em eventos acadêmicos.

To build the project run:

### 🎨 Características

```bash

- **Interface Moderna**: Design responsivo com gradientes e animações suavesng build

- **Autenticação JWT**: Sistema completo de autenticação com tokens JWT```

- **Validação em Tempo Real**: Feedback imediato para o usuário

- **Auto-completar**: Integração com ViaCEP para preenchimento automático de endereçosThis will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

- **Proteção de Rotas**: Páginas protegidas por Guards do Angular

## Running unit tests

---

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

## ✨ Funcionalidades

```bash

### 🔐 Autenticaçãong test

```

- [x] Login com email e senha

- [x] Cadastro de participantes## Running end-to-end tests

- [x] Recuperação automática de sessão

- [x] Logout seguroFor end-to-end (e2e) testing, run:

- [x] Validação de token JWT

```bash

### 👤 Gestão de Participantesng e2e

```

- [x] Cadastro completo com validações

- [x] Seleção de tipo de participante (Aluno, Professor, Pesquisador)Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

- [x] Busca automática de endereço por CEP

- [x] Visualização de perfil## Additional Resources

- [x] Dashboard personalizado

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### 🌐 Integração Externa

- [x] API ViaCEP para busca de endereços
- [x] Comunicação REST com backend
- [x] Interceptor HTTP para autenticação automática

---

## 🛠 Tecnologias

### Core

- **Angular 20.3.0**: Framework principal
- **TypeScript 5.9.2**: Linguagem de programação
- **RxJS 7.8.0**: Programação reativa

### Módulos Angular

- `@angular/common`: Diretivas e pipes comuns
- `@angular/forms`: Formulários reativos e template-driven
- `@angular/router`: Sistema de roteamento
- `@angular/platform-browser`: Plataforma web

### Ferramentas de Desenvolvimento

- **Angular CLI**: Geração e build
- **Karma & Jasmine**: Testes unitários
- **Prettier**: Formatação de código
- **TypeScript Compiler**: Compilação

---

## 🏗 Arquitetura

### Padrão de Design

O projeto segue a arquitetura **Standalone Components** do Angular 14+, eliminando a necessidade de `NgModules` e tornando os componentes mais modulares e independentes.

### Princípios Aplicados

- **Separation of Concerns**: Componentes, serviços e guards separados
- **Single Responsibility**: Cada classe tem uma única responsabilidade
- **Dependency Injection**: Injeção de dependências do Angular
- **Reactive Programming**: Uso de Observables do RxJS
- **Lazy Loading**: Carregamento sob demanda de rotas

### Fluxo de Autenticação

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Usuario   │────▶│  Component   │────▶│   Service   │
│  (View)     │     │ (Controller) │     │   (Model)   │
└─────────────┘     └──────────────┘     └─────────────┘
                            │                    │
                            ▼                    ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  Template    │     │  Backend    │
                    │    HTML      │     │     API     │
                    └──────────────┘     └─────────────┘
```

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js**: versão 18.x ou superior
- **npm**: versão 9.x ou superior
- **Angular CLI**: versão 20.x

### Verificar Instalação

```bash
node --version  # v18.x.x ou superior
npm --version   # 9.x.x ou superior
ng version      # Angular CLI: 20.x.x
```

### Instalar Angular CLI

```bash
npm install -g @angular/cli@20
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/dfr20/es2-eventos.git
cd es2-eventos/eventos-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

O backend deve estar rodando em `http://localhost:8089`. Se necessário, altere a URL em:

```typescript
// src/app/services/auth.service.ts
private readonly API_URL = 'http://localhost:8089';
```

---

## 💻 Como Usar

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm start
# ou
ng serve
```

Acesse: **http://localhost:4200**

### Build de Produção

```bash
npm run build
```

Os arquivos compilados estarão em `dist/eventos-frontend/`

### Testes

```bash
npm test
```

### Build com Watch

```bash
npm run watch
```

---

## 📁 Estrutura do Projeto

```
eventos-frontend/
├── src/
│   ├── app/
│   │   ├── guards/
│   │   │   └── auth.guard.ts           # Proteção de rotas
│   │   ├── pages/
│   │   │   ├── login/                  # Página de login
│   │   │   │   ├── login.ts
│   │   │   │   ├── login.html
│   │   │   │   ├── login.css
│   │   │   │   └── login.spec.ts
│   │   │   ├── cadastro-participante/  # Página de cadastro
│   │   │   │   ├── cadastro-participante.ts
│   │   │   │   ├── cadastro-participante.html
│   │   │   │   ├── cadastro-participante.css
│   │   │   │   └── cadastro-participante.spec.ts
│   │   │   └── home/                   # Dashboard
│   │   │       ├── home.ts
│   │   │       ├── home.html
│   │   │       ├── home.css
│   │   │       └── home.spec.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts         # Serviço de autenticação
│   │   │   └── auth.interceptor.ts     # Interceptor HTTP
│   │   ├── app.config.ts               # Configuração da aplicação
│   │   ├── app.routes.ts               # Configuração de rotas
│   │   ├── app.ts                      # Componente raiz
│   │   ├── app.html
│   │   └── app.css
│   ├── assets/                         # Imagens e recursos
│   ├── index.html                      # HTML principal
│   ├── main.ts                         # Bootstrap da aplicação
│   └── styles.css                      # Estilos globais
├── public/                             # Arquivos públicos
├── angular.json                        # Configuração do Angular
├── package.json                        # Dependências
├── tsconfig.json                       # Configuração TypeScript
└── README.md                           # Este arquivo
```

---

## 🧩 Componentes Principais

### 1. LoginComponent

**Responsabilidade**: Autenticação de usuários

**Funcionalidades**:
- Formulário reativo com validações
- Recuperação automática de sessão
- Redirecionamento pós-login
- Tratamento de erros HTTP

**Tecnologias**:
```typescript
imports: [ReactiveFormsModule, CommonModule]
```

**Validações**:
- Email obrigatório e válido
- Senha mínima de 6 caracteres
- Feedback visual em tempo real

---

### 2. CadastroParticipanteComponent

**Responsabilidade**: Registro de novos participantes

**Funcionalidades**:
- Formulário template-driven com ngModel
- Integração com ViaCEP
- Auto-preenchimento de endereço
- Seleção de tipo de participante
- Validações client-side

**Integração ViaCEP**:
```typescript
buscarCep(cep: string) {
  this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .subscribe(data => {
      this.endereco.logradouro = data.logradouro;
      this.endereco.bairro = data.bairro;
      // ... preenche automaticamente
    });
}
```

**Trigger Automático**:
- Busca CEP ao digitar o 8º dígito
- Validação de formato
- Feedback de erro

---

### 3. HomeComponent

**Responsabilidade**: Dashboard do usuário autenticado

**Funcionalidades**:
- Exibição de dados do participante
- Botão de logout
- Navegação para outras seções
- Carregamento de informações via API

**Proteção**:
```typescript
// app.routes.ts
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
```

---

## 🔧 Serviços

### AuthService

**Responsabilidade**: Gerenciamento de autenticação e comunicação com API

#### Métodos Principais

```typescript
// Login de usuário
login(email: string, senha: string): Observable<LoginResponse>

// Cadastro de participante
cadastrar(dados: CadastroRequest): Observable<LoginResponse>

// Logout e limpeza de token
logout(): void

// Buscar informações do participante autenticado
getParticipanteInfo(): Observable<ParticipanteInfo>

// Validar token JWT
validateToken(): Observable<boolean>

// Verificar se usuário está autenticado
isAuthenticated(): boolean
```

#### Interfaces

```typescript
interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
}

interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
  tipoParticipante: { id: number; nome: string };
  endereco: {
    CEP: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    estado: string;
  };
  nro_casa: string;
}
```

#### Armazenamento

- **LocalStorage Key**: `auth_token`
- **BehaviorSubject**: Stream reativo do token
- **Observable**: `token$` para observar mudanças

---

## 🔒 Segurança

### 1. Autenticação JWT

**Fluxo Completo**:

```
Login → Backend retorna JWT → Salvo em localStorage → 
Interceptor adiciona em todas requests → Guard protege rotas
```

### 2. HTTP Interceptor

**Local**: `src/app/app.config.ts`

```typescript
provideHttpClient(
  withInterceptors([
    (req, next) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
      return next(req);
    }
  ])
)
```

**Funcionamento**:
- Intercepta **todas** as requisições HTTP
- Adiciona automaticamente header `Authorization`
- Formato: `Bearer <token>`

### 3. Route Guard

**Local**: `src/app/guards/auth.guard.ts`

```typescript
canActivate(): boolean {
  if (this.authService.isAuthenticated()) {
    return true;  // ✅ Permite acesso
  }
  this.router.navigate(['/login']);
  return false;   // ❌ Bloqueia e redireciona
}
```

**Rotas Protegidas**:
- `/home` - Requer autenticação

**Rotas Públicas**:
- `/login` - Acesso livre
- `/cadastro` - Acesso livre

### 4. Validações

#### Client-Side
- Email válido (formato)
- Senha mínima 6 caracteres
- Senhas coincidem
- Campos obrigatórios
- CEP com 8 dígitos

#### Server-Side
- Validações do backend
- Feedback de erro ao usuário
- Tratamento de status HTTP

---

## 🌐 Integração com API

### Endpoints Backend

**Base URL**: `http://localhost:8089`

#### Autenticação

```
POST /auth/login
Body: { email: string, senha: string }
Response: { token: string }
```

```
POST /auth/registro
Body: CadastroRequest
Response: { token: string }
```

#### Participantes

```
GET /participantes/me
Headers: { Authorization: Bearer <token> }
Response: ParticipanteInfo
```

```
PUT /participantes/me
Headers: { Authorization: Bearer <token> }
Body: Partial<ParticipanteInfo>
Response: ParticipanteInfo
```

### API Externa

#### ViaCEP

```
GET https://viacep.com.br/ws/{cep}/json/
Response: {
  logradouro: string,
  bairro: string,
  localidade: string,
  uf: string
}
```

---

## 🎨 Diretivas e Recursos Angular

### Diretivas Estruturais

```html
<!-- Renderização condicional -->
<div *ngIf="errorMessage">{{ errorMessage }}</div>

<!-- Loop -->
<option *ngFor="let tipo of tipoOptions" [value]="tipo.id">
  {{ tipo.nome }}
</option>
```

### Property Binding

```html
[formGroup]="loginForm"
[disabled]="isLoading"
[class.error]="emailInvalid"
```

### Event Binding

```html
(click)="cadastrar()"
(submit)="onSubmit()"
(input)="onCepChange($event.target.value)"
```

### Two-Way Binding

```html
[(ngModel)]="email"
[(ngModel)]="senha"
```

---

## 🔄 Programação Reativa (RxJS)

### Operadores Utilizados

```typescript
// tap - Efeitos colaterais sem modificar stream
.pipe(tap(response => this.saveToken(response.token)))

// map - Transformar dados
.pipe(map(data => data.token))

// catchError - Tratamento de erros
.pipe(catchError(error => of(false)))

// of - Criar Observable de valor
of(false)
```

### BehaviorSubject

```typescript
private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
public token$ = this.tokenSubject.asObservable();
```

---

## 🧪 Testando a Aplicação

### 1. Ver Token no LocalStorage

1. Abra DevTools (F12)
2. Application → Local Storage → http://localhost:4200
3. Procure por: `auth_token`

### 2. Ver Interceptor em Ação

1. DevTools → Network
2. Faça login
3. Veja requisições para `/participantes/me`
4. Headers → Request Headers
5. Veja: `Authorization: Bearer <token>`

### 3. Testar Route Guard

1. Delete `auth_token` do LocalStorage
2. Tente acessar: http://localhost:4200/home
3. Será redirecionado para `/login`

---

## 🚦 Status do Projeto

- ✅ Sistema de autenticação completo
- ✅ Cadastro de participantes
- ✅ Integração com ViaCEP
- ✅ Dashboard básico
- ✅ Proteção de rotas
- ⏳ Gestão de eventos (futuro)
- ⏳ Inscrição em eventos (futuro)
- ⏳ Perfil de usuário editável (futuro)

---

## 👨‍💻 Autor

**Diogo Ribeiro**
- GitHub: [@dfr20](https://github.com/dfr20)
- Projeto: Engenharia de Software 2

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---
