import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './src/Screens/Home';
import Products from './src/Screens/ManageProducts';
import Orders from './src/Screens/ManageOrders';
import ListOrders from './src/Screens/ListOrders';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Products,
    Orders,
    ListOrders
  })
);

export default function App() {
  return (
    <Routes/>
  );
}
