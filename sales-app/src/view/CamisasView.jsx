import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DetalhesCamisa from './components/DetalhesCamisa';
import { useCarrinho } from './components/carrinhoProvider/CarrinhoProvider'

const camisas = [
    {
        id: '1',
        nome: 'Camisa Naruto',
        preco: '49',
        imagem: '',
    },
    {
        id: '2',
        nome: 'Camisa One Piece',
        preco: '59',
        imagem: '',
    },
    {
        id: '3',
        nome: 'Camisa HxH',
        preco: '39',
        imagem: '',
    },
];

const CamisasView = () => {
    const [busca, setBusca] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const { adicionarAoCarrinho } = useCarrinho();

    const camisasFiltradas = camisas.filter((camisa) =>
        camisa.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Camisas de Anime</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar camisas..."
                value={busca}
                onChangeText={setBusca}
            />

            <FlatList
                data={camisasFiltradas}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity
                            onPress={() => setProdutoSelecionado(item)}
                            style={styles.touchableArea}
                        >
                            <Image source={{ uri: item.imagem }} style={styles.imagem} />
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.preco}>R$ {item.preco}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => adicionarAoCarrinho(item)}
                        >
                            <Ionicons name="add" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.nenhumResultado}>Nenhuma camisa encontrada.</Text>}
            />
            
            {produtoSelecionado && (
                <DetalhesCamisa
                    produto={produtoSelecionado}
                    onFechar={() => setProdutoSelecionado(null)}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    card: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    imagem: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    preco: {
        fontSize: 14,
        color: 'green',
        marginBottom: 10,
    },
    botao: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    nenhumResultado: {
        textAlign: 'center',
        marginTop: 50,
        fontStyle: 'italic',
        color: '#999',
    },
    touchableArea: {
        width: '100%',
        alignItems: 'center',
    }
});

export default CamisasView;
