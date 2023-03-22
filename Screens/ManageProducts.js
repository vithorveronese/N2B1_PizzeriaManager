import {react, useState, useEffect} from 'react' ;
import styles from  './styles';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';

import {
    createTable,
    deleteRecordDB,
    getProduct,
    insertRecord,
    updateRecord,
  } from '../services/dbservice';

export default function Products({navigation}){    
    let myStyle = styles(navigation.state.params);
    let createdTable = false;
    
    const [id, setId] = useState();
    const [productCode, setProductCode] = useState('');  
    const [descripton, setDescription] = useState('');  
    const [unitPrice, setUnitPrice] = useState('');

    async function processingUseEffect() {
        if (!createdTable) {
          tabelasCriadas = true;
          let query = `CREATE TABLE IF NOT EXISTS tbProducts
            (
              Id text not null primary key,
              ProductCode text not null,
              Description text not null,
              UnitPrice text not null          
            )`;
          await createTable(query);
        }
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    useEffect(
        () => {
            processingUseEffect();
        }, []
    );

    async function saveInfo() {
        let newRecord = id == undefined;
        let query = '';
        let fieldsList = [];
  
        let product = {
            id: newRecord ? createUniqueId() : id,
            ProductCode: productCode,
            Description: descripton,
            UnitPrice: unitPrice
        };

        try {
            if (newRecord) {
                fieldsList = [product.id, product.ProductCode, product.Description, product.UnitPrice]
                query = 'INSERT INTO tbProducts (Id, ProductCode, Description, UnitPrice) values (?,?,?,?)';            
                await insertRecord(fieldsList, query);
            }
            else {
                fieldsList = [product.Description, product.UnitPrice, product.id]
                query = 'UPDATE tbProducts set Description=?, UnitPrice=? WHERE id=?';
                await updateRecord(fieldsList, query);
            }
            Alert.alert("Salvo com sucesso!!!");
        }
        catch (e) {
            Alert.alert(e);
        }
    }

    async function loadRecord() {
        console.log('test1')
        if (productCode.length != 0) {
            console.log('test2')
            try {
                console.log('test3')
                let product = await getProduct(productCode);
                console.log('test4')
                setId(product.Id);
                setProductCode(product.ProductCode);
                setDescription(product.Description);
                setUnitPrice(product.UnitPrice);
            }
            catch (e) {
                Alert.alert(e);
            }
        }
        else Alert.alert('Insira o código do produto para buscá-lo');
    }

    function deleteProduct() {
        if (id.length != 0) {
            Alert.alert('Atenção', 'Confirma a remoção do produto?',
            [
                {
                  text: 'Sim',
                  onPress: () => reallyDeleteProduct(),
                },
                {
                  text: 'Não',
                  style: 'cancel',
                }
            ]);
        }
        else Alert.alert('Apenas é possível excluir um produto já inserido')
    }

    async function reallyDeleteProduct() {
        try {
            let query = 'delete from tbProducts where id=?';
            await deleteRecordDB(query, [Id]);
        }
        catch (e) {
            Alert.alert(e);
        }

    }

    return (
        <View style={myStyle.container}>
            <Text>Código do produto</Text>
            <TextInput 
                keyboardType="number-pad"
                onChangeText={(text) => setProductCode(text)}
                value={productCode}
                style={myStyle.textInput}>
            </TextInput>
            <Text>Descrição</Text>
            <TextInput 
                value={descripton}
                onChangeText={(text) => setDescription(text)}
                style={myStyle.textInput}>
            </TextInput>
            <Text>Preço unitário</Text>
            <TextInput 
                keyboardType="number-pad"
                onChangeText={(text) => setUnitPrice(text)}
                value={unitPrice} 
                style={myStyle.textInput}>
            </TextInput>
            <View style={myStyle.passwordContainer}>
                <TouchableOpacity style={myStyle.buttom} onPress={() => saveInfo()}><Text>Salvar</Text></TouchableOpacity>
                <TouchableOpacity style={myStyle.buttom} onPress={() => loadRecord()}><Text>Carregar</Text></TouchableOpacity>
                <TouchableOpacity style={myStyle.buttom} onPress={() => deleteProduct()}><Text>Apagar</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={myStyle.botao}
                onPress={()=> navigation.navigate('Home',{corFundoTela:"#73facb"})} >
                <Text style={myStyle.textoBotao}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}