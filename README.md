# Amazon Scraper

Este projeto é uma aplicação que permite realizar o scraping de produtos na Amazon com base em palavras-chave fornecidas pelo usuário. O backend é desenvolvido usando **Bun** com **Express**, **Axios** e **JSDOM** para criar a API de scraping, enquanto o frontend é desenvolvido com **HTML**, **CSS** e **Vanilla JavaScript** com **Vite**.

## Funcionalidade

- O usuário digita uma palavra-chave (ex: "mouse", "keyboard") no campo de pesquisa.
- Ao clicar no botão "Scrape", o frontend faz uma requisição para o backend, que realiza um scraping na primeira página de resultados da Amazon.
- O backend retorna os seguintes dados de cada listagem de produto:
    - Título do Produto
    - Avaliação (em estrelas de 1 a 5)
    - Número de avaliações
    - URL da imagem do produto
- O frontend exibe os produtos retornados de forma organizada e estilizada para uma interface simples e fácil de usar..

## Arquitetura

- **Backend**:
  - Utiliza **Bun** com **Express.js** para criar a API.
  - Realiza o scraping da Amazon usando **Axios** para fazer a requisição HTTP e **JSDOM** para extrair os dados do HTML.

- **Frontend**:
  - Página HTML com um campo de pesquisa e um botão.
  - Ao clicar no botão, o JavaScript faz a requisição para a API e exibe os resultados de forma dinâmica.
  - Estilizado com **CSS** para uma interface simples e clara.

## Tecnologias

- **Backend**:
  - Bun
  - Express.js
  - Axios
  - JSDOM

- **Frontend**:
  - HTML
  - CSS
  - Vanilla JavaScript (usando Vite)

## Como Executar

### 1. Instalar as Dependências

No diretório do projeto, instale as dependências do backend e do frontend.

```bash
# Para instalar as dependências do backend
cd backend
bun install

# Para instalar as dependências do frontend
cd frontend
bun install
```

### 2. Configuração do backend

O backend está configurado para rodar na porta `3000`. Para executar o servidor backend, siga as instruções abaixo:

1. Navegue até o diretório `backend`.
2. Execute o servidor:

```bash
cd backend
bun run server
```

Isso irá iniciar o servidor Bun com Express na porta 3000. A API estará disponível em `http://localhost:3000/api/scrape`.

### 3. Configuração do frontend

O frontend está na pasta `frontend`. Para iniciar o servidor de desenvolvimento e visualizar a aplicação:

1. Navegue até o diretório `frontend`.
2. Execute o servidor:

```bash
cd frontend
bun run dev
```

Isso irá iniciar um servidor de desenvolvimento que geralmente fica disponível em `http://localhost:5173` (caso esteja utilizando o Vite).

### 4. Teste da Aplicação

1. Acesse o frontend pelo navegador em `http://localhost:5173`.
2. Digite um termo de pesquisa, como "mouse", no campo de pesquisa.
3. Clique no botão "Scrape" para obter os produtos relacionados.
4. O resultado será exibido abaixo com o título, imagem, avaliações e número de reviews de cada produto.

## Estrutura de Arquivos

- **backend/**: Contém o servidor Express e a lógica de scraping.
  - `server.ts`: Configuração do Express e rota de scraping.
  - `scraper.ts`: Função que realiza o scraping da Amazon.

- **frontend/**: Contém o código do frontend da aplicação.
  - `index.html`: Página HTML com a interface de pesquisa.
  - `style.css`: Estilos básicos para a interface.
  - `main.js`: Código JavaScript que faz a requisição ao backend e exibe os resultados.

