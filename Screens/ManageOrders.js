import {react, useState} from 'react' ;
import styles from  './styles';
import {View, Text, TouchableOpacity} from 'react-native';
//import {tabuada} from './calculos';

export default function Orders({navigation}){    
    let myStyle = styles(navigation.state.params);
    
    const [resultado, setResultado] = useState('');    

    return (
        <View style={myStyle.container}>
            <Text style={myStyle.titulo}>Tela 1</Text>
            {/* <TouchableOpacity style={myStyle.botao}
                    onPress={()=> setResultado(tabuada(1)) } >
                <Text style={myStyle.textoBotao}>Exibir tabuada do 1</Text>
            </TouchableOpacity>
            <Text style={myStyle.resultado} >{resultado}</Text>
            
            
            {resultado.length > 0 &&
            <TouchableOpacity style={myStyle.botao}
                    onPress={()=> navigation.navigate('Home')  } >
                <Text style={myStyle.textoBotao}>Voltar</Text>
            </TouchableOpacity>
            }            */}
            <TouchableOpacity style={myStyle.botao}
                onPress={()=> navigation.navigate('Home',{corFundoTela:"#73facb"})} >
                <Text style={myStyle.textoBotao}>Voltar</Text>
            </TouchableOpacity>
            

        </View>
    )
}