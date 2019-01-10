import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Button, ActivityIndicator, TextInput, TouchableWithoutFeedback, Text } from 'react-native';
import firebase from '../../Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { Notifications, Permissions } from 'expo'
import { connect } from 'react-redux'
import Expo from 'expo';
import AppHeader from '../Component/Header/Header'
import { ScrollView } from 'react-native-gesture-handler';
import SettingsList from 'react-native-settings-list';



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
            switchValue: false,
            message: '',
            msg: null

        }
        this.onValueChange = this.onValueChange.bind(this);

    }
    onValueChange(value) {
        this.setState({ switchValue: value });
    }
    componentWillReceiveProps(props) {
        const { expoToken } = this.state
        const msg = props.msg
        if (msg) {
            setTimeout(() => {
                this.setState({ msg })
            }, 100);
        }

        const { alluser } = props;
        if (alluser) {
            setTimeout(() => {
                this.setState({ alluser })
            }, 100);
        }
        // console.log('Alluser', alluser)
        console.log('*****', this.props.CurrentUser);

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

        const { alluser } = this.props;
        if (alluser) {
            setTimeout(() => {
                this.setState({ alluser })
            }, 100);
        }

        if (this.props.CurrentUser) {

            // var obj = {
            //     expoToken: expoToken
            // }
            // firebase.database().ref('/UserData/' + currentUID).update(obj);
            this.setState({
                Name: this.props.CurrentUser.Name,
                profilePic: this.props.CurrentUser.Photo,
                loading: true
            })
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

    chat(user) {
        // console.log(user, '**');
        this.props.navigation.navigate('Chat', user)
    }

    static navigationOptions = { header: null }

    render() {
        const { mode, Name, profilePic, loading, noti, result, expoToken, msg, alluser } = this.state;
        // console.log('all user***', alluser);
        // console.log('msg=======', msg );


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
                                {<View style={{ backgroundColor: '#EFEFF4', flex: 1, width: 350 }}>
                                    <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
                                        <Text style={{ alignSelf: 'center', marginTop: 30, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Chat App</Text>
                                    </View></View>}
                                {
                                    alluser && alluser.length ?
                                        alluser.map(item => {
                                            console.log(item.Photo);

                                            return <View style={{ width: 350 }} key={item.Name}>
                                                <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                                                    <SettingsList.Header headerStyle={{ marginTop: 15 }} />
                                                    <SettingsList.Item
                                                        key={item.Name}
                                                        // icon={
                                                        //     <Image source={require('https://placeimg.com/140/140/any')} />
                                                        // }
                                                        // hasSwitch={true}
                                                        // switchState={this.state.switchValue}
                                                        // switchOnValueChange={this.onValueChange}
                                                        hasNavArrow={true}
                                                        title={item.Name}
                                                        onPress={() => this.chat(user = item)}
                                                    />
                                                </SettingsList>
                                            </View>
                                            //  <Button
                                            //     key={item.Name}
                                            //     title={item.Name}
                                            //     onPress={() => this.page(item.expoToken)}
                                            // />
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
        msg: states.authReducers.MESSAGES,
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