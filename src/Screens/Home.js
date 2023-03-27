import { react, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
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
        // <ImageBackground source={require('../../assets/background.jpg')} resizeMode="stretch" styles={styles.imgBg}>
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../assets/background.jpg')} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}/>
                <View style={styles.row}>
                    <Avatar.Image
                        source={require('../../assets/logopizza.png')}
                        size={120}
                    />
                </View>

                <View style={styles.row}>
                    <Button icon="cart-minus" mode="contained" onPress={()=> navigation.navigate('Products',{corFundoTela:"#73facb"})}>
                        Gerenciar produtos
                    </Button>
                </View>
                <View style={styles.row}>
                    <Button icon="cart-minus" mode="contained" onPress={()=> navigation.navigate('Orders', {corFundoTela:"#f2c64e"})}>
                        Comércio de produtos
                    </Button>
                </View>
                <View style={styles.row}>
                    <Button icon="cart-minus" mode="contained" onPress={()=> navigation.navigate('ListOrders', {corFundoTela:"#f58c9f"})}>
                        Histórico de compras
                    </Button>
                </View>
       </ScrollView>
            // </ImageBackground>
    )
}
