import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Button, ActivityIndicator, TextInput, TouchableWithoutFeedback, Text } from 'react-native';
import firebase from '../../Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { Notifications, Permissions } from 'expo'
import { connect } from 'react-redux'
import Expo from 'expo';
import AppHeader from '../Component/Header/Header'
import { ScrollView } from 'react-native-gesture-handler';

async function getToken() {

    // Remote notifications do not work in simulators, only on device
    let { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS,
    );
    if (status !== 'granted') {
        return;
    }
    var value = await Notifications.getExpoPushTokenAsync();
    console.log('CurrentToken**', value);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            firebase.database().ref('UserData/' + uid).update({ expoToken: value })
        }
    })
}

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            left: 0,
            bottom: 220,
            mode: null,
            Name: '',
            profilePic: '',
            loading: false,
            noti: '',
            alluser: null,
            message: ''

        }
    }

    componentWillReceiveProps(props) {
        const { expoToken } = this.state
        const currentUID = props.UID;
        const { alluser } = props;
        this.setState({ alluser })
        // console.log('Alluser', alluser)

        if (props.CurrentUser) {

            // var obj = {
            //     expoToken: expoToken
            // }
            // firebase.database().ref('/UserData/' + currentUID).update(obj);
            this.setState({
                Name: props.CurrentUser.Name,
                profilePic: props.CurrentUser.Photo,
                loading: true
            })
        } else {
        }
    }
    componentDidMount() {
        getToken();

        this.listener = Notifications.addListener(this.handleNotification);
        // const { result } = this.props.navigation.state.params;
        // console.log(result.givenName, 'result heree jhjh')
        if (this.props.navigation.state.params) {
            const { user } = this.props.navigation.state.params
            this.setState({ Name: user.name, profilePic: user.photoUrl, loading: true })
        }
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    handleNotification = ({ origin, data }) => {
        console.log(
            `Push notification ${origin} with data: ${(data)}`,
        );
        console.log('orign', origin, 'datad', data);
        // var obj = JSON.parse(data)
        var as = data
        console.log('*****', as);
        this.setState({ noti: as })
    };
    page(token) {
        const { alluser } = this.props;
        const { message } = this.state;
        // if (alluser && alluser.length) {
        //     alluser.map(item => {
        // if (item.UID === "VEDhwqpK6NcSOrCPibBXz5Enzw52") {
        console.log('notification', token);
        // var token = "EAAEXkrox6lwBAJOGweQEIlZCVCZAcyhy03RzV1qnZBlCaCJbTlu0vra58DbZCBd4aTfGLmsOiDzSLi2SslVh9bVab4bS2NRsEcO5pDGuaFg12QhCFaiywKxtUuGiayMrIK67qfExqcYCg7S7vIDDC00t5kIXGIo1UR61jolzZBPPk8HZBeoWzXWHC4NmAjAEBGxx0QXDZCYlkQJ7NY9g9mILNZCTvHng3p1WrTebtKHYfwZDZD";

        // this.props.navigation.navigate('Page')
        fetch('https://exp.host/--/api/v2/push/send', {
            mode: 'no-cors',
            method: 'POST',
            title: 'user',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                to: token,
                body: message,

                // to: "ExponentPushToken[EAAEXkrox6lwBAJOGweQEIlZCVCZAcyhy03RzV1qnZBlCaCJbTlu0vra58DbZCBd4aTfGLmsOiDzSLi2SslVh9bVab4bS2NRsEcO5pDGuaFg12QhCFaiywKxtUuGiayMrIK67qfExqcYCg7S7vIDDC00t5kIXGIo1UR61jolzZBPPk8HZBeoWzXWHC4NmAjAEBGxx0QXDZCYlkQJ7NY9g9mILNZCTvHng3p1WrTebtKHYfwZDZD]",
            })
        });
        // }
        // })
        // }

    }


    static navigationOptions = { header: null }

    render() {
        const { mode, Name, profilePic, loading, noti, result, expoToken, message, alluser } = this.state;
        return (
            <View>
                <AppHeader LogOut={this.props.navigation} />
                <ScrollView>

                    <View style={styles.container}>
                        {loading ?

                            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                <Image style={styles.text} source={{ uri: profilePic }} />
                                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 30 }}>{'Name:' + Name}</Text>
                                <Text style={{ marginTop: 30, fontSize: 24, fontWeight: 'bold', marginTop: 30 }}>{noti.user}</Text>
                                {/* <TextInput placeholder={"Write..."} onChange={(e) => { this.setState({ message: e }) }} /> */}
                                <TextInput
                                    // style={styles.input}
                                    onChangeText={(e) => this.setState({ message: e })}
                                    value={message}
                                    returnKeyType='done'
                                    placeholder={'write...'}
                                // placeholderTextColor='rgba(255,255,255,0.7)'

                                />
                                {
                                    alluser && alluser.length ?
                                        alluser.map(item => {
                                            return <Button
                                                key={item.Name}
                                                title={item.Name}
                                                onPress={() => this.page(item.expoToken)}
                                            />
                                        })
                                        :
                                        null
                                }
                                {/* <Button
                                title="notification"
                                onPress={() => this.page()}
                            /> */}
                            </View> :
                            <View style={[styles.container, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        height: 200,
        width: 200,
        borderRadius: 100,
        paddingLeft: 20
    },
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

//Sending notification
// fetch('https://exp.host/--/api/v2/push/send', {
//     mode: 'no-cors',
//     method: 'POST',
//     headers: {
//         "Accept": 'application/json',
//         "Content-Type": 'application/json'
//     },
//     body: JSON.stringify({
//         to: "ExponentPushToken[H9u4llMu2nrPGtem4hIUI0]", body: "message here"
//     })
// });

function mapStateToProps(states) {
    return ({
        name: states.authReducers.USERNAME,
        UID: states.authReducers.UID,
        CurrentUser: states.authReducers.USER,
        alluser: states.authReducers.ALLUSER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // userAuth: (Email, Password) => {
        //     dispatch(userAction(Email, Password));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);