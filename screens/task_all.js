import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from '@expo/vector-icons';

const TaskScreen = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const getStorageData = async () => {
    const value = await AsyncStorage.getItem("@task-list");
    if (value !== null) {
      const allData = JSON.parse(value);
      return allData;
    } else {
      return [];
    }
  };

  const handleAddTask = async () => {
    if (task === "") {
      Alert.alert("Fill Task Please!");
      return;
    }

    const allList = await getStorageData();
    const foundDuplicateTask = allList.some((el) => el.title === task);
    if (foundDuplicateTask) {
      Alert.alert("Task Already Exist!");
      return;
    }

    try {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].title = task;
        AsyncStorage.setItem("@task-list", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        const tempList = [...tasks, { title: task, isCompleted: false }];
        AsyncStorage.setItem("@task-list", JSON.stringify(tempList));
        setTasks(tempList);
      }
      setTask("");
    } catch (e) {
      console.log("Error add task: in task-all.js");
      console.error(e.message);
    }
  };

  const getTaskList = async () => {
    try {
      const allData = await getStorageData();
      if (allData.length !== 0) {
        const uncompletedData = allData.filter((item) => !item.isCompleted);
        setTasks(uncompletedData);
      } else {
        console.log("No Tasks");
      }
    } catch (e) {
      console.log("Error get task: in task-all.js");
      console.error(e);
    }
  };

  const handleDeleteTask = async (item, index) => {
    Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: async () => {
                    const allList = await getStorageData();
                    const deletedList = allList.filter(
                        (list, listIndex) => list.title !== item.title
                    );
                    try {
                        AsyncStorage.setItem("@task-list", JSON.stringify(deletedList));
                        setTasks(deletedList);
                    } catch (e) {
                        console.log("Error delete task: in task-all.js");
                        console.error(e.message);
                    }
                }
            }
        ]
    );
};


  const handleStatusChange = async (item, index) => {
    const allList = await getStorageData();
    var tempIndex = allList.findIndex((el) => el.title == item.title);
    allList[tempIndex].isCompleted = !allList[tempIndex].isCompleted;
    try {
      AsyncStorage.setItem("@task-list", JSON.stringify(allList));
      getTaskList();
    } catch (e) {
      console.log("Error update status task: in task-all.js");
      console.error(e.message);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.title);
    setEditIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item.title}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)} style={styles.buttons}>
          <FontAwesome5 name="edit" size={24} color="#FB8500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item, index)} style={styles.buttons}>
          <FontAwesome5 name="trash" size={24} color="#ED1B24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusChange(item, index)} style={styles.buttons}>
          <FontAwesome5 name="check" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemBorder}></View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task</Text>
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>
            {editIndex !== -1 ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#131313",
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    width: 80,
    backgroundColor: "#4CAF50",
    paddingTop: 13,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 10,
    marginVertical: 6,
  },
  itemList: {
    fontSize: 19,
    color: "#333333",
  },
  itemBorder: {
    borderWidth: 0.5,
    borderColor: "#cccccc",
  },
  taskButtons: {
    flexDirection: "row",
    position: 'absolute',
    right: 10,
  },
  buttons: {
    marginRight: 10,
  }
});

export default TaskScreen;
