import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LogIn from '../src/Auth/Auth'
import Home from '../src/Dashboard/Dashboard'
import notifPage from '../src/Dashboard/NotifPage'


const StackNavigator = createStackNavigator({
    LogIn: {
        screen: LogIn
    },
    Home: {
        screen: Home
    },
    Page:{
        screen: notifPage
    }

})
const Navigation = createAppContainer(StackNavigator)
export default Navigation;