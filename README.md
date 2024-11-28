# Projeto NestJS com GitHub Actions para Testes

Este projeto NestJS está configurado com GitHub Actions para rodar testes automatizados sempre que houver mudanças no repositório. Abaixo, explicamos como funciona a configuração do workflow no GitHub Actions e como você pode usá-lo.

## Tecnologias

- **NestJS**: Framework para construir aplicações backend com Node.js.
- **Jest**: Framework de testes para JavaScript, utilizado por padrão no NestJS.
- **GitHub Actions**: Plataforma de automação para CI/CD, permitindo a execução de tarefas como testes e builds automaticamente.

## Como Funciona o Workflow no GitHub Actions

O GitHub Actions permite automatizar a execução de tarefas, como rodar testes, sempre que algo acontece no repositório (como um `push` ou `pull_request`). O arquivo de configuração do workflow é escrito em YAML, e vamos detalhar os componentes dessa configuração abaixo.

### Exemplo de Arquivo de Workflow: `.github/workflows/test.yml`

```yaml
# Definindo o nome do workflow
name: Continuos Integration

# O workflow será acionado sempre que houver um pull request
on: pull_request

# Definindo os jobs que serão executados dentro deste workflow
jobs:
  continuous-integration:
    # Definindo que a execução será em um runner do Ubuntu
    runs-on: ubuntu-latest

    # Definindo os passos (steps) que serão executados dentro deste job
    steps:
    # Passo 1: Fazendo o checkout do código do repositório
    - uses: actions/checkout@v3
      # O GitHub Actions faz o download do código-fonte para o runner

    # Passo 2: Instalando o Node.js
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '22.x'
      
    # Passo 3: Instalando as dependências, construindo o projeto e rodando os testes
    - name: Install dependencies, Build and Test
      run: |
        npm install
        npm install -g @nestjs/cli
        nest build
        npm run test
