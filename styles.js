import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create(
    {
        container:{            
            marginTop: StatusBar.currentHeight,
            flex:1,
            backgroundColor: "#FFF",
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titulo:{
            fontSize: 40,
            color: 'blue',
            fontWeight: 'bold',
            textDecorationLine: 'underline',            
            marginBottom: 30,
            textAlign: 'center',
        },
        botao:{
            height: 60,
            width: '70%',
            backgroundColor: '#173d9c',
            borderRadius: 30,            
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        textoBotao:{
            fontSize: 18,
            color: "#FFF",
        },        
    }
);

export default styles;