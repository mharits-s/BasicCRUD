import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const About = () => {

    const handleClearData = async () => {
        Alert.alert(
            "Clear Data",
            "Are you sure you want to clear all data?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            console.log('Data Cleared');
                        } catch (e) {
                            console.log('Error clear data: in about.js');
                            console.error(e);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>About This Application</Text>
            <Text style={styles.content}>Aplikasi ini dirancang sebagai studi kasus untuk pembelajaran mata kuliah Pemrograman Mobile Program Studi Informatika Institut Teknologi Telkom Surabaya</Text>
            <Text style={{ marginBottom: 5 }} onPress={() =>
                Linking.openURL("https://www.freepik.com/icon/task-list_9329651#fromView=search&term=todo+list&page=1&position=1&track=ais").catch((err) => console.error("Error", err))
            }>Icon by Azland Studio (Freepik)</Text>
            <Text style={{ marginBottom: 5 }} onPress={() =>
                Linking.openURL("https://daudmuhajir.my.id").catch((err) => console.error("Error", err))
            }>Developed by Daud Muhajir</Text>
            <Text style={{ marginBottom: 15 }}>Explored by Muhammad Harits</Text>

            <TouchableOpacity
            style={styles.button}
            onPress={() => handleClearData()}
            >
            <Text style={styles.text}>
                Clear Data
            </Text>
            </TouchableOpacity>

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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 12,
        color: "#131313",
    },
    content: {
        fontSize: 18,
        marginBottom: 20,
    },
    text:{
        color: "white", 
        textAlign: "center", 
        fontSize: 18, 
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#ED1B24", 
        marginTop: "auto", 
        marginBottom: 15, 
        padding: 10, 
        borderRadius: 5
    }
});

export default About;
