import React, { use, useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DetalhesCamisa from './components/DetalhesCamisa';
import { useCarrinho } from './components/carrinhoProvider/CarrinhoProvider';
import { useAuth } from './components/authProvider/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useCamisaController } from '../controller/CamisaController';
import { Picker } from '@react-native-picker/picker';

const CamisasView = () => {

    const [filterCrescente, setFilterCrescente] = useState(false);
    const [filterDecrescente, setFilterDecrescente] = useState(false);

    const { states, actions } = useCamisaController();

    const { adicionarAoCarrinho } = useCarrinho();

    const camisasFiltradas = states.camisas.filter((camisa) =>
        camisa.nome.toLowerCase().includes(states.busca.toLowerCase())
    );

    const camisasFiltradasCrescente = [...camisasFiltradas].sort(
        (a, b) => parseFloat(a.preco) - parseFloat(b.preco)
    );

    const camisasFiltradasDecrescente = [...camisasFiltradas].sort(
        (a, b) => parseFloat(b.preco) - parseFloat(a.preco)
    );

    useFocusEffect(
        useCallback(() => {
            actions.carregarProdutos();
        }, [])
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Camisas de Anime</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar camisas..."
                value={states.busca}
                onChangeText={actions.setBusca}
            />

            <Picker
                selectedValue={filterCrescente ? "crescente" : filterDecrescente ? "decrescente" : ""}
                style={{ width: '100%' }}
                onValueChange={
                    (value) => {
                        if (value === "crescente") {
                            setFilterCrescente(true);
                            setFilterDecrescente(false);
                        } else if (value === "decrescente") {
                            setFilterDecrescente(true);
                            setFilterCrescente(false);
                        } else {
                            setFilterCrescente(false);
                            setFilterDecrescente(false);
                        }
                    }
                }>
                <Picker.Item label="Ordenar por preço" value="" />
                <Picker.Item label="Crescente" value="crescente" />
                <Picker.Item label="Decrescente" value="decrescente" />
            </Picker>

            <FlatList
                data={filterCrescente ? camisasFiltradasCrescente : filterDecrescente ? camisasFiltradasDecrescente : camisasFiltradas}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity
                            onPress={() => actions.setProdutoSelecionado(item)}
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

            {states.produtoSelecionado && (
                <DetalhesCamisa
                    produto={states.produtoSelecionado}
                    onFechar={() => actions.setProdutoSelecionado(null)}
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
        resizeMode: 'cover',
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
        alignItems: 'center',
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
    },
});

export default CamisasView;
