import { Button, Card, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, KeyboardAvoidingView, Keyboard, View } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "./components/authProvider/AuthProvider";

const LoginView = ({ navigation }) => {

    const [showPass, setShowPass] = useState(true);
    const [campos, setCampos] = useState({ email: '', senha: '' });
    const [showSnack, setShowSnack] =
        useState({ show: false, message: 'Login ou Senha incorreta.' });

    const { login } = useAuth();

    useEffect(() => {
        const id = setTimeout(() => {
            setShowSnack({ ...showSnack, show: false });
        }, 3000);
        return () => clearTimeout(id);
    }, [showSnack]);

    const handleLogin = async () => {
        Keyboard.dismiss();
        console.log(campos);
        if (await login(campos.email, campos.senha)) {
            console.log("entrou");
            navigation.replace('AppTabs');
        } else {
            setCampos({ email: '', senha: '' });
            setShowSnack({ ...showSnack, show: true });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Pressable style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.innerContainer}>
                        <Card mode="elevated" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge" style={styles.title}>LOGIN</Text>

                                <TextInput
                                    mode="outlined"
                                    left={<TextInput.Icon icon="email" />}
                                    value={campos.email}
                                    onChangeText={(e) => setCampos({ ...campos, email: e })}
                                    label="Email"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />

                                <TextInput
                                    mode="outlined"
                                    label="Senha"
                                    secureTextEntry={showPass}
                                    value={campos.senha}
                                    onChangeText={(e) => setCampos({ ...campos, senha: e })}
                                    right={<TextInput.Icon icon={showPass ? 'eye' : 'eye-closed'}
                                        onPress={() => setShowPass(!showPass)} />}
                                    style={styles.input}
                                />
                            </Card.Content>

                            <Card.Actions>
                                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                                    Entrar
                                </Button>
                            </Card.Actions>
                        </Card>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>

            <SafeAreaProvider>
                <Snackbar
                    visible={showSnack.show}
                    style={styles.snackbar}
                >
                    {showSnack.message}
                </Snackbar>
            </SafeAreaProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#1E1E1E', 
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#1E1E1E',
        color: '#fff',
    },
    button: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#6200EE',
    },
    snackbar: {
        backgroundColor: '#BB86FC',
        color: '#000',
    }
});

export default LoginView;
