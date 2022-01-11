import { createServer, Model } from 'miragejs'

type User = {
  name:string;
  email:string;
  create_at:number;
}

export function makeServer(){
  const server = createServer({
    models:{
      user: Model.extend<Partial<User>>({})
    },
    routes(){
      // rodar o barra do nosso localhost, cuidado para nao colocar o mesmo nome da pasta api (o padrao do nextJS) 
      this.namespace = 'api2';  
      this.timing = 750; // tempo de execucao perfeito para teste de loaders

      this.get('/users');
      this.post('/users');

      this.passthrough() // fazer com que as chamadas serem passadas pelo mirage, caso nao encontrem repassam para outras rotas
    }
  })
  return server;
}