import { ActiveModelSerializer, createServer, Factory, Model , Response} from 'miragejs'
import faker from 'faker';

type User = {
  name:string;
  email:string;
  create_at:number;
}

export function makeServer(){
  const server = createServer({
    //Ajuda a trabalhar com relacionamento de dados 
    //Deve ser utilizado em todas as aplicacoes, envio e recebimento de dados de uma aplicacao RestFull
    serializers:{
      application: ActiveModelSerializer //Serve para tratar os dados vindos da Api, modelo ORM-(tudo em um requisao unica)
    },  
    models:{
      //Partial significa que nao obrigatoriamente necessitamos de todos os campos da tipagem
      user: Model.extend<Partial<User>>({})
    },
    factories: { 
      //Este conceito de factories, serve exclusivamente para cricao em massa de varios usuarios
      user: Factory.extend({
        name(i){
          return `User ${i + 1} `;
        },
        email(){
          return faker.internet.email().toLowerCase();
        },
        createdAt(){
          return faker.date.recent(10);
        }
      })
    },
    seeds(server){
      server.createList('user', 150)
    },
    routes(){
      // rodar o barra do nosso localhost, cuidado para nao colocar o mesmo nome da pasta api (o padrao do nextJS) 
      this.namespace = 'api';  
      this.timing = 550; // tempo de execucao perfeito para teste de loaders

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);


        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart,pageEnd)
        return new Response(
          200,
          { 'x-total-count': String(total)}, 
          {users}
        )
      } );
      this.get('/users/:id');
      this.post('/users');
      this.namespace = '';  
      this.passthrough() // fazer com que as chamadas serem passadas pelo mirage, caso nao encontrem repassam para outras rotas
    }
  })
  return server;
}