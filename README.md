# Lanches
___

Aplicativo de delivery onde o usuário possui uma lista de lanches para escolher e, ao selecionar uma das opções, navega para uma tela onde pode fazer alterações nos ingredientes do lanche selecionado podendo desfrutar das seguintes promoções:

  - **Light**: Se o lanche tem alface e não tem bacon, ganha 10% de desconto. 
  - **Muita carne**: A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, o cliente pagará 4. Assim por diante...
  - **Muito queijo**: A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, o cliente pagará 4. Assim por diante...
 

Arquitetura
-
Aplicativo desenvolvido utilizando [React Native](<https://facebook.github.io/react-native/>), com gerenciamento de estado utilizando [Redux](<http://redux.js.org>) e [Redux Saga](<https://redux-saga.js.org/>) como Middleware para as requisições do Redux.
Para padronizar o desenvolvimento foi utilizado o padrão do [Airbnb](<https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>) utilizando o [EsLint](<https://eslint.org/>) para o controle do código. Também foi utilizado o [Babel](<https://babeljs.io/>).

Utilização
-
Para utilizar o aplicativo, baste realizar o clone do diretório, entrar na pasta do projeto e executar um dos seguintes comandos:

Para dispositivos android:

```sh
$ npm android
```
ou
```sh
$ yarn android
```

Para dispositivos iOS, sendo suportado apenas no MacOS:

```sh
$ npm ios
```
ou
```sh
$ yarn ios
```