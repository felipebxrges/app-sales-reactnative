import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AdminCadastrarCamisaVeiw = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [erros, setErros] = useState([]);


    const escolherImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Você precisa permitir acesso à galeria para escolher imagens.');
            return;
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!resultado.canceled) {
            const imagemSelecionada = resultado.assets[0].uri;
            setImagem(imagemSelecionada);
        }
    };

    const validateProduto = () => {
        let errors = [];
        if (nome.trim() === '') errors.push('Nome é obrigatório.');
        if (descricao.trim() === '') errors.push('Descrição é obrigatória.');
        if (preco.trim() === '' || isNaN(preco)) errors.push('Preço inválido.');
        if (imagem === null) errors.push('Imagem é obrigatória.');

        return errors;
    }

    const salvarProduto = () => {
        const errosEncontrados = validateProduto();

        if (errosEncontrados.length > 0) {
            setErros(errosEncontrados);
            return;
        }

        setErros([]);

        const novoProduto = {
            nome,
            descricao,
            preco,
            imagem,
        };

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastrar Produto</Text>

            <TextInput
                placeholder="Nome da camisa"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                placeholder="Descrição"
                style={styles.input}
                value={descricao}
                onChangeText={setDescricao}
            />

            <TextInput
                placeholder="Preço"
                style={styles.input}
                keyboardType="decimal-pad"
                value={preco}
                onChangeText={setPreco}
            />

            <TouchableOpacity onPress={escolherImagem} style={styles.botaoImagem}>
                <Ionicons name="image-outline" size={20} color="#fff" />
                <Text style={styles.textoBotaoImagem}>Escolher Imagem</Text>
            </TouchableOpacity>

            {imagem && <Image source={{ uri: imagem }} style={styles.preview} />}

            <Button title="Salvar Produto" onPress={salvarProduto} />

            {erros.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                    {erros.map((erro, index) => (
                        <Text key={index} style={{ color: 'red' }}>• {erro}</Text>
                    ))}
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
    botaoImagem: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    textoBotaoImagem: { color: '#fff', marginLeft: 10 },
    preview: { width: '100%', height: 200, marginBottom: 10, borderRadius: 10 },
});

export default AdminCadastrarCamisaVeiw;