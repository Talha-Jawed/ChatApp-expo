import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../../Config/Firebase'
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: '',
      picture: '',
      expoToken: '',
      reciverUID: '',
      senderID: '',
      // msg: 
    }
  }
  componentDidMount() {
    const currentUID = this.props.UID
    console.log(currentUID, 'currentuis')
    const user = this.props.navigation.state.params
    const { msg } = this.props
    console.log(msg, 'messages here')
    this.setState({ senderID: currentUID, msg })

    if (this.props.navigation.state.params) {
      this.setState({
        name: user.Name,
        picture: user.Photo,
        expoToken: user.expoToken,
        reciverUID: user.UID
      })
    }

    const allMessage = [];

    if (msg) {
      console.log(user, 'user herre ahs')
      msg.map((item) => {
        if ((item.reciverUID === currentUID && item.senderID === user.UID) || (item.reciverUID === user.UID && item.senderID === currentUID)) {
          if (item.senderID === user.UID) {
            console.log(item, 'itme')
            const obj1 = {
              _id: 1,
              text: item.msg,
              createdAt: item.time,
              user: {
                _id: 2,
                name: 'React Native',
                // avatar: 'https://placeimg.com/140/140/any',
              },
            }
            allMessage.push(obj1)

          }
          else {
            const obj2 = {
              _id: 2,
              text: item.msg,
              createdAt: item.time,
              user: {
                _id: 1,
                name: 'React Native',
                // avatar: 'https://placeimg.com/140/140/any',
              }
            }
            allMessage.push(obj2)

          }
          this.setState({ allMessage }, () => {
            this.state.allMessage.sort(
              function (a, b) {
                return a.time - b.time
              }
            )
            // console.log(this.state.allMessage, 'this.state.allMessage')
            const arr = this.state.allMessage.reverse()
            this.setState({ messages: arr })
          })
          // allMessage.push(obj1)
        }
      })
    }
    // }
    // if (msg) {

    //   msg.map(item => {
    //     if ((item.reciverUID === currentUID && item.senderID === user.UID) || (item.reciverUID === user.UID && item.senderID === currentUID)) {
    //       // console.log(item.msg , 'some one send you');
    //       if (item.senderID === user.UID) {
    //         const obj1 = {
    //           _id: 1,
    //           text: item.msg,
    //           createdAt: item.time,
    //           user: {
    //             _id: 2,
    //             name: 'React Native',
    //             // avatar: 'https://placeimg.com/140/140/any',
    //           },
    //         }
    //         allMessage.push(obj1)

    //       }
    //       else {
    //         const obj2 = {
    //           _id: 2,
    //           text: item.msg,
    //           createdAt: item.time,
    //           user: {
    //             _id: 1,
    //             name: 'React Native',
    //             // avatar: 'https://placeimg.com/140/140/any',
    //           }
    //         }
    //         allMessage.push(obj2)

    //       }
    //       // allMessage.push(obj1)

    //     }
    //     //  else if (item.reciverUID === user.UID && item.senderID === currentUID) {
    //     //   // console.log(item.msg , 'you send some one');
    //     //   const obj2 = {
    //     //     _id: 2,
    //     //     text: item.msg,
    //     //     createdAt: item.time,
    //     //     user: {
    //     //       _id: 1,
    //     //       name: 'React Native',
    //     //       // avatar: 'https://placeimg.com/140/140/any',
    //     //     },
    //     //   }
    //     //   allMessage.push(obj2)


    //     // }
    //     // else {

    //     // }

    //     if (allMessage.length) {
    //       allMessage.sort(
    //         function (a, b) {
    //           return b.time - a.time
    //         }
    //       );
    //       this.setState({
    //         messages: allMessage
    //       },()=>{
    //         // console.log(this.state.messages);

    //       })
    //     }
    //   })
    // }

  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  componentWillReceiveProps(props) {
    const { alluser, msg, cond, } = props;
    const user = this.props.navigation.state.params
    const { messages, allMessage, senderID } = this.state;
    // console.log('msg', msg[msg.length - 1])

    if (alluser) {
      setTimeout(() => {
        // console.log('AllUser', alluser)
      }, 1000)
    }
    if (msg) {
      console.log('props.msg', [msg[msg.length - 1]])
      const item = msg[msg.length - 1];

      if ((item.reciverUID === senderID && item.senderID === user.UID) || (item.reciverUID === user.UID && item.senderID === senderID)) {
        if (item.senderID === user.UID) {
          console.log(item, 'itme')
          const obj1 = {
            _id: 1,
            text: item.msg,
            createdAt: item.time,
            user: {
              _id: 2,
              name: 'React Native',
              // avatar: 'https://placeimg.com/140/140/any',
            },
          }
          messages.unshift(obj1)

        }
        else {
          const obj2 = {
            _id: 2,
            text: item.msg,
            createdAt: item.time,
            user: {
              _id: 1,
              name: 'React Native',
              // avatar: 'https://placeimg.com/140/140/any',
            }
          }
          messages.unshift(obj2)

        }
        this.setState({ messages }, () => {
          // this.state.messages.sort(
          //   function (a, b) {
          //     return a.time - b.time
          //   }
          // )
          // console.log(this.state.messages, 'this.state.allMessage')
          // const arr = this.state.allMessage.reverse()
          // this.setState({ messages: arr })
        })
        // allMessage.push(obj1)
      }


      // const obj = {
      //   _id: 1,
      //   text: item.text,
      //   senderID: item.senderID,
      //   user: {
      //     reciverUID: item.reciverUID,
      //     reciverToken: item.expoToken,
      //   },
      //   createdAt: item.time,
      // }
      // messages.unshift(msg[msg.length - 1])
      // this.setState({ messages })
      // messages.push(obj)
      this.setState({ messages })
    }
  }

  onSend(messages = []) {
    const { name, picture, reciverUID, expoToken, senderID } = this.state
    // delete messages._id

    messages.map(item => {
      // console.log(item.text);
      const obj = {
        msg: item.text,
        senderID: senderID,
        reciverUID: reciverUID,
        reciverToken: expoToken,
        time: new Date().getTime(),
      }
      console.log('[messages]', messages);


      firebase.database().ref('messages').push(obj)
    })
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))




  }

  render() {
    const { messages, name, msg, allMessage } = this.state;
    console.log("mags=====>", messages);
    // console.log(allMessage, 'all messagesss')

    console.log('messages', messages[messages.length - 1])
    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1, }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 30, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    )
  }
}

// export default Example


function mapStateToProps(states) {
  return ({
    profilePic: states.authReducers.PROFILEPIC,
    profileName: states.authReducers.PROFILENAME,

    name: states.authReducers.USERNAME,
    UID: states.authReducers.UID,
    CurrentUser: states.authReducers.USER,
    alluser: states.authReducers.ALLUSER,
    msg: states.authReducers.MESSAGES,
    cond: states.authReducers.COND,

  })
}

function mapDispatchToProps(dispatch) {
  return ({
    // user: (currentUser) => {
    //     dispatch(current_User(currentUser))
    // },
    // fb_User: (type, token) => {
    //     dispatch(fb_Action(type, token))
    // },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);