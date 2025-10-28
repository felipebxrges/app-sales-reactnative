import React from 'react';
import {
    View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from './components/carrinhoProvider/CarrinhoProvider';

const CarrinhoView = () => {
    const { carrinho, removerDoCarrinho } = useCarrinho();

    const total = carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0);

    const handleRemover = (item) => {
        console.log(item);
        Alert.alert(
            'Remover Item',
            `Deseja remover ${item.nome} do carrinho?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => removerDoCarrinho(item.id),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Seu Carrinho</Text>

            <FlatList
                data={carrinho}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imagem || '' }} style={styles.imagem} />
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.preco}>R$ {item.preco}</Text>
                        <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>

                        <TouchableOpacity
                            style={styles.botaoExcluir}
                            onPress={() => handleRemover(item)}
                        >
                            <Ionicons name="trash" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.nenhumResultado}>Carrinho vazio.</Text>
                }
            />

            {carrinho.length > 0 && (
                <View style={styles.totalContainer}>
                    {carrinho.map((item, index) => (
                        <Text key={index} style={styles.totalTexto}>
                            {item.nome}: R$ {parseFloat(item.preco).toFixed(2)}
                        </Text>
                    ))}

                    <View style={styles.linhaSeparadora} />

                    <Text style={styles.totalTexto}>
                        Total: R$ {carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0).toFixed(2)}
                    </Text>
                </View>
            )}
        </View>
    );
};

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
    card: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative',
    },
    imagem: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#ddd',
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    preco: {
        fontSize: 14,
        color: 'green',
    },
    quantidade: {
        fontSize: 14,
        color: '#333',
    },
    botaoExcluir: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#dc3545',
        padding: 6,
        borderRadius: 5,
    },
    nenhumResultado: {
        textAlign: 'center',
        marginTop: 50,
        fontStyle: 'italic',
        color: '#999',
    },
    totalContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#29374eff',
        borderRadius: 8,
        alignItems: 'center',
    },
    totalTexto: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export { CarrinhoView };
