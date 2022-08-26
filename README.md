# Projeto MongoDB Car Shop #

## Descrição ##

Nesse projeto, construi uma aplicação back-end para manejar partidas de futebol. Um usuário precisa executar um login para possuir um token de autenticação e pode acompanhar
o placar de partidas, atualizar os placares, registrar o fim de uma partida e conferir a tabela de classificação dos times.

## Tecnologias e Ferramentas Utilizadas ##

- React
- Node.js
- TypeScript
- MySQL
- Docker

Também tentei implementar alguns conceitos de arquitetura de software, como o modelo MSC, REST e Programação Orientada a Objetos.

## Como Usar ##



É preciso utilizar uma máquina de distribuição Unix e ter o node instalado para executar o comando "npm install". Após isso, com ajuda do Docker, é possível rodar o comando "npm run compose:up" para subir os containers necessários que inicializarão o servidor back-end, configurado para rodar na porta 3001.
Serão inicializados 3 containers, um para o front-end, outro para o back-end e o banco de dados. Para conferir a aplicação em andamento, basta ir até o localhost:3000, onde o React
será executado e você poderá interagir com a aplicação.

## Observações ##

Eu apenas desenvolvi os arquivos localizados no diretório app/backend/src. Tanto o front, quanto os arquivos docker e arquivos de configuração da aplicação foram disponibilizados pela Trybe.
