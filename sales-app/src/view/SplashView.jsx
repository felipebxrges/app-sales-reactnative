import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD2Colors, Text, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashView = ({ onFinish }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true })
      ]),
      Animated.delay(500),
      Animated.timing(fade, { toValue: 0, duration: 2500, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => onFinish("login"), 5500);
    return () => clearTimeout(id);
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fade, transform: [{ scale }] }]}>
        <Avatar.Icon 
          size={160} 
          icon="tshirt-crew" 
          style={styles.avatar} 
        />

        <Text style={styles.title}>
          Felipe Comics
        </Text>

        <Text style={styles.subtitle}>
          As melhores camisetas do universo dos animes
        </Text>

        <ActivityIndicator 
          animating={true} 
          color={MD2Colors.red700} 
          size="large" 
          style={styles.loader} 
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    backgroundColor: MD2Colors.red500,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 1.5,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 30,
  },
  loader: {
    marginTop: 10,
  },
});

export default SplashView;
