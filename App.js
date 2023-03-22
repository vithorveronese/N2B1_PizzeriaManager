import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './home';
import Products from './Screens/ManageProducts';
import Orders from './Screens/ManageOrders';
//import Tela3 from './Telas/tela3';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Products,
    Orders,
  })
);

export default function App() {
  return (
    <Routes/>
  );
}
