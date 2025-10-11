
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeView from '../../HomeView';
import PerfilView from '../../PerfilView';
import SuporteView from '../../SuporteView';
import { useAuth } from '../authProvider/AuthProvider';
import AdminView from '../../AdminView';
import AdminJogos from '../../admin/AdminJogos';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CamisasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#101826' },
        headerTitleStyle: { color: '#E2E8F0' },
        headerTintColor: '#E2E8F0',
      }}
    >
      <Stack.Screen name="CamisasStack" component={CamisasView} options={{ title: 'Camisas' }} />
      
    </Stack.Navigator>
  );
}

function ContaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#101826' },
        headerTitleStyle: { color: '#E2E8F0' },
        headerTintColor: '#E2E8F0',
      }}
    >
      <Stack.Screen name="PerfilStack" component={PerfilView} options={{ title: 'Minha Conta' }} />
    </Stack.Navigator>
  );
}

function CarrinhoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#101826' },
        headerTitleStyle: { color: '#E2E8F0' },
        headerTintColor: '#E2E8F0',
      }}
    >
      <Stack.Screen name="CarrinhoStack" component={CarrinhoView} options={{ title: 'Carrinho' }} />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#101826" },
        headerTitleStyle: { color: "#E2E8F0" },
        headerTintColor: "#E2E8F0",
      }}
    >
      <Stack.Screen name="AdminProdutos" component={AdminView} options={{ title: "Meus produtos" }} />
      <Stack.Screen name="CadastrarProduto" component={AdminJogos} options={{ title: "Cadastrar produto" }} />
      <Stack.Screen name="EditarProduto" component={AdminJogos} options={{ title: "Editar produto" }} />
    </Stack.Navigator>
  );
}

const HomeNav = () => {

  const { logado} = useAuth()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#101826', borderTopColor: '#1E293B' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarIcon: ({ color, size }) => {
          const icon = {
            Camisas: 'tshirt-v-outline',
            Conta: 'account-circle-outline',
            Carrinho: 'cart',
            Admin: "shield-account",
          }[route.name];
          return <MaterialCommunityIcons name={icon || 'circle'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Camisas" component={CamisasStack} />
      <Tab.Screen name="Carrinho" component={CarrinhoStack} />
      <Tab.Screen name="Conta" component={ContaStack} />
      {logado.tipo === "admin" && (
        <Tab.Screen name="Admin" component={AdminStack} />
      )}
    </Tab.Navigator>
  );
}

export default HomeNav
