import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './components/authProvider/AuthProvider';

const PerfilView = ({ navigation }) => {
  const { logado } = useAuth();

  const logout = () => {
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.perfilContainer}>
        <Image
          source={{ uri: logado.image }}
          style={styles.avatar}
        />

        <Text style={styles.nome}>{logado.nome}</Text>

        <Text style={styles.saldo}>Saldo: R$ {logado.saldo.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.botaoLogout} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.textoBotao}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  perfilContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30, 
    marginBottom: 15,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  saldo: {
    fontSize: 16,
    color: '#555',
  },
  botaoLogout: {
    flexDirection: 'row',
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default PerfilView;
