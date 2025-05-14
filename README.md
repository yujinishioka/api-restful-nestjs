# API RESTful NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

> Este projeto implementa uma API RESTful com NestJS e segue todos os requisitos propostos no desafio técnico. Abaixo, está o checklist completo de conformidade com os critérios obrigatórios e diferenciais.

## Endpoints

- `POST /transactions`: Cadastra uma transação.
- `DELETE /transactions`: Remove todas as transações.
- `GET /transactions/statistics`: Retorna estatísticas dos últimos 60 segundos.
- `GET /health`: Endpoint de verificação.
- `GET /metrics`: Endpoint de métricas realizado pelo Prometheus.

## Rotas da aplicação

Nome | Rota
-- | --
API | http://localhost:3000
Swagger | http://localhost:3000/api
Statistics | http://localhost:3000/transactions/statistics
Health | http://localhost:3000/health
Metrics (Prometheus) | http://localhost:3000/metrics

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
$ yarn start

# modo watch
$ yarn start:dev

# modo produção
$ yarn start:prod
```

### Rodando testes

```bash
# testes unitários
$ yarn test

# testes e2e
$ yarn test:e2e

# teste de cobertura
$ yarn test:cov
```

## ✅ Checklist do Desafio

### 📁 Estrutura do Projeto

- [x] Utilizar **NestJS com TypeScript**
- [x] Seguir a **Clean Architecture**
  - [x] Controllers
  - [x] Use Cases
  - [x] Entities
  - [x] Repositories
  - [x] Interfaces
- [x] Usar **Inversão de Dependência (DI)**
- [x] Criar interfaces e DTOs para tipagem e validação
- [x] Aplicar princípios **SOLID**
- [x] Utilizar boas práticas de **Clean Code**

---

### 🔧 Requisitos Técnicos

- [x] Repositório público no GitHub ou GitLab
- [x] Mínimo 1 commit por endpoint (mínimo de 3 commits)
- [x] Utilizar **yarn** ou **pnpm**
- [x] Dados armazenados em **memória** (sem banco de dados)
- [x] API aceita e responde apenas com **JSON**
- [x] Endpoints RESTful
- [x] Tratamento de erros adequado com status HTTP corretos
- [x] Testes unitários e de integração com **Jest**
- [ ] Projeto containerizável com **Docker**
- [x] Documentação da API com **Swagger**
- [x] Logs estruturados com **Winston** ou **Pino**

---

### 🔌 Endpoints da API

#### 🔹 POST /transactions
- [x] Receber `amount` (≥ 0)
- [x] Receber `timestamp` (formato ISO 8601, UTC)
- [x] Regras de negócio:
  - [x] Transação **não pode estar no futuro**
  - [x] Timestamp deve ser no presente ou passado
  - [x] `amount` **não pode ser negativo**
- [x] Respostas:
  - [x] `201 Created`
  - [x] `422 Unprocessable Entity`
  - [x] `400 Bad Request`

#### 🔹 DELETE /transactions
- [x] Remove todas as transações
- [x] Retorna `200 OK`

#### 🔹 GET /statistics
- [x] Considera apenas transações dos **últimos 60 segundos**
- [x] Campos obrigatórios:
  - [x] `count`
  - [x] `sum`
  - [x] `avg`
  - [x] `min`
  - [x] `max`
- [x] Retorna `0` para todos os campos se não houver transações
- [x] Resposta `200 OK`

#### 🔹 GET /health
- [x] Endpoint de verificação de saúde da API

---

### 🧪 Testes Automatizados

- [x] Testes **unitários** com Jest
- [x] Testes **de integração** da API
- [x] Uso de **mocks e stubs** para isolar dependências

---

### 🔐 Segurança

- [x] Validação rigorosa com DTOs
- [x] **Rate Limiting** configurado
- [x] **Helmet.js** para proteção de headers

---

### 📜 Logs e Variáveis de Ambiente

- [x] **Logs estruturados** com Winston ou Pino
- [x] Uso de **dotenv** para variáveis de ambiente

---

### 📘 Documentação

- [x] Documentação automática da API com **Swagger**
- [x] README com:
  - [x] Instruções de instalação
  - [x] Execução com e sem Docker
  - [x] Como rodar os testes

---

### 🐳 Docker e Containerização

- [ ] `Dockerfile` funcional
- [ ] `docker-compose.yml` configurado

---

### 🌟 Diferenciais (opcionais)

- [x] CI/CD com GitHub Actions ou GitLab CI
- [x] Métricas com Prometheus e Grafana
- [x] Atualizações em tempo real com WebSockets

---

### 📬 Entrega

- [x] Código limpo, testado e organizado
- [x] Repositório público com link de acesso
- [x] Documentação clara para execução e testes

---