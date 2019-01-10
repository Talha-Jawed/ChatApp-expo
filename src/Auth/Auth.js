import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import firebase from '../../Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { current_User, fb_Action, Google_Action } from '../../Store/actions/authAction'
// import Expo from 'expo'

class LogIn extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const currentUser = user
                this.props.user(currentUser)

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }
        })
    }

    async logInFB() {
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('307393933208156', {
            permissions: ['public_profile'],
        });
        this.props.fb_User(type, token)
    }

    async logInGoogle() {
        console.log('click**');
        const result = await Expo.Google.logInAsync({
            androidClientId: '309186469900-9vohoai2n23qf754at258g0s4k2fv6to.apps.googleusercontent.com',
            iosClientId: '309186469900-14cvp9sp73j94jafutpnddvtibftg3ov.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            // this.props.navigation.navigate('Home', result)
            console.log('Result-->', result);

            this.props.profilePic = result.photoUrl
            this.props.profileName = result.givenName
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(success => {
                    // user res, create your user, do whatever you want
                    console.log('success==>', success);
                    var currentUID = success.user.uid
                    var obj = {
                        Name: success.user.displayName,
                        UID: success.user.uid,
                        Photo: success.user.photoURL,
                        Token: accessToken
                    }
                    firebase.database().ref('/UserData/' + currentUID).update(obj);
                    this.props.Google_auth(currentUID, obj)
                    this.props.user(currentUID)
                })
                .catch(error => {
                    console.log("firebase cred err:", error);
                });
            return result.accessToken;

        } else {
            console.log('/////');
            return { cancelled: true };
        }
    }

    static navigationOptions = { header: null }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 30, }}>
                    <TouchableOpacity onPress={() => this.logInFB()}>
                        {/* <Text style={styles.ButtonText} >Facebook LogIn</Text> */}
                        <Image source={require('../../assets/fb.jpg')} style={{ width: 275, height: 50 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.logInGoogle()} >
                        {/* <Text style={styles.ButtonText} >Google LogIn</Text> */}
                        <Image source={require('../../assets/google.jpg')} style={{ width: 275, height: 50 }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    buton: {
        alignItems: 'center',
        backgroundColor: '#3498db',
        paddingVertical: 10,
        marginBottom: 20,
    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps(states) {
    return ({
        profilePic: states.authReducers.PROFILEPIC,
        profileName: states.authReducers.PROFILENAME,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
        fb_User: (type, token) => {
            dispatch(fb_Action(type, token))
        },
        Google_auth: (currentUID, obj) => {
            dispatch(Google_Action(currentUID, obj))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);