import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create(
    {
        container:{            
            marginTop: StatusBar.currentHeight,
            backgroundColor: "#FFF",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imgBg: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
        },
        row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8,
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
