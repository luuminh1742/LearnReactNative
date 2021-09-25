import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function Header(props) {
    return (
        <View style={{ backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>To Do App</Text>
            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: '#ddd', width: '90%',paddingHorizontal:15 }}
                />
                <Button
                    title='Add'
                    style={{ width: '10%' }}
                    onPress={props.pressAddTask}
                />
            </View>
        </View>
    );
}

