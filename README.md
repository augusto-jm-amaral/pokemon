<h1 align="center">Pokemon API <img src="http://www.iconninja.com/files/827/589/160/pikachu-icon.png"></h1>
<p align="center">
	<a href="https://travis-ci.org/augusto-jm-amaral/pokemon" target="_blank">
		<img src="https://travis-ci.org/augusto-jm-amaral/pokemon.svg?branch=master">
	</a>
	<a href="https://github.com/augusto-jm-amaral/pokemon/blob/master/LICENSE" target="_blank">
		<img src="https://img.shields.io/github/license/mashape/apistatus.svg">
	</a>
</p>

<p align="center">
	Teste para vaga de desenvolvedor back-end na <strong>Pagar.me</strong>
</p>

## Conteúdo

- [Objetivo](#objetivo)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Instalação](#instalação)

## Objetivo

Olhar para um projeto bem simples, que está com o código completamente abandonado. A idéia é você entender o que este código faz para então consertar e refatorar o que achar necessário. Desde que o código atenda a funcionalidade inicial (que é extremamente básica), sinta-se livre para adicionar ou remover o que quiser dele. Note que este código contém desde pequenos erros até questões extremamente importantes que estão faltando. O objetivo final é entregar um projeto completo, seguro, pronto para produção e de fácil manutenção. 

Não fique preso a apenas refatorar o código, altere o que achar necessário para deixar o projeto em um estado pronto para produção de verdade, então escolha querer evoluir o quanto quiser, mas cuidado apenas com over engineering. Você pode hospedar o resultado final no Github. O time escolheu não hospedar o source lá para não ter risco de PR de outros candidatos influenciarem no seu resultado.

## Estrutura do projeto

Organização de diretórios do projeto.

```bash
pokemon/
├── src/             # Código da aplicação
│   ├── config       # Configurações da aplicação
│   ├── controllers  # Controllers da aplicação
│   ├── libs         # Itens axiliares
│   ├── middlewares  # Middlewares da aplicação
│   ├── models       # Modelos da aplicação
│   ├── routes       # Rotas do express
|   ├── validations  # Middlewares de validação
│   └── app.js       # Instância de Express
│
├── test/            # Testes
│   ├── integration/ # Testes de Integração
│   └── unit/        # Testes de unidade
│
└── server.js        # Instância do Servidor
```

## Instalação

Instalação do Node.js é necessaria, a versão pode ser 7.6.0 ou superior, apartir desta versão o Node.js da suporte á <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">async functions</a> e ao operador <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await">await</a>, que foram utilizados no projeto.

<a href="https://nodejs.org/en/download/">Instalação Node.js</a>

Após a instalação do Node.js clone o projeto e instale as depêndencias:

```bash

git clone https://github.com/augusto-jm-amaral/pokemon.git
cd pokemon/
npm install

```
## Iniciando a aplicação

- Definição da variáveis de ambiente:

<strong>A definição não é obrigatória</strong>, caso não sejam definidas a aplicação vai carregar as definições <a href="https://github.com/augusto-jm-amaral/pokemon/blob/master/src/config/index.js">padrões</a>.

A variáveis são:
```bash
NODE_ENV
PORT            # Porta utilizada pelo servidor. Default: 3000
DB_NAME         # Nome do banco. Default: dev_dbname
DB_USER         # Usuário do banco. Default: dev_dbuser
DB_PASS         # Senha do usuário do banco. Default: dev_pass
DB_DIALECT      # Dialeto do banco. Default: sqlite
LOG_DIR         # Pasta para armazena os logs. Default: /logs
PAGARME_API_KEY # Chave API Pagar.me. Default: ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg
```

- Inicializando a aplicação em produção:

```bash
npm start
```

- Inicializando a aplicação em modo desenvolvimento:

```bash
npm run dev
```

## Iniciando os testes

- Teste de **unidade**

Executando rotina de teste de unidade:
```bash
npm run test:unit
```

Executando rotina de teste de unidade em modo *live reload*:
```bash
npm run test:unit:watch
```

- Teste de **integração**

Executando rotina de teste de integração:
```bash
npm run test:integration
```

Executando rotina de teste de integração em modo *live reload*:
```bash
npm run test:integration:watch
```

## Recursos da aplicação




