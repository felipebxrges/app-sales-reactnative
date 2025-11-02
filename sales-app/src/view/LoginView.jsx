import { Button, Card, Snackbar, Text, TextInput } from "react-native-paper"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "./components/authProvider/AuthProvider";


const LoginView = ( {navigation} )=>{

    const [showPass, setShowPass] = useState(true)
    const [campos, setCampos] = useState({email: '',senha: ''})
    const [showSnack, setShowSnack] = 
        useState({ show: false, message:'Login ou Senha incorreta.'})
        
    const {login} = useAuth()

    useEffect(()=>{
        const id = setTimeout(() => {
          setShowSnack( {...showSnack, show: false } )
        }, 3000);
        return ()=> clearTimeout(id)
    },[showSnack])

    const handleLogin = async ()=>{
      Keyboard.dismiss()
      console.log(campos)
      if (await login(campos.email, campos.senha)){
        console.log("entrou");
        
          navigation.replace('AppTabs')
      }else{
        setCampos( {email: '',senha: ''} )
        setShowSnack( {...showSnack, show: true} )
      }
    }

    return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView style={{flex: 1}}>
        <Pressable onPress={()=>{Keyboard.dismiss()}}>

        <Card mode="elevated">
          <Card.Title   />
          <Card.Content>
            <Text variant="titleLarge">LOGIN</Text>

            <TextInput mode="outlined" 
            left={<TextInput.Icon icon="email" />}
            value={campos.email}
            onChangeText={(e)=> setCampos( {...campos, email: e} )}
            label="email" />

            <TextInput mode="outlined" 
            label="Senha" secureTextEntry={showPass} 
            value={campos.senha}
            onChangeText={(e)=> setCampos( {...campos, senha: e} )}
            right={<TextInput.Icon icon={showPass?'eye':'eye-closed'} 
            onPress={ ()=> setShowPass(!showPass)} />}/>

          </Card.Content>
          <Card.Actions>
            <Button onPress={handleLogin} >Ok</Button>

          </Card.Actions>
        </Card>

        </Pressable>
        </KeyboardAvoidingView>

          <SafeAreaProvider>
                  <Snackbar
                        visible={showSnack.show}
                        >
                        {showSnack.message}
                      </Snackbar>
          </SafeAreaProvider>

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 200,
    backgroundColor: '#000',
    width: '100%',
  }
})

export default LoginView