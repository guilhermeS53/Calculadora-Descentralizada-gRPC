// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var calculadora_pb = require('./calculadora_pb.js');

function serialize_calculadora_Operacao(arg) {
  if (!(arg instanceof calculadora_pb.Operacao)) {
    throw new Error('Expected argument of type calculadora.Operacao');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculadora_Operacao(buffer_arg) {
  return calculadora_pb.Operacao.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculadora_Resultado(arg) {
  if (!(arg instanceof calculadora_pb.Resultado)) {
    throw new Error('Expected argument of type calculadora.Resultado');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculadora_Resultado(buffer_arg) {
  return calculadora_pb.Resultado.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculadoraService = exports.CalculadoraService = {
  calcular: {
    path: '/calculadora.Calculadora/Calcular',
    requestStream: false,
    responseStream: false,
    requestType: calculadora_pb.Operacao,
    responseType: calculadora_pb.Resultado,
    requestSerialize: serialize_calculadora_Operacao,
    requestDeserialize: deserialize_calculadora_Operacao,
    responseSerialize: serialize_calculadora_Resultado,
    responseDeserialize: deserialize_calculadora_Resultado,
  },
};

exports.CalculadoraClient = grpc.makeGenericClientConstructor(CalculadoraService);
