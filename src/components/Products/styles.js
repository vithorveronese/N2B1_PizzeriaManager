import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    },
    buttom: {
      borderWidth: 2,
      borderRadius: 5,
      width: "25%",
      textAlign: "justify"
    },
    listaUsuarios: {
        width: '98%',
        height: '100%',
        backgroundColor: '#FFF',
        marginTop: 20,        
    },
    cardUser:{
        backgroundColor: "#808080",
        flexDirection: 'row',
        height: 40,
        marginBottom: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    selectedCardUser:{
        backgroundColor: "green",
        flexDirection: 'row',
        height: 40,
        marginBottom: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textoCard:{
        fontWeight: 'bold',
    },
    areaBotoesCard:{    
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        marginRight: 5,
    }
});

export default styles;