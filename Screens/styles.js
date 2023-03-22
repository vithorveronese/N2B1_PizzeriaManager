import {StyleSheet, StatusBar} from 'react-native';

const styles = (props) => StyleSheet.create(
    {
        container:{            
            marginTop: StatusBar.currentHeight,
            flex:1,
            backgroundColor: props.corFundoTela,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titulo:{
            fontSize: 40,
            color: 'blue',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            marginBottom: 20,
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
        resultado:{
            fontSize: 28,
            color: "#000",
            textAlign: 'center',
        },
        validationText: {
          marginBottom: 20,
          fontSize: 12,
          color: "red",
          fontWeight: "bold",
        },
        textInput: {
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 5,
          width: "40%",
          height: 30,
          textAlign: "center",
        },
        passwordContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: "2%",
          width: "70%",
        },
        passwordInput: {
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 5,
          width: "40%",
          height: 35,
          textAlign: "center",
        },
        buttom: {
          borderWidth: 2,
          borderRadius: 5,
          width: "25%",
          textAlign: "center",
        },
    }
);

export default styles;