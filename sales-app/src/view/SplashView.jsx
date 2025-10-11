import { useEffect, useRef } from "react"
import { Animated, StyleSheet, TouchableOpacity } from "react-native"
import { ActivityIndicator, MD2Colors, Text, Avatar } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"


const SplashView = ( {onFinish} )=>{
    const fade = useRef(new Animated.Value(0)).current
    const scale = useRef(new Animated.Value(0.8)).current

    useEffect(()=>{
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fade,{toValue: 1, duration: 4000, useNativeDriver: true}),
                Animated.timing(scale,{toValue: 1, duration: 4000, useNativeDriver: true})
            ]),
            Animated.delay(500),
            Animated.timing(fade,{toValue: 0, duration: 4000, useNativeDriver: true}),
        ]).start()
        
    },[])

    useEffect(()=>{
        const id = setTimeout(() => {
           onFinish('login') 
        }, 8000);
        return ()=> clearTimeout(id)
    },[onFinish])

    return (
        <SafeAreaView style={styles.splash}>
            <Animated.View style={[styles.splash, {opacity: fade, transform: [{scale}]}] } >

                <Avatar.Icon size={180} icon="tshirt-crew" />

                <Text style={{fontSize:32,fontWeight:'bold', padding: 15, color:'#fff'}}>
                    Felipe Comics
                </Text>
                <Text style={{fontSize:18, letterSpacing: 8, padding: 10, color:'#fff'}}>
                    As melhores camisetas do universo dos animes</Text>

            <ActivityIndicator animating={true} color={MD2Colors.red800} size={120} />

            </Animated.View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    splash: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

export default SplashView