import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Camisa from '../model/camisa';
import { useContext } from 'react';
import { useAdminCamisas } from './components/adminContext/AdminCamisasProvider';
import { useAuth } from './components/authProvider/AuthProvider';

const AdminCadastrarCamisaVeiw = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [erros, setErros] = useState([]);

    const {logado} = useAuth();
    const { adicionarCamisa } = useAdminCamisas();

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
        if (preco.trim() === '' || isNaN(preco)) errors.push('Preço inválido.');
        if (imagem === null) errors.push('Imagem é obrigatória.');

        return errors;
    }

    const salvarProduto = async () => {
        const errosEncontrados = validateProduto();

        if (errosEncontrados.length > 0) {
            setErros(errosEncontrados);
            return;
        }

        setErros([]);

        const novaCamisa = new Camisa(undefined, nome, parseFloat(preco).toFixed(2), imagem, parseInt(logado.id));

        await adicionarCamisa(novaCamisa);

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

const COLORS = {
    primary: '#007bff',
    white: '#ffffff',
    border: '#cccccc',
};

const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
};

const RADIUS = {
    sm: 5,
    md: 10,
};

const FONT = {
    title: 20,
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
    },

    titulo: {
        fontSize: FONT.title,
        fontWeight: 'bold',
        marginBottom: SPACING.md,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        marginBottom: SPACING.lg - 5,
        paddingVertical: SPACING.sm,
        paddingHorizontal: 2,
    },

    botaoImagem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: SPACING.sm * 1.5,
        borderRadius: RADIUS.sm,
        marginBottom: SPACING.md,
    },

    textoBotaoImagem: {
        color: COLORS.white,
        marginLeft: SPACING.sm,
        fontWeight: '600',
    },

    preview: {
        width: '100%',
        height: 200,
        marginBottom: SPACING.md,
        borderRadius: RADIUS.md,
        resizeMode: 'cover',
    },
});


export default AdminCadastrarCamisaVeiw;