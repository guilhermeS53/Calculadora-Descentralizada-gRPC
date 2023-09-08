const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./calculadora.proto');
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition).calculadora;

function calcularOperacao(call, callback) {
  const { numero1, numero2, operador } = call.request;

  let resultado;

  switch (operador) {
    case '+':
      resultado = numero1 + numero2;
      break;

    case '-':
      resultado = numero1 - numero2;
      break;

    case '*':
      resultado = numero1 * numero2;
      break;

    case '/':
      if (numero2 !== 0) {
        resultado = numero1 / numero2;
      } else {
        callback({ code: grpc.status.INVALID_ARGUMENT, details: 'Divisão por zero' }, null);
        return;
      }
      break;

    default:
      callback({ code: grpc.status.INVALID_ARGUMENT, details: 'Operador inválido' }, null);
      return;
  }

  callback(null, { resultado });
}

const server = new grpc.Server();
server.addService(calculadora_proto.Calculadora.service, { Calcular: calcularOperacao });
server.bindAsync('127.0.0.1:50050', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Servidor Calculadora rodando em 127.0.0.1:50050');
  server.start();
});