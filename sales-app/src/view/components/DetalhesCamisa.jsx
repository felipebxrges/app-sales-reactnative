import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { useRef, useEffect } from 'react';

export default function DetalhesDaCamisa({ produto, onFechar }) {

    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const animationFinish = () => {
        Animated.timing(slideAnim, {
            toValue: 300, 
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onFechar(); });
    };

    return (
        <TouchableWithoutFeedback onPress={animationFinish}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={styles.container}>
                        <Image source={{ uri: produto.imagem }} style={styles.imagem} />
                        <Text style={styles.nome}>{produto.nome}</Text>
                        <Text style={styles.preco}>R$ {produto.preco}</Text>
                        <Text style={styles.descricao}>{produto.descricao || 'Sem descrição'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        resizeMode: 'cover',
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

