<div align="center">

# OrangeHRM — Automação de Testes com Cypress

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)

> Projeto de automação de testes end-to-end (E2E) para o sistema de gestão de RH [OrangeHRM](https://opensource-demo.orangehrmlive.com), utilizando Cypress com arquitetura Page Object Model (POM).

</div>

---

## Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Casos de Teste](#-casos-de-teste)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Boas Práticas Adotadas](#-boas-práticas-adotadas)/

---

## Sobre o Projeto

Este projeto tem como objetivo validar as funcionalidades principais do **OrangeHRM**, um sistema open source de Recursos Humanos amplamente utilizado para fins de prática em Quality Assurance.

A automação cobre fluxos críticos da aplicação, garantindo que as funcionalidades de **autenticação**, **gerenciamento de usuários** e **navegação** estejam funcionando conforme esperado.

**Sistema sob teste:** [https://opensource-demo.orangehrmlive.com](https://opensource-demo.orangehrmlive.com)

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^13.x | Framework de testes E2E |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | ES6+ | Linguagem de desenvolvimento |
| [Node.js](https://nodejs.org/) | ^18.x | Ambiente de execução |

---

## Arquitetura do Projeto

O projeto foi estruturado seguindo dois padrões fundamentais de QA:

### Page Object Model (POM)
Cada página da aplicação possui uma classe dedicada que encapsula os seletores e ações relacionadas a ela. Isso garante:

- **Reusabilidade** — elementos e ações são escritos uma única vez
- **Manutenibilidade** — alterações na UI exigem mudanças em apenas um lugar
- **Legibilidade** — os testes ficam focados na lógica, não nos seletores

### Fixtures
Dados de teste (credenciais, inputs de formulário) são isolados em arquivos `.json` dentro da pasta `fixtures`, separando os dados da lógica de automação.

---

## Casos de Teste

### Login / Autenticação
- Login com credenciais válidas
- Login com credenciais inválidas (usuário ou senha incorretos)
- Validação de mensagem de erro ao deixar campos em branco

### Gerenciamento de Usuários
- Cadastro de novo usuário com dados válidos
- Validação de campos obrigatórios no formulário de cadastro

### Navegação
- Verificação dos itens do menu lateral
- Redirecionamento correto entre módulos do sistema

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/LeonardoAlves04/orange-hrm-cypress

# Acesse a pasta do projeto
cd orange-hrm-cypress

# Instale as dependências
npm install
```

---

## Como Executar

### Abrir o Cypress Test Runner (modo interativo)
```bash
npx cypress open
```

### Executar todos os testes em modo headless (terminal)
```bash
npx cypress run
```

### Executar um arquivo de teste específico
```bash
npx cypress run --spec "cypress/e2e/user.spec.cy.js"
```

---

## Estrutura de Pastas

```
📦 cypress-orangehrm
├── 📂 cypress
│   ├── 📂 e2e
│   │   └── 📄 user.spec.cy.js       # Arquivo principal de testes
│   ├── 📂 fixtures
│   │   └── 📄 user.json             # Dados de teste (massa de dados)
│   ├── 📂 pages
│   │   ├── 📄 LoginPage.js          # Page Object da página de login
│   │   └── 📄 UserPage.js           # Page Object do módulo de usuários
│   └── 📂 support
│       ├── 📄 commands.js           # Comandos customizados do Cypress
│       └── 📄 e2e.js                # Configurações globais de teste
├── 📄 cypress.config.js             # Configuração principal do Cypress
├── 📄 package.json
└── 📄 README.md
```

---

##  Boas Práticas Adotadas

-  **Page Object Model** para separação de responsabilidades
-  **Fixtures** para gerenciamento de massa de dados
-  **Nomenclatura descritiva** nos testes (`describe` / `it` legíveis)
-  **Isolamento de testes** — cada `it` é independente
-  **Constantes para seletores** evitando strings duplicadas

---

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leonardoalvesalmeida/)
