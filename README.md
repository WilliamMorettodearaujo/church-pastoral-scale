Descrição do Projeto

Controle de Escala de Agentes Pastorais

Este projeto é uma API RESTful desenvolvida para gerenciar a escala de agentes pastorais da igreja católica. A API permite criar, atualizar, deletar e visualizar a escala de atividades dos agentes por pastoral e por igreja, facilitando a organização e o planejamento das tarefas pastorais.

Funcionalidades Principais:
- Gerenciamento de Igrejas.
- Gerenciamento de Pastorais por igreja.
- Gerenciamento de Usuarios por Funções (Admin / Agente).
- Gerenciamento de Missas por Igreja.
- Criação de Escalas: Definição e atualização das escalas de atividades.
- Consulta de Escalas: Visualização das escalas por data, agente ou tipo de atividade.
- Notificações: Envio de notificações para agentes sobre suas atividades programadas.
  
Tecnologias Utilizadas:
- Linguagem de Programação: TypeScript
- Framework Backend: Node.js com Express
- Banco de Dados: PostgreSQL
- Autenticação e Autorização: JWT (JSON Web Tokens)
- Documentação da API: Swagger
- Teste: Jest para testes unitários
- Ferramentas de Desenvolvimento: ESLint, Prettier

Como Executar o Projeto Localmente:
- Clone o repositório: git clone git@github.com:WilliamMorettodearaujo/church-pastoral-scale.git

Instale as dependências:
- cd church-pastoral-scale
- npm install
- Configure as variáveis de ambiente conforme o arquivo .env.example.

Inicie a aplicação:
- npm run dev
