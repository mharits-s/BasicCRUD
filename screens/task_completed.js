import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

const TaskCompletedScreen = () => {
    const [tasks, setTasks] = useState([]);

    const getStorageData = async () => {
        const value = await AsyncStorage.getItem('@task-list');
        if (value !== null) {
            const allData = JSON.parse(value);
            return allData;
        } else {
            return [];
        }
    }

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
        var tempIndex = allList.findIndex(el => el.title == item.title);
        allList[tempIndex].isCompleted = !allList[tempIndex].isCompleted;
        try {
            AsyncStorage.setItem('@task-list', JSON.stringify(allList));
            getTaskList();
        } catch (e) {
            console.log('Error update status task: in task-completed.js');
            console.error(e.message);
        }
    };

    const getTaskList = async () => {
        try {
            const allData = await getStorageData();
            console.log(allData);
            if (allData !== 0) {
                const completedData = allData.filter((item) => item.isCompleted);
                setTasks(completedData);
            } else {
                console.log('No tasks');
            }
        } catch (e) {
            console.log('Error get task: in task-completed.js');
            console.error(e);
        }
    };

    useEffect(() => {
        getTaskList();
    }, []);

    const renderItem = ({ item, index }) => (
        <View style={styles.task}>
            <Text
                style={styles.itemList}>{item.title}</Text>
            <View
                style={styles.taskButtons}>
                <TouchableOpacity onPress={() => handleDeleteTask(item, index)} style={styles.buttons}>
                <FontAwesome5 name="trash" size={24} color="#ED1B24" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleStatusChange(item, index)} style={styles.buttons}>
                <FontAwesome5 name="undo" size={24} color="#FB8500" />
                </TouchableOpacity>
            </View>
            <View style={styles.itemBorder}></View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Completed Task</Text>
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

export default TaskCompletedScreen;