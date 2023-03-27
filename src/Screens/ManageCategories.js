import {react, useState, useEffect} from 'react' ;
import styles from  './styles';
import myStyles from  '../styles';
import {View, Text, ScrollView, Alert, Keyboard, Image} from 'react-native';
import { TextInput, Button, Card, DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    deleteRecordDB,
    getCategories,
    insertRecord,
    updateRecord,
  } from '../services/dbservice';

export default function Categories({navigation}){  
    const [id, setId] = useState();
    const [categoryName, setCategoryName] = useState(''); 
    const [categoryDescription, setCategoryDescription] = useState('');  
    const [categoriesList, setCategoriesList] = useState([]);
    const [writeMode, setWriteMode] = useState(true);

    const [sortAscending, setSortAscending] = useState(true);
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 20, 200]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const sortedItems = categoriesList
        .slice()
        .sort((item1, item2) =>
        (sortAscending ? item1.id < item2.id : item2.id < item1.id)
            ? 1
            : -1
        );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, categoriesList.length);

    useEffect(() => {
        getCategoriesList();
        cleanScreen();
    }, [])

    function cleanScreen() {
        setId(undefined);
        setCategoryName('');
        setCategoryDescription('');
        setWriteMode(false);
    }

    async function saveInfo() {
        if( !categoryName || !categoryDescription ){
            Alert.alert("Todos os campos são obrigatorios!!!");
        } else {
            try {
                if (!id) {
                    fieldsList = [categoryName, categoryDescription];
                    query = 'INSERT INTO categories (name, description) values (?, ?)';            
                    await insertRecord(fieldsList, query);
                } else {
                    fieldsList = [categoryName, categoryDescription, id]
                    query = 'UPDATE categories set name=?, description=? WHERE id=?';
                    await updateRecord(fieldsList, query);
                }
                cleanScreen();
                Alert.alert("Salvo com sucesso!!!");
            }
            catch (e) {
                Alert.alert(e);
            }
            Keyboard.dismiss();
            getCategoriesList();
        }
    }

    async function prepareUpdate(id, name, description) {
        setId(id);
        setCategoryName(name);
        setCategoryDescription(description);
        setWriteMode(true);
    }

    async function getCategoriesList() {
        try {
            let categories = await getCategories();
            setCategoriesList(categories);
        } catch (e) {
            Alert.alert(e);
        }
        Keyboard.dismiss();
    }

    async function reallyDeleteProduct(id) {
        try {
            let query = 'delete from categories where id=?';
            await deleteRecordDB(query, id);
            cleanScreen();
        } catch (e) {
            Alert.alert(e);
        }
        getCategoriesList();
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
                                        Nome da categoria
                                    </Text>
                                }
                                style={styles.noPaddingInput}
                                placeholder="Digite o nome, obrigatorio"
                                value={categoryName}
                                error={!categoryName}
                                onChangeText={(categoryName) => setCategoryName(categoryName)}
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
                                        Descrição da categoria
                                    </Text>
                                }
                                style={styles.noPaddingInput}
                                placeholder="Digite a descrição, obrigatorio"
                                value={categoryDescription}
                                error={!categoryDescription}
                                onChangeText={(categoryDescription) => setCategoryDescription(categoryDescription)}
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
                        <Text style={{ backgroundColor: '#fff', fontSize: 24, fontWeight: 'bold' }}>Categorias</Text>
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
                    <DataTable.Title>Editar</DataTable.Title>
                    <DataTable.Title>Excluir</DataTable.Title>
                </DataTable.Header>

                {sortedItems.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell style={styles.first}>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.description}</DataTable.Cell>
                        <DataTable.Cell onPress={()=> prepareUpdate(item.id, item.name, item.description)}>
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