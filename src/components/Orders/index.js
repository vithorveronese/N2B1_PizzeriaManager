import {Text,View, Image, ScrollView} from 'react-native';
import styles from './styles';

export default function Orders({ordersList}) {
    return (
        <ScrollView style={[styles.scrollViewArea]}>
            {ordersList.map((order, index) => (
                <View style={styles.orderCard} key={index.toString()}>
                    <Text >   Código do pedido: {order.OrderCode}</Text>
                    <Text></Text>
                    <Text >   Data do pedido: {order.Date}</Text>
                    <Text></Text>
                    <Text >   Total do pedido: R${order.TotalPrice}</Text>
                    <Text >   Itens do pedido: </Text>
                    <View>
                        {order.OrderItens.map((orderItem, itemIndex) => (
                            <View style={styles.itemCard} key={itemIndex.toString()}>
                                <Text>   Código do produto: {orderItem.ProductId}</Text>
                                <Text>   Preço do produto: R${orderItem.TotalPrice}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};