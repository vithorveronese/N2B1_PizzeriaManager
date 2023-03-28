import { Provider as PaperProvider } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './src/Screens/Home';
import Admin from './src/Screens/Admin';
import Categories from './src/Screens/ManageCategories';
import Products from './src/Screens/ManageProducts';
import Orders from './src/Screens/ManageOrders';
import ListOrders from './src/Screens/ListOrders';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Admin,
    Categories,
    Products,
    Orders,
    ListOrders
  })
);

export default function App() {
  return (
    <PaperProvider>
      <Routes/>
    </PaperProvider>
  );
}
