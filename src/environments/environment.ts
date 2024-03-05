export const environment = {
  firebase: {
    projectId: 'grupo-brax-dev',
    appId: '1:632787335402:web:3594774f7f8333eb58bf93',
    storageBucket: 'grupo-brax-dev.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyAv64o51Qu8hf6KGmMsXqbeA9vHcFdxm24',
    authDomain: 'grupo-brax-dev.firebaseapp.com',
    messagingSenderId: '632787335402',
  },
  production: false,
  paths: {},
  defaultPassword: 'grupobrax123',
  cloudFunctions: {
    url: 'https://us-central1-grupo-brax-dev.cloudfunctions.net',
    createUser: '/createUser',
    deleteUser: '/deleteUser',
    sendEmail: '/sendEmail',
  },
  templates: {
    register: 'd-96899cd9fa5b4ca289ae5164410d7b3e',
  },
  sicoob: {
    apiUrl: 'https://sandbox.sicoob.com.br/sicoob/sandbox/cobranca-bancaria/v2/',
   // sandboxUrl: 'https://sandbox.sicoob.com.br/sicoob/sandbox/cobranca-bancaria/v2',
    clientId: '9b5e603e428cc477a2841e2683c92d21',
    token: '1301865f-c6bc-38f3-9f49-666dbcfc59c3',
    identificacaoBoletoEmpresa:"4562",
    nossoNumero:2588658,
    seuNumero:"1235512",
    modalidade:"1",
    especieDocumento:"DM",
    numeroContaCorrente:0,
    numeroContrato:25546454,
    beneficiarioFinal: {
      numeroCpfCnpj: "98784978699",
      nome: "Lucas de Lima"
  },
  mock :
  [{
      "numeroContrato": 25546454,
      "modalidade": 1,
      "numeroContaCorrente": 0,
      "especieDocumento": "DM",
      "dataEmissao": "2018-09-20T00:00:00-03:00",
      "nossoNumero": 2588658,
      "seuNumero": "1235512",
      "identificacaoBoletoEmpresa": "4562",
      "identificacaoEmissaoBoleto": 1,
      "identificacaoDistribuicaoBoleto": 1,
      "valor": 156.23,
      "dataVencimento": "2023-12-22T00:00:00-03:00",
      "dataLimitePagamento": "2023-12-22T00:00:00-03:00",
      "valorAbatimento": 1,
      "tipoDesconto": 1,
      "dataPrimeiroDesconto": "2023-12-20T00:00:00-03:00",
      "tipoMulta": 0,
      "valorMulta": 5,
      "tipoJurosMora": 2,
      "numeroParcela": 1,
      "pagador": {
          "numeroCpfCnpj": "98765432185",
          "nome": "Marcelo dos Santos",
          "endereco": "Rua 87 Quadra 1 Lote 1 casa 1",
          "bairro": "Santa Rosa",
          "cidade": "Luziânia",
          "cep": "72320000",
          "uf": "DF",
          "email": [
              "carolx54@gmail.com"
          ]
      },
      "beneficiarioFinal": {
          "numeroCpfCnpj": "98784978699",
          "nome": "Lucas de Lima"
      },
      "gerarPdf": true
    
  }]
  }
};
