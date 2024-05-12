import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState();
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [changeTodo, setChangeTodo] = useState();

  const addTodo = () => {
    setTodoList([...todoList, input]);
  };

  const deleteTodo = index => {
    const newTodoList = [
      ...todoList.slice(0, index),
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
  };

  const updateTodo = () => {
    const newtodoList = [...todoList];
    newtodoList[editTodo.index] = changeTodo;
    setTodoList(newtodoList);
    setEdit(false);
  };

  const deleteAll = () => {
    setTodoList([]);
  };

  return (
    <View style={style.container}>
      <View style={style.input}>
        {edit ? (
          <TextInput
            placeholder="Edit Your Todo"
            onChangeText={text => setChangeTodo(text)}
            onSubmitEditing={() => updateTodo()}
          />
        ) : (
          <TextInput
            placeholder="Enter Your ToDo here"
            onChangeText={text => setInput(text)}
            onSubmitEditing={() => addTodo()}
          />
        )}
        <TouchableOpacity onPress={() => deleteAll()}>
          <Text
            style={{
              borderRadius: 10,
              backgroundColor: '#6495ed',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            Delete All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={style.todoContainer}>
        {todoList.map((todo, index) => {
          return (
            <View key={index} style={style.todo}>
              <Text style={{fontSize: 18}}>{todo}</Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    setEditTodo({todo: todo, index: index});
                    setEdit(true);
                  }}>
                  <Text
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#6495ed',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <Text
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#6495ed',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default App;
