const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./calculadora.proto');
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition).calculadora;

function calcularSubtracao(call, callback) {
  const { numero1, numero2 } = call.request;
  const resultado = numero1 - numero2;
  callback(null, { resultado });
}

const server = new grpc.Server();
server.addService(calculadora_proto.Calculadora.service, { Calcular: calcularSubtracao });
server.bindAsync('127.0.0.1:50052', grpc.ServerCredentials.createInsecure(), () => {
console.log('Servidor de Subtração rodando em 127.0.0.1:50052');
server.start();
});