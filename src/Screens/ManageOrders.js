import {react, useState, useEffect} from 'react' ;
import {View, Text, ScrollView, Alert, Keyboard, Image} from 'react-native';
import { Checkbox, Button, Card, DataTable } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from  './styles';
import myStyles from  '../styles';

import {
    getCategories,
    getProducts,
    insertRecord,
    getLastIdInsert,
  } from '../services/dbservice';

export default function Orders({navigation}){  
    const [totalSale, setTotalSale] = useState(0.00);
    const [productsSale, setProductsSale] = useState([]);
    const [updateChecks, setUpdateChecks] = useState(true);

    const [productList, setProductList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [productCategoryId, setProductCategoryId] = useState('');

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
    }, []);

    useEffect(() => {
        getProductsList();
    }, [productCategoryId]);

    function cleanScreen() {
        setTotalSale(0.00);
        setProductsSale([]);
        setUpdateChecks(true);
        setProductCategoryId('');
    }

    async function saveInfo() {
        if( productsSale.length < 1 ){
            Alert.alert("Selecione pelo menos 1 produto!!!");
        } else {
            try {
                const date = new Date()
                const onlyTime = date.toLocaleTimeString();
                const fullDate = date.toLocaleDateString();
                fieldsList = [`${onlyTime} ${fullDate}`, totalSale];
                query = 'INSERT INTO sales (date, value) values (?,?)';
                const lastId = await insertRecord(fieldsList, query);

                productsSale.forEach(function (item, indice) {
                    query = 'INSERT INTO sales_product (sale_id, product_id) values (?,?)';
                    insertRecord([lastId, item], query);
                });

                cleanScreen();
                Alert.alert(`Pedido realizado com sucesso #${lastId}!!!`);
            }
            catch (e) {
                Alert.alert(e);
            }
            Keyboard.dismiss();
            getProductsList();
        }
    }

    async function getProductsList() {
        try {
            const products = await getProducts(productCategoryId);
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

    function getCategoryById (id) {
        const findCat = categoriesList.find((x, i) => x.value == id);
        return findCat?.label || '';
    }

    function getProductSaleById (id) {
        const findCat = productsSale.find((x, i) => x == id);
        return findCat;
    }

    function updateTotalPrice (oldProductsSale) {
        let oldTotalPrice = 0;
        oldProductsSale.forEach(function (item, indice) {
            const product = productList.find((x, i) => x.id == item);
            oldTotalPrice = oldTotalPrice + product.price;
        });
        setTotalSale(oldTotalPrice.toFixed(2));
    }

    async function productItemToSale (id) {
        setUpdateChecks(false);
        const oldProductsSale = productsSale;
        const findCat = await oldProductsSale.find((x, i) => x == id);

        if( findCat ) {
            const index = oldProductsSale.indexOf(id);
            oldProductsSale.splice(index, 1);
        } else {
            oldProductsSale.push(id);
        }

        updateTotalPrice(oldProductsSale);
        setProductsSale(oldProductsSale);
        setUpdateChecks(true);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../assets/background.jpg')} style={myStyles.imgBg}/>
            <View>
                <View style={myStyles.row}>
                    <Text style={{ backgroundColor: '#fff', fontSize: 24, fontWeight: 'bold' }}>Total do Pedido: R$ {totalSale}</Text>
                </View>
                <View style={styles.row}>
                    <Button icon="account-cash" mode="contained" onPress={()=> saveInfo()}>
                        Finalizar Compra
                    </Button>
                </View>
                <View style={myStyles.row}>
                    <View style={{ width: '55%' }}>
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
                    <View style={{ width: '40%' }}>
                        <Button mode="outlined" onPress={()=> setProductCategoryId('')} style={{ backgroundColor: '#efefef' }}>
                            limpar filtro
                        </Button>
                    </View>
                </View>
            </View>

            <Card style={{ margin: 10 }}>
                <DataTable>
                <DataTable.Header>
                    <DataTable.Title></DataTable.Title>
                    <DataTable.Title style={styles.first}>Nome</DataTable.Title>
                    <DataTable.Title>Descrição</DataTable.Title>
                    <DataTable.Title>Preço</DataTable.Title>
                    <DataTable.Title>Categoria</DataTable.Title>
                </DataTable.Header>

                {sortedItems.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>
                            <Checkbox
                                status={ updateChecks && getProductSaleById(item.id) ? 'checked' : 'unchecked'}
                                onPress={() => productItemToSale(item.id)}
                            />
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.first}>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.description}</DataTable.Cell>
                        <DataTable.Cell>{item.price}</DataTable.Cell>
                        <DataTable.Cell>{getCategoryById(item.categoryId)}</DataTable.Cell>
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
                <Button icon="backspace-outline" mode="contained" onPress={()=> navigation.navigate('Home')}>
                    Voltar
                </Button>
            </View>
        </ScrollView>
    )
}