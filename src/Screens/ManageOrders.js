import {react, useState, useEffect} from 'react' ;
import styles from  './styles';
import {View, Text, TouchableOpacity, TextInput, Alert, Keyboard, ScrollView} from 'react-native';
import Products from '../components/Products';
import { AntDesign } from "@expo/vector-icons";


import {
    createTable,
    insertRecord,
    getProducts,
    deleteTables
  } from '../services/dbservice';

export default function Orders({navigation}){    
    let myStyle = styles(navigation.state.params);
    let createdTable = false;
    
    const [orderCode, setOrderCode] = useState('');
    const [orderTotal, setOrderTotal] = useState(0);
    const [productList, setProductList] = useState([]);
    const [cartList, setCartList] = useState([]);

    useEffect(
        () => {
            processingUseEffect();
        }, []
    );

    async function processingUseEffect() {
        if (!createdTable) {
            tabelasCriadas = true;
            let queryOrders = `CREATE TABLE IF NOT EXISTS tbOrders
                (
                Id text not null primary key,
                Date text DEFAULT (date('now')),
                OrderCode text not null
            )`;

            let queryOrderItens = `CREATE TABLE IF NOT EXISTS tbOrderItens
                (
                Id Integer not null primary key AUTOINCREMENT,
                ProductId text not null,
                TotalPrice decimal not null,
                OrderId text not null
            )`;
                    
            await createTable(queryOrders);
            await createTable(queryOrderItens);
        }
        await loadProducts();
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    useEffect(
        () => {
            processingUseEffect();
        }, []
    );

    function cleanScreen() {
        setOrderTotal(0);
        setCartList([]);
        setOrderCode('');
    }

    async function saveInfo() {
        let queryOrder = 'INSERT INTO tbOrders (Id, OrderCode) values (?, ?)';
        let queryOrderItens = 'INSERT INTO tbOrderItens (ProductId, TotalPrice, OrderId) values (?, ?, ?)';
  
        let order = {
            Id: createUniqueId(),
            OrderCode: orderCode
        };
        let fieldsListOrder = [order.Id, order.OrderCode];

        try {
            await insertRecord(fieldsListOrder, queryOrder);
            cartList.forEach(async e => {
                await insertRecord([e.ProductCode, e.UnitPrice, order.Id], queryOrderItens);
            });
            cleanScreen();
            Alert.alert("Salvo com sucesso!!!");
        }
        catch (e) {
            Alert.alert(e);
        }
        await loadProducts();
    }

    async function loadProducts() {
        try {
            let products = await getProducts();
            products.forEach(element => {
                element.Style = myStyle.cardUser,
                element.Quantity = 0
            });
            setProductList(products);
        }
        catch (e) {
            Alert.alert(e);
        }
    }

    function addProductToCart(product, index) {
            let auxCart =[...cartList];
            let auxProd = product;
            auxProd.Style = myStyle.selectedCardUser;
            if (!cartList.includes(auxProd)) {
                let currentPrice = auxProd.UnitPrice.length > 0 ? parseFloat(auxProd.UnitPrice) : 0;
                auxCart.push(auxProd);
                setCartList(auxCart);
                setOrderTotal(orderTotal + currentPrice);
            }
            else Alert.alert('Produto já adicionado')
    }

    function removeProductFromCart(product) {
        const indexToRemove = cartList.findIndex(item => item.ProductCode === product.ProductCode);
        if (indexToRemove !== -1) {
            const newList = [...cartList];
            newList.splice(indexToRemove, 1);
            setCartList(newList);
            let auxProd = product;
            auxProd.Style = myStyle.cardUser;
            let currentPrice = auxProd.UnitPrice.length > 0 ? parseFloat(auxProd.UnitPrice) : 0;
            let total = orderTotal - currentPrice;
            let finalTotal = (total <= 0) ? 0 : total;
            setOrderTotal(finalTotal);
            Alert.alert('Produto removido')
        }
        else Alert.alert('Produto não está no carrinho')
    }

    async function deleteVerything() {
        console.log('1')
        await deleteTables('DROP TABLE IF EXISTS tbProducts;');
        console.log('2')
        await deleteTables('DROP TABLE IF EXISTS tbOrders;');
        console.log('3')
        await deleteTables('DROP TABLE IF EXISTS tbOrderItens;');
        console.log('4')
    }

    return (
        <View style={myStyle.container}>
            <Text>Código do pedido</Text>
            <TextInput 
                keyboardType="number-pad"
                onChangeText={(text) => setOrderCode(text)}
                value={orderCode}
                style={myStyle.textInput}>
            </TextInput>
            <Text>Total: </Text>
            <Text>R${orderTotal}</Text>
            <View style={myStyle.passwordContainer}>
                <TouchableOpacity style={myStyle.buttom} onPress={() => saveInfo()}><Text>Salvar pedido</Text></TouchableOpacity>
            </View>
            <ScrollView style={[myStyle.listaUsuarios]}>
            {productList.map((productObj, index) => (
                <View 
                    style={productObj.Style} 
                    key={index.toString()}>

                    <Text>  </Text>
                    <Text style={myStyle.textoCard}>
                        {productObj.ProductCode.padStart(3, "0")}
                    </Text>
                    <Text>         </Text>
                    <Text style={myStyle.textoCard}>{productObj.Description}</Text>
                    <Text>         </Text>
                    <Text style={myStyle.textoCard}>Preço: R${productObj.UnitPrice}</Text>

                    <View style={myStyle.areaBotoesCard}>
                        <TouchableOpacity style={myStyle.botaoEditar} onPress={() => addProductToCart(productObj, index)}>
                            <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity style={myStyle.botaoApagar} onPress={() => removeProductFromCart(productObj)}>
                            <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
      </ScrollView>
            <TouchableOpacity style={myStyle.botao}
                onPress={()=> navigation.navigate('Home')} >
                <Text style={myStyle.textoBotao}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                onPress={()=> deleteVerything()}>
                <Text style={myStyle.textoBotao}>Apagar tabelas</Text>
            </TouchableOpacity>
        </View>
    )
}