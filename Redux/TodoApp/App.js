import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import ListTask from './src/ListTask';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// state : Luu tru tat ca cac bien trong ung dung

let appState = { number: 1, histories: [1], error: '' }


// action : Su kien do nguoi dung tuong tac voi ui tao ra

const add = {
  type: 'ADD',
  value: 1
}

const sub = {
  type: 'SUB',
  value: 1
}

// reducer : tong hop dua tren state va action de xu ly
// logic chinh

const numberReducer = (state = appState, action) => {
  switch (action.type) {
    case 'ADD':
      /** immutable state */
      const newValueADD = state.number + action.value;
      state = {
        ...state,
        histories: [...state.histories, newValueADD],
        number: newValueADD
      }

      /* mutable state */
      //state.number += action.value;
      break;
    case 'SUB':
      const newValueSUB = state.number - action.value;
      state = {
        ...state,
        histories: [...state.histories, newValueSUB],
        number: newValueSUB
      }
      //state.number -= action.value;
      break;
  }
  return state;
}

const errorReducer = (state = appState, action) => {
  switch (action.type) {
    case 'LESS_THAN_ZERO':
      state = {
        ...state,
        error: 'number can\'t be less than zero'
      }
      break;
  }

  return state;
}
// middleware (kiem tra action co duoc chay jay khong)

const logger = store => next => action => {
  console.log('State', store.getState())
  next(action)
  console.log('State updated', store.getState())
}
const checkIsZero = store => next => action => {
  const currentNumber = store.getState().number.number;
  if (currentNumber === 0) {
    next({ type: 'LESS_THAN_ZERO' })
  } else {
    next(action)
  }
  console.log('Current number ', currentNumber);
}

// store : mot diem duy nhat trong ung dung (quan ly cac bien cua tat ca cac component trong ung dung)
const reducers = combineReducers({ number: numberReducer, err: errorReducer });
const store = createStore(reducers, applyMiddleware(thunk, logger, checkIsZero));

// Test

const addAfter3s = () => {
  return dispatch => {
    setInterval(() => {
      dispatch(add);
    }, 3000);
  }
}

store.dispatch(addAfter3s());

// store.subscribe(() => {
//   console.log('State updated', store.getState())
// })
// 
// store.dispatch(add);
// store.dispatch(sub);
// store.dispatch(sub);
// store.dispatch(sub);



//store.dispatch({ type: 'LESS_THAN_ZERO' });
//


export default function App() {

  const [task, setTask] = useState('');

  const [DATA, setDATA] = useState([
    {
      id: 1,
      task: 'task1',
      done: false
    },
    {
      id: 2,
      task: 'task2',
      done: false
    },
    {
      id: 3,
      task: 'task3',
      done: false
    },
    {
      id: 4,
      task: 'task4',
      done: false
    },
  ]);

  const pressAddTask = () => {

    if (task !== '') {
      let id = DATA.length + 1;
      let dataTmp = [...DATA, { id: id, task: task, done: false }]
      setDATA(dataTmp);
      setTask('');
    }

  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', padding: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>To Do App</Text>
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ddd', width: '90%', paddingHorizontal: 15 }}
            onChangeText={value => setTask(value)}
            value={task}
          />
          <Button
            title='Add'
            style={{ width: '10%' }}
            onPress={pressAddTask}
          />
        </View>
      </View>
      <ListTask
        data={DATA}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddd',
  },
});
