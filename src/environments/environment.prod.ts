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
    apiUrl: 'https://api.sicoob.com.br/pix/api/v2/',
    sandboxUrl: 'https://sandbox.sicoob.com.br/sicoob/sandbox/cobranca-bancaria/v2',
    clientId: '9b5e603e428cc477a2841e2683c92d21',
    token: '1301865f-c6bc-38f3-9f49-666dbcfc59c3'
  }
};
