const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./calculadora.proto');
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition).calculadora;

function calcularDivisao(call, callback) {
  const { numero1, numero2 } = call.request;
  if (numero2 === 0) {
    callback({ code: grpc.status.INVALID_ARGUMENT, details: 'Divisão por zero não é permitida' });
    return;
  }
  const resultado = numero1 / numero2;
  callback(null, { resultado });
}

const server = new grpc.Server();
server.addService(calculadora_proto.Calculadora.service, { Calcular: calcularDivisao });
server.bind('127.0.0.1:50054', grpc.ServerCredentials.createInsecure());
console.log('Servidor de Divisão rodando em 127.0.0.1:50054');
server.start();