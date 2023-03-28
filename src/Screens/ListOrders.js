import {react, useState, useEffect} from 'react' ;
import styles from  './styles';
import myStyles from  '../styles';
import {View, Text, ScrollView, Alert, Keyboard, Image} from 'react-native';
import { TextInput, Button, Card, DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    getAllSales,
  } from '../services/dbservice';

export default function ListOrders({navigation}){  
    const [salesList, setSalesList] = useState([]);

    const [sortAscending, setSortAscending] = useState(true);
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 20, 200]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const sortedItems = salesList
        .slice()
        .sort((item1, item2) =>
        (sortAscending ? item1.id < item2.id : item2.id < item1.id)
            ? 1
            : -1
        );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, salesList.length);

    useEffect(() => {
        getSalesList();
    }, [])

    async function getSalesList() {
        try {
            const resSalesList = await getAllSales();
            setSalesList(resSalesList);
        } catch (e) {
            Alert.alert(e);
        }
        Keyboard.dismiss();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../../assets/background.jpg')} style={myStyles.imgBg}/>
            <View>
                <View style={myStyles.row}>
                    <Text style={{ backgroundColor: '#fff', fontSize: 24, fontWeight: 'bold' }}>Lista de Vendas</Text>
                </View>
            </View>

            <Card style={{ margin: 10 }}>
                <DataTable>
                <DataTable.Header>
                    <DataTable.Title
                        sortDirection={sortAscending ? 'ascending' : 'descending'}
                        onPress={() => setSortAscending(!sortAscending)}
                        >
                    Id
                    </DataTable.Title>
                    <DataTable.Title>Valor</DataTable.Title>
                    <DataTable.Title style={styles.first}>Produtos</DataTable.Title>
                    <DataTable.Title>Data</DataTable.Title>
                </DataTable.Header>

                {sortedItems.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell>{item.value}</DataTable.Cell>
                        <View style={{ justifyContent: 'center', maxWidth: '55%' }}><Text>{item.products}</Text></View>
                        <View style={{ justifyContent: 'center', maxWidth: '35%' }}><Text>{item.date}</Text></View>
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