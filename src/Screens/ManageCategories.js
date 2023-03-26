import {react, useState, useEffect} from 'react' ;
import styles from  './styles';
import {View, Text, TouchableOpacity, TextInput, Alert, Keyboard} from 'react-native';

import {
    createTable,
    deleteRecordDB,
    getProduct,
    insertRecord,
    updateRecord,
  } from '../services/dbservice';

export default function Categories({navigation}){    
    let myStyle = styles(navigation.state.params);
    let createdTable = false;
    
    const [id, setId] = useState();
    const [categoryCode, setCategoryCode] = useState('');  
    const [categoryName, setCategoryName] = useState('');  

    async function processingUseEffect() {
        if (!createdTable) {
          tabelasCriadas = true;
          let query = `CREATE TABLE IF NOT EXISTS tbCategories
            (
              Id text not null,
              CategoryCode text not null primary key,
              CategoryName text not null
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

    function cleanScreen() {
        setId(undefined);
        setCategoryCode('');
        setCategoryName('');
    }

    async function saveInfo() {
        let newRecord = id == undefined;
        let query = '';
        let fieldsList = [];
  
        let category = {
            Id: newRecord ? createUniqueId() : id,
            CategoryCode: categoryCode,
            CategoryName: categoryName,
        };

        try {
            if (newRecord) {
                fieldsList = [category.Id, category.ProductCode, category.Description];
                query = 'INSERT INTO tbCategories (Id, CategoryCode, CategoryName) values (?, ?,?)';            
                await insertRecord(fieldsList, query);
            }
            else {
                fieldsList = [product.Description, product.UnitPrice, product.ProductCode]
                query = 'UPDATE tbCategories set Description=? WHERE ProductCode=?';
                await updateRecord(fieldsList, query);
            }
            cleanScreen();
            Alert.alert("Salvo com sucesso!!!");
        }
        catch (e) {
            Alert.alert(e);
        }
    }

    async function loadRecord() {
        if (productCode.length != 0) {
            try {
                let product = await getProduct(productCode);
                if (product.length > 0) {
                    setId(product[0].Id);
                    setDescription(product[0].Description);
                    setUnitPrice(product[0].UnitPrice);
                }
                else Alert.alert('Produto não encontrado!');
            }
            catch (e) {
                Alert.alert(e);
            }
        }
        else Alert.alert('Insira o código do produto para buscá-lo');
        Keyboard.dismiss();
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
            cleanScreen();
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
                <TouchableOpacity style={myStyle.buttom} onPress={() => cleanScreen()}><Text>Novo Produto</Text></TouchableOpacity>
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