import {Text,TouchableOpacity, View, Image, ScrollView} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import styles from './styles';
import {useState, useEffect} from 'react' ;

export default function Products({productsList, removeFromCart, addToCart}) {
    const [deaultStyle, setDefaultStyle] = useState(styles.cardUser);
    const [clickedIndexes, setClickedIndexes] = useState([]);

    useEffect(
        () => {
            setClickedIndexes(clickedIndexes);
        }, []
    );

    function fun() {

    }

    function handleAddToCart(objId, arrayIndex) {
        //addToCart(objId);
        if (!clickedIndexes.includes(arrayIndex)) {
            console.log('index => ' + arrayIndex);
            let cart = clickedIndexes;
            cart.push(arrayIndex);
            setClickedIndexes(cart);
            
        }
        else setClickedIndexes(clickedIndexes);
        console.log('cart => ' + clickedIndexes)
    }

    return (
        <ScrollView style={[styles.listaUsuarios]}>
            {productsList.map((productObj, index) => (
                <View 
                    style={[styles.cardUser, clickedIndexes.includes(index) && styles.selectedCardUser]} 
                    key={index.toString()}>

                    <Text style={styles.textoCard}>
                        {productObj.ProductCode.padStart(3, "0")}
                    </Text>
                    <Text></Text>
                    <Text style={styles.textoCard}>{productObj.Description}</Text>

                    <View style={styles.areaBotoesCard}>
                        <TouchableOpacity style={styles.botaoEditar} onPress={() => handleAddToCart(productObj.id, index)}>
                            <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                        <Text></Text>
                        <TouchableOpacity style={styles.botaoApagar} onPress={() => removeFromCart(productObj.id)}>
                            <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
      </ScrollView>
    );
};