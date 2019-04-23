# Lanches
___

Aplicativo de delivery onde o usuário possui uma lista de lanches para escolher e, ao selecionar uma das opções, navega para uma tela onde pode fazer alterações nos ingredientes do lanche selecionado podendo desfrutar das seguintes promoções:

  - **Light**: Se o lanche tem alface e não tem bacon, ganha 10% de desconto. 
  - **Muita carne**: A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, o cliente pagará 4. Assim por diante...
  - **Muito queijo**: A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, o cliente pagará 4. Assim por diante...
 

Arquitetura
-
Aplicativo desenvolvido utilizando [React Native](<https://facebook.github.io/react-native/>), com gerenciamento de estado utilizando [Redux](<http://redux.js.org>) e [Redux Saga](<https://redux-saga.js.org/>).

Padrão de Desenvolvimento
-
Para padronizar o desenvolvimento foi utilizado [eslint do Airbnb](<https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>) com desenvolvimento focado para dispositivos android.

Utilização
-
Para rodar o aplicativo em seu emulador ou dispositivo android, basta entrar na pasta do projeto e executar o comando abaixo:

```sh
$ npm android
```
ou
```sh
$ yarn android
```



