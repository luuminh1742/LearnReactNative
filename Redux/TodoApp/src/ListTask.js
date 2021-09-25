import React from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

export default function ListTask(props) {


    let DATA = props.data;

    const pressDone = () => {
        
    }

    const pressDelete = () => {

    }

    const renderItemTodo = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#fff', margin: 10, padding: 10 }}>
                <Text style={{ marginVertical: 10 }}>#{item.id} : {item.task}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button
                        title='Done'
                        onPress={pressDone}
                    />
                    <Button
                        title='Delete'
                        onPress={pressDelete}
                    />


                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={DATA}
                renderItem={renderItemTodo}
            />
        </View>
    );
}

