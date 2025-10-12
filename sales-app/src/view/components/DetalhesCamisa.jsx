import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetalhesProduto({ produto, onFechar }) {
  if (!produto) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Image source={{ uri: produto.imagem }} style={styles.imagem} />
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>
        <Text style={styles.descricao}>{produto.descricao || 'Sem descrição'}</Text>

        <TouchableOpacity style={styles.botaoFechar} onPress={onFechar}>
          <Text style={styles.textoFechar}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  preco: {
    fontSize: 18,
    color: 'green',
    marginTop: 5,
  },
  descricao: {
    fontSize: 14,
    marginTop: 10,
  },
  botaoFechar: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoFechar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
