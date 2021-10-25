import React , {Component} from 'react';
import { StyleSheet, Text, View , Picker , Button , TextInput , KeyboardAvoidingView , Keyboard ,AsyncStorage } from 'react-native';
import AnimateNumber from 'react-native-animate-number' ;
import init from 'react_native_mqtt';
import networkCall from 'Message-Processing.js';

import {styles} from './assets/homepageStyle' ;

export default class Homepage extends React.Component {
    FM_array=[];
    VHF_array=[];
    UHF_array=[];
    constructor(props){
        super(props);
        this.state = {
        currentPower: '0' ,
        currentLevel: '0'  ,
        powerDisplay : '0',
        powerUnit : "Watt",
        currentMax : 1000 ,
        mode : 'levelmeter' ,
        selectedBand: "FM" , 
        selectedFreq: 0 ,
        currentFreq: 0 ,
        pickers: [] ,
        selectedAtt: '0' ,
        selectedCoupling: '0' ,
        selectedFR : 'F' ,
        attPromptVisible : false ,
        modePromptVisible : false 
      }
      this.generatePickers () ;
      this.selectPickers () ;
      this.networkCall(this,0,"init")
      }
      
    componentDidMount() { 
      this._mounted = true;
     }
    componentWillUnmount() {
      this._mounted = false;
      }

    evaluatePower(power,max) {
          return ( (parseInt(power)/parseInt(max) )  *100 )
        }   

    static navigationOptions = {
      title: 'Powermeter',
      headerTintColor: 'purple',
      };

    render() {
      const { navigate } = this.props.navigation
      return (
        <View style={styles.container}>
          <View style={styles.displayContainer}>
                { this.PowerGauge () }
                { this.LevelGauge () }
          </View>
          <View style={styles.footer}>
                { this.LeftFooter() }
                { this.RightFooter() }   
                {this.PowerModalWrapper()}
                {this.PowerModalWrapper}
                {this.FRModalWrapper}
          </View>
        </View>
      );
     }
}

  
  