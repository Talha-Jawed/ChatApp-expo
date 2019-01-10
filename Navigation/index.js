import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LogIn from '../src/Auth/Auth'
import Home from '../src/Dashboard/Dashboard'
import Chat from '../src/ChatBox/Chatbox'


const StackNavigator = createStackNavigator({
    LogIn: {
        screen: LogIn
    },
    Home: {
        screen: Home
    },
    Chat:{
        screen: Chat
    }


})
const Navigation = createAppContainer(StackNavigator)
export default Navigation;