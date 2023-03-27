import { View, Image, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import styles from '../styles';

export default function Admin({navigation}) {

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
                <Button icon="ab-testing" mode="contained" onPress={()=> navigation.navigate('Categories')}>
                    Gerenciar categorias
                </Button>
            </View>
            <View style={styles.row}>
                <Button icon="sale" mode="contained" onPress={()=> navigation.navigate('Products')}>
                    Gerenciar produtos
                </Button>
            </View>
            <View style={styles.row}>
                <Button icon="history" mode="contained" onPress={()=> navigation.navigate('ListOrders')}>
                    Histórico de compras
                </Button>
            </View>
            <View style={styles.row}>
                <Button icon="backspace-outline" mode="contained" onPress={()=> navigation.navigate('Home')}>
                    Voltar
                </Button>
            </View>
       </ScrollView>
    )
}
