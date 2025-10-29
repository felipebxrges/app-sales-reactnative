import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAdminCamisas } from './components/adminContext/AdminCamisasProvider';

const AdminView = ({ navigation }) => {

  const { camisasDoAdmin, removerCamisa } = useAdminCamisas();

  const handleExcluir = (id) => {
    Alert.alert(
      'Excluir Produto',
      'Tem certeza que deseja excluir esta camisa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerCamisa(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imagem || 'https://via.placeholder.com/150' }}
        style={styles.imagem}
      />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.preco}</Text>

      <View style={styles.botoesAcoes}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => navigation.navigate('EditarProduto', { produto: item })}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => handleExcluir(item.id)}
        >
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Produtos</Text>

      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={() => navigation.navigate('CadastrarProduto')}
      >
        <Text style={styles.textoBotao}>+ Cadastrar Camisa</Text>
      </TouchableOpacity>

      <FlatList
        data={camisasDoAdmin}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma camisa cadastrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botaoCadastrar: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  botoesAcoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botaoEditar: {
    backgroundColor: '#1e40af',
    padding: 8,
    borderRadius: 5,
  },
  botaoExcluir: {
    backgroundColor: '#dc2626',
    padding: 8,
    borderRadius: 5,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default AdminView;
