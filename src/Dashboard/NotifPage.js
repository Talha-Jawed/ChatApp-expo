import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Button, ActivityIndicator, TouchableWithoutFeedback, Text } from 'react-native';

export default class Home extends React.Component {
click(){
    fetch('https://exp.host/--/api/v2/push/send', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
        to: "ExponentPushToken[H9u4llMu2nrPGtem4hIUI0]", body: "message here"
    })
});

}

    render() {
        return (
            <View>
                {/* <Text>khcjv,bx,j</Text> */}
                <Button
                    title="send"
                    onPress={() => this.click()}
                />
            </View>
        )
    }
}