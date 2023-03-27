import {react, useState, useEffect} from 'react' ;
import {View, Text, ScrollView, Alert, Keyboard, Image} from 'react-native';
import { TextInput, Button, Card, DataTable } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from  './styles';
import myStyles from  '../styles';

import {
    deleteRecordDB,
    getCategories,
    getProducts,
    insertRecord,
    updateRecord,
  } from '../services/dbservice';

export default function Products({navigation}){  
    const [id, setId] = useState();
    const [productName, setProductName] = useState(''); 
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategoryId, setProductCategoryId] = useState('');
    const [productList, setProductList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [writeMode, setWriteMode] = useState(true);
    const [showDropDown, setShowDropDown] = useState(false);

    const [sortAscending, setSortAscending] = useState(true);
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 20, 200]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const sortedItems = productList
        .slice()
        .sort((item1, item2) =>
        (sortAscending ? item1.id < item2.id : item2.id < item1.id)
            ? 1
            : -1
        );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, productList.length);

    useEffect(() => {
        getProductsList();
        cleanScreen();
    }, [])

    function cleanScreen() {
        setId(undefined);
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategoryId('');
        setWriteMode(false);
    }

    async function saveInfo() {
        if( !productName || !productDescription || !productPrice || !productCategoryId ){
            Alert.alert("Todos os campos são obrigatorios!!!");
        } else {
            try {
                if (!id) {
                    fieldsList = [productName, productDescription, productPrice, productCategoryId];
                    query = 'INSERT INTO products (name, description, price, category_id) values (?, ?, ?, ?)';            
                    await insertRecord(fieldsList, query);
                } else {
                    fieldsList = [productName, productDescription, productPrice, productCategoryId, id]
                    query = 'UPDATE products set name=?, description=?, price=?, category_id=? WHERE id=?';
                    await updateRecord(fieldsList, query);
                }
                cleanScreen();
                Alert.alert("Salvo com sucesso!!!");
            }
            catch (e) {
                Alert.alert(e);
            }
            Keyboard.dismiss();
            getProductsList();
        }
    }

    async function prepareUpdate(item) {
        setId(item.id);
        setProductName(item.name);
        setProductDescription(item.description);
        setProductPrice(String(item.price));
        setProductCategoryId(item.categoryId);
        setWriteMode(true);
    }

    async function getProductsList() {
        try {
            const products = await getProducts();
            setProductList(products);
    
            const categories = await getCategories();
            const categoriesDropDown = [];
            categories.forEach(function (item, indice) {
                categoriesDropDown.push({ label: item.name, value: item.id });
            });
            setCategoriesList(categoriesDropDown);
        } catch (e) {
            Alert.alert(e);
        }
        Keyboard.dismiss();
    }

    async function reallyDeleteProduct(id) {
        try {
            let query = 'delete from products where id=?';
            await deleteRecordDB(query, id);
            cleanScreen();
        } catch (e) {
            Alert.alert(e);
        }
        getProductsList();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../assets/background.jpg')} style={myStyles.imgBg}/>
            { writeMode ? (
                <View>
                    <View style={myStyles.row}>
                        <Text style={{ backgroundColor: '#fff', fontSize: 24, fontWeight: 'bold' }}>Preencha os campos</Text>
                    </View>
                    <View style={myStyles.row}>
                        <View style={styles.inputContainerStyle}>
                            <TextInput
                                label={
                                    <Text>
                                        <Text style={{ color: 'red' }}>
                                            *
                                        </Text>{' '}
                                        Nome do produto
                                    </Text>
                                }
                                style={styles.noPaddingInput}
                                placeholder="Digite o nome, obrigatorio"
                                value={productName}
                                error={!productName}
                                onChangeText={(productName) => setProductName(productName)}
                            />
                        </View>
                    </View>
                    <View style={myStyles.row}>
                        <View style={styles.inputContainerStyle}>
                            <TextInput
                                label={
                                    <Text>
                                        <Text style={{ color: 'red' }}>
                                            *
                                        </Text>{' '}
                                        Descrição do produto
                                    </Text>
                                }
                                style={styles.noPaddingInput}
                                placeholder="Digite a descrição, obrigatorio"
                                value={productDescription}
                                error={!productDescription}
                                onChangeText={(productDescription) => setProductDescription(productDescription)}
                            />
                        </View>
                    </View>
                    <View style={myStyles.row}>
                        <View style={styles.inputContainerStyle}>
                            <TextInput
                                label={
                                    <Text>
                                        <Text style={{ color: 'red' }}>
                                            *
                                        </Text>{' '}
                                        Preço do produto
                                    </Text>
                                }
                                style={styles.noPaddingInput}
                                keyboardType="numeric"
                                placeholder="Digite o preço, obrigatorio"
                                value={productPrice}
                                error={!productPrice}
                                onChangeText={(productPrice) => setProductPrice(productPrice)}
                            />
                        </View>
                    </View>
                    <View style={myStyles.row}>
                        <View style={{ width: '80%' }}>
                            <DropDown
                                label={"* Categorias"}
                                mode={"outlined"}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                value={productCategoryId}
                                setValue={setProductCategoryId}
                                list={categoriesList}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Button icon="content-save-all-outline" mode="contained" onPress={()=> saveInfo()}>
                            Salvar
                        </Button>
                    </View>
                </View>
            ) : (
                <View>
                    <View style={myStyles.row}>
                        <Text style={{ backgroundColor: '#fff', fontSize: 24, fontWeight: 'bold' }}>Produtos</Text>
                    </View>
                    <View style={styles.row}>
                        <Button icon="content-save-all-outline" mode="contained" onPress={()=> setWriteMode(true)}>
                            Adicionar novo
                        </Button>
                    </View>
                </View>
            ) }

            <Card style={{ margin: 10 }}>
                <DataTable>
                <DataTable.Header>
                    <DataTable.Title
                        sortDirection={sortAscending ? 'ascending' : 'descending'}
                        onPress={() => setSortAscending(!sortAscending)}
                        >
                    Id
                    </DataTable.Title>
                    <DataTable.Title style={styles.first}>Nome</DataTable.Title>
                    <DataTable.Title>Descrição</DataTable.Title>
                    <DataTable.Title>Preço</DataTable.Title>
                    <DataTable.Title>Id Categoria</DataTable.Title>
                    <DataTable.Title>Editar</DataTable.Title>
                    <DataTable.Title>Excluir</DataTable.Title>
                </DataTable.Header>

                {sortedItems.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell style={styles.first}>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.description}</DataTable.Cell>
                        <DataTable.Cell>{item.price}</DataTable.Cell>
                        <DataTable.Cell>{item.categoryId}</DataTable.Cell>
                        <DataTable.Cell onPress={()=> prepareUpdate(item)}>
                            <Icon name="pencil" size={18} color="#000" />
                        </DataTable.Cell>
                        <DataTable.Cell onPress={()=> reallyDeleteProduct(item.id)}>
                            <Icon name="trash" size={18} color="#000" />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${sortedItems.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Resultados p/ pag.'}
                />
                </DataTable>
            </Card>

            <View style={styles.row}>
                <Button icon="backspace-outline" mode="contained" onPress={()=> navigation.navigate('Admin')}>
                    Voltar
                </Button>
            </View>
        </ScrollView>
    )
}