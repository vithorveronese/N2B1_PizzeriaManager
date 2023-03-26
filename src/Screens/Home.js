import { react, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

import { createCategoriesTable, createProductsTable, createSalesTable, createSalesProductTable } from '../services/createTable';

export default function Home({navigation}) {

    const verifyCreateTables = async () => {
        await createCategoriesTable();
        await createProductsTable();
        await createSalesTable();
        await createSalesProductTable();
    }

    useEffect(() => {
        verifyCreateTables();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tela Inicial  Navegação entre Telas</Text>
            <TouchableOpacity style={styles.botao}  
                onPress={()=> navigation.navigate('Products',{corFundoTela:"#73facb"})}   >
                <Text style={styles.textoBotao}>Gerenciar produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={()=> navigation.navigate('Orders', {corFundoTela:"#f2c64e"})}   >
                <Text style={styles.textoBotao}>Comércio de produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={()=> navigation.navigate('ListOrders', {corFundoTela:"#f58c9f"})}   >
                <Text style={styles.textoBotao}>Histórico de compras</Text>
            </TouchableOpacity>
        </View>
    )
}