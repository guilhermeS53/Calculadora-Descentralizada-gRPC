const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./calculadora.proto');
const calculadora_proto = grpc.loadPackageDefinition(packageDefinition).calculadora;

const client = new calculadora_proto.Calculadora('localhost:50050', grpc.credentials.createInsecure());

const operacao = {
  numero1: 10,
  numero2: 5,
  operador: '*', // Operacao de acordo com a necessidade
};

client.Calcular(operacao, (err, response) => {
  if (!err) {
    console.log(`Resultado da operação: ${response.resultado}`);
  } else {
    console.error(err);
  }
});