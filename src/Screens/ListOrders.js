import {react, useState, useEffect} from 'react' ;
import styles from  './styles';
import {View, Text, TouchableOpacity, TextInput, Alert, Keyboard, ScrollView} from 'react-native';
import Orders from '../components/Orders';

import {
    getOrders,
    getOrderItens
  } from '../services/dbservice';

export default function ListOrders({navigation}){    
    let myStyle = styles(navigation.state.params);
    
    const [orders, setOrders] = useState([]);

    useEffect(
        () => {
            processingUseEffect();
        }, []
    );

    async function processingUseEffect() {
        await loadOrders();
    }

    async function loadOrders() {
        try {
            let orders = await getOrders();
            let promises = orders.map(async order => {
                let ordItens = await getOrderItens(order.Id);
                order.OrderItens = ordItens
                order.TotalPrice = 0;
                order.OrderItens.forEach(ordItem => {
                    order.TotalPrice += ordItem.TotalPrice == null ? 0 : parseFloat(ordItem.TotalPrice);
                })
            });
            await Promise.all(promises);
            setOrders(orders);
        }
        catch (e) {
            Alert.alert(e);
        }
    }

    return (
        <View style={myStyle.container}>
            <Orders style={"with: 100%"} ordersList={orders}></Orders>
            
            <TouchableOpacity style={myStyle.botao}
                onPress={()=> navigation.navigate('Home')} >
                <Text style={myStyle.textoBotao}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}