const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./calculadora.proto');
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition).calculadora;

const clientSoma = new calculadora_proto.Calculadora('localhost:50051', grpc.credentials.createInsecure());
const clientSubtracao = new calculadora_proto.Calculadora('localhost:50052', grpc.credentials.createInsecure());
const clientMultiplicacao = new calculadora_proto.Calculadora('localhost:50053', grpc.credentials.createInsecure());
const clientDivisao = new calculadora_proto.Calculadora('localhost:50054', grpc.credentials.createInsecure());

function calcularOperacao(call, callback) {
  const { numero1, numero2, operador } = call.request;

  switch (operador) {
    case '+':
      clientSoma.Calcular({ numero1, numero2 }, (err, response) => {
        if (!err) {
          callback(null, response);
        } else {
          callback(err, null);
        }
      });
      break;

    case '-':
      clientSubtracao.Calcular({ numero1, numero2 }, (err, response) => {
        if (!err) {
          callback(null, response);
        } else {
          callback(err, null);
        }
      });
      break;

    case '*':
      clientMultiplicacao.Calcular({ numero1, numero2 }, (err, response) => {
        if (!err) {
          callback(null, response);
        } else {
          callback(err, null);
        }
      });
      break;

    case '/':
      clientDivisao.Calcular({ numero1, numero2 }, (err, response) => {
        if (!err) {
          callback(null, response);
        } else {
          callback(err, null);
        }
      });
      break;

    default:
      callback({ code: grpc.status.INVALID_ARGUMENT, details: 'Operador inválido' }, null);
      break;
  }
}

const server = new grpc.Server();
server.addService(calculadora_proto.Calculadora.service, { Calcular: calcularOperacao });
server.bindAsync('127.0.0.1:50050', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Servidor Calculadora rodando em 127.0.0.1:50050');
  server.start();
});