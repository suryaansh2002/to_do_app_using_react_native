import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Icon, CheckBox } from "react-native-elements";
import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const setItemText = (e) => {
    setTodo(e);
  };
  const addItem = () => {
    const newItem = {
      id: uuidv4(),
      text: todo,
      checked: false,
    };
    console.log(todo);
    setTodoList([...todoList, newItem]);
    console.log(todoList);
    setTodo("");
  };
  const changeCheck = (id) => {
    var newTodos = todoList.map((todo) => {
      if (todo.id == id) {
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        };
      } else {
        return todo;
      }
    });

    setTodoList(newTodos);
  };

  const deleteItem = (id) => {
    var newTodos = todoList.filter((todo) => todo.id !== id);
    console.log(todoList);
    setTodoList(newTodos);
    console.log(newTodos);
  };

  var date = new Date().toDateString();
  return (
    <ScrollView style={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.topView}>
        <TextInput
          placeholder="Add Items"
          style={styles.textBox}
          onChangeText={setItemText}
          value={todo}
        />
        <Pressable
          style={styles.addBtn}
          onPress={addItem}
          disabled={todo.length == 0}
        >
          <Text style={styles.addTxt}>+</Text>
        </Pressable>
      </View>
      <View >
        <View>
          <Text style={styles.header}>Today's Tasks</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        </View>
        <View>
          {todoList.length > 0 ? (
           
            <View>
              {todoList.map((todo) => (
                <View key={todo.id} style={styles.item}>
                  <View style={styles.leftBox}>
                    <CheckBox
                      style={styles.itemCheck}
                      checked={todo.checked}
                      onPress={() => changeCheck(todo.id)}
                    />
                    <Text
                      style={todo.checked ? styles.itemText : styles.itemText2}
                    >
                      {todo.text}
                    </Text>
                  </View>
                  <View style={styles.rightBox}>
                    <Icon
                      raised
                      style={styles.deleteIcon}
                      onPress={() => deleteItem(todo.id)}
                      name="delete"
                      color="#941616"
                    />
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noCC}>
              <Text style={styles.noCT}>You have not added any items.</Text>
            </View>
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    backgroundColor: "#dcdcdc",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  date: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  noCC: {
    justifyContent: "center",
    alignItems: "center",
    height:500,
  },
  noCT:{
    fontSize:20,
fontWeight:"bold"
  },
  textBox: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 10,
    width: "80%",
    borderRadius: 20,
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },

  addBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#3c3c3c",
  },
  addTxt: {
    fontSize: 24,
    lineHeight: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  leftBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightBox: {
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 15,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontWeight: "bold",
    color: "#dcdcdc",
  },

  itemText2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
