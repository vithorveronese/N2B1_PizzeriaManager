import { react, useState } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Home({navigation}) {

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

            {/* <TouchableOpacity style={styles.botao}
                onPress={()=> navigation.navigate('Tela3', {corFundoTela:"#f58c9f"})}   >
                <Text style={styles.textoBotao}>Tabuada do 3</Text>
            </TouchableOpacity> */}
        </View>
    )
}