import {StackNavigator,} from 'react-navigation';
import Homepage from './Homepage' ;
import Welcome from './WelcomePage' ;

const App = StackNavigator({
  Welcome: { screen: Welcome},
  Home: { screen: Homepage}
})
export default App;