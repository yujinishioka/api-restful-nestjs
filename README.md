# API RESTful NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

> Este projeto implementa uma API RESTful com NestJS e segue todos os requisitos propostos no desafio técnico. Abaixo, está o checklist completo de conformidade com os critérios obrigatórios e diferenciais.

## Endpoints

- `POST /transactions`: Cadastra uma transação.
- `DELETE /transactions`: Remove todas as transações.
- `GET /statistics`: Retorna estatísticas dos últimos 60 segundos.
- `GET /health`: Endpoint de verificação.

## Rotas da aplicação

Nome | Rota
-- | --
API | http://localhost:3000
Swagger | http://localhost:3000/api

## Projeto com Docker

```bash
docker compose up --build
```

## Projeto sem Docker

### Dependências do projeto

```bash
$ yarn install
```

### Rodando o projeto

```bash
# desenvolvedor
$ yarn run start

# modo watch
$ yarn run start:dev

# modo produção
$ yarn run start:prod
```

### Rodando testes

```bash
# testes unitários
$ yarn run test

# testes e2e
$ yarn run test:e2e

# teste de cobertura
$ yarn run test:cov
```

## ✅ Checklist do Desafio

### 📁 Estrutura do Projeto

- [x] Utilizar **NestJS com TypeScript**
- [ ] Seguir a **Clean Architecture**
  - [ ] Controllers
  - [ ] Use Cases
  - [ ] Entities
  - [ ] Repositories
  - [ ] Interfaces
- [ ] Usar **Inversão de Dependência (DI)**
- [ ] Criar interfaces e DTOs para tipagem e validação
- [ ] Aplicar princípios **SOLID**
- [ ] Utilizar boas práticas de **Clean Code**

---

### 🔧 Requisitos Técnicos

- [x] Repositório público no GitHub ou GitLab
- [x] Mínimo 1 commit por endpoint (mínimo de 3 commits)
- [x] Utilizar **yarn** ou **pnpm**
- [ ] Dados armazenados em **memória** (sem banco de dados)
- [ ] API aceita e responde apenas com **JSON**
- [ ] Endpoints RESTful
- [ ] Tratamento de erros adequado com status HTTP corretos
- [ ] Testes unitários e de integração com **Jest**
- [ ] Projeto containerizável com **Docker**
- [x] Documentação da API com **Swagger**
- [ ] Logs estruturados com **Winston** ou **Pino**

---

### 🔌 Endpoints da API

#### 🔹 POST /transactions
- [ ] Receber `amount` (≥ 0)
- [ ] Receber `timestamp` (formato ISO 8601, UTC)
- [ ] Regras de negócio:
  - [ ] Transação **não pode estar no futuro**
  - [ ] Timestamp deve ser no presente ou passado
  - [ ] `amount` **não pode ser negativo**
- [ ] Respostas:
  - [ ] `201 Created`
  - [ ] `422 Unprocessable Entity`
  - [ ] `400 Bad Request`

#### 🔹 DELETE /transactions
- [ ] Remove todas as transações
- [ ] Retorna `200 OK`

#### 🔹 GET /statistics
- [ ] Considera apenas transações dos **últimos 60 segundos**
- [ ] Campos obrigatórios:
  - [ ] `count`
  - [ ] `sum`
  - [ ] `avg`
  - [ ] `min`
  - [ ] `max`
- [ ] Retorna `0` para todos os campos se não houver transações
- [ ] Resposta `200 OK`

#### 🔹 GET /health
- [ ] Endpoint de verificação de saúde da API

---

### 🧪 Testes Automatizados

- [ ] Testes **unitários** com Jest
- [ ] Testes **de integração** da API
- [ ] Uso de **mocks e stubs** para isolar dependências

---

### 🔐 Segurança

- [ ] Validação rigorosa com DTOs
- [ ] **Rate Limiting** configurado
- [ ] **Helmet.js** para proteção de headers

---

### 📜 Logs e Variáveis de Ambiente

- [ ] **Logs estruturados** com Winston ou Pino
- [ ] Uso de **dotenv** para variáveis de ambiente

---

### 📘 Documentação

- [x] Documentação automática da API com **Swagger**
- [ ] README com:
  - [x] Instruções de instalação
  - [ ] Execução com e sem Docker
  - [x] Como rodar os testes

---

### 🐳 Docker e Containerização

- [ ] `Dockerfile` funcional
- [ ] `docker-compose.yml` configurado

---

### 🌟 Diferenciais (opcionais)

- [ ] CI/CD com GitHub Actions ou GitLab CI
- [ ] Métricas com Prometheus e Grafana
- [ ] Atualizações em tempo real com WebSockets

---

### 📬 Entrega

- [ ] Código limpo, testado e organizado
- [ ] Repositório público com link de acesso
- [x] Documentação clara para execução e testes

---