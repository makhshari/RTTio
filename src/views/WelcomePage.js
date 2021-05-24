import React , {Component} from 'react';
import { StyleSheet, Text, View , Picker , Button , TextInput , KeyboardAvoidingView , Keyboard , Image } from 'react-native';
import {RippleLoader,TextLoader} from 'react-native-indicator';
import {StackNavigator,} from 'react-navigation';


export default class Welcome extends React.Component {
  constructor(props){
    super(props) ;
    this.state={
      deviceFound : true ,
    }
  }
  static navigationOptions = {
    title: 'Takta Powermeter',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
              <View>
                <Image
                  source = {require('./images/logo.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.indicatorContainer}>
                  <RippleLoader size={200} />
                  <TextLoader text="Searching for Watt-Meter Devices" />
              </View>
              <View style={styles.buttonContainer}>
                  {renderIf(this.state.deviceFound, 
                        <Button title="connect to Takta device"
                                style={styles.connectButton}
                             
                                onPress= {
                                    () => this.props.navigation.navigate('Home')
                                }
                        />
                    )}
                    {renderIf(!this.state.deviceFound,
                        <Text>No Device Founded !</Text>
                    )}
              </View>
      </View>
     
    );
  }
}
function renderIf(condition, content) {
  if (condition) {
      return content;
  } else {
      return null;
  }
}
const styles = StyleSheet.create({
      logo : {
        width: 250,
        height: 250,
        alignSelf:"center" 
      } ,
      container : {
     
      },
      indicator : {

      } ,
      indicatorContainer : {
        paddingTop :0 ,
        display : 'flex' ,
        alignItems : 'center' ,
     
     }  , 
     buttonContainer :{
      paddingTop : 40 ,
     } ,
     connectButton : {
        
     }
  });