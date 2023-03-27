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
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../assets/background.jpg')} style={styles.imgBg}/>
            <View style={styles.row}>
                <Avatar.Image
                    source={require('../../assets/logopizza.png')}
                    size={120}
                />
            </View>

            <View style={styles.row}>
                <Button icon="cart-minus" mode="contained" onPress={()=> navigation.navigate('Orders')}>
                    Ir as compras
                </Button>
            </View>
            <View style={styles.row}>
                <Button icon="account-cog" mode="contained" onPress={()=> navigation.navigate('Admin')}>
                    Administração
                </Button>
            </View>
       </ScrollView>
    )
}
