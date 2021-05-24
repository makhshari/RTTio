import React , {Component} from 'react';
import { StyleSheet, Text, View , Picker , Button , TextInput , KeyboardAvoidingView , Keyboard ,AsyncStorage } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel,index} from 'react-native-simple-radio-button'; 
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import AnimateNumber from 'react-native-animate-number' ;
import init from 'react_native_mqtt';
import ModalWrapper from 'react-native-modal-wrapper' ;
import networkCall from 'Message-Processing.js';

// import BlinkView from 'react-native-blink-view';


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
    generatePickers () {
      for (let i=88 ; i <108 ; i++ ){
        let lb = String(i) + '-' + String(i+1) + ' MHz'  
        this.FM_array.push(<Picker.Item label= {lb} value= {i} key={i} /> );
      }
      for (let i=5 ; i <13 ; i++ ){
        let lb = 'CH '+ String(i) + ' : ' + String(177.5 + 7*(i-5)) + ' MHz'  
        this.VHF_array.push(<Picker.Item label={lb} value={i} key={i} />);
      }
      for (let i=21 ; i <70 ; i++ ){
        let lb ='CH '+ String(i) + ' : ' + String(474 + 8*(i-21)) + ' MHz'  
        this.UHF_array.push(<Picker.Item label={lb} value={i} key={i} />);
      }
      }
    selectPickers(){
      switch (this.state.selectedBand){
        case "FM" : 
            this.state.pickers = this.FM_array ;
          break ;
        case "VHF" : 
            this.state.pickers = this.VHF_array ;
          break ; 
        case "UHF" : 
            this.state.pickers = this.UHF_array ;
          break ; 
      }
      if(this._mounted )
      this.forceUpdate() 
        }
    evaluatePower(power,max) {
          return ( (parseInt(power)/parseInt(max) )  *100 )
        }    
    static navigationOptions = {
      title: 'Powermeter',
      headerTintColor: 'purple',
      };

    closeModal() {
        this.setState({attPromptVisible:false});
        this.setState({couplingPromptVisible:false});
        this.setState({modePromptVisible:false});
      }
    openAttModal() {
        this.setState({attPromptVisible:true});
      }
    openModeModal() {
        this.setState({modePromptVisible:true});
      }
    
    render() {
      console.disableYellowBox = true;



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
          
                  <ModalWrapper
                      transparent={true}
                      visible={this.state.attPromptVisible}
                      animationIn={'slideInUp'}
                      animationOut={'slideOutDown'}
                      animationInTiming = {1000} 
                      onRequestClose={() => this.closeModal()}
                      style={styles.modal}
                      showOverlay = {true}
                      >
                        <View style={styles.modalContainer}> 
                          <Text>Enter Attenuation :</Text>
                          <View style={styles.inpContainer}>
                            <View style={styles.innerContainer}>
                              <TextInput
                                style={styles.couplingInput}
                                keyboardType='numeric'
                                onChangeText={(text) => this.setState({selectedAtt: text })}
                                value={(this.state.selectedAtt).toString()}
                                returnKeyType="next"
                                maxLength={10}
                                onChange = {(num) => this.setState({selectedAtt : num})}
                                />
                            <Text style={styles.modalUnit}>dBm</Text>
                            </View>
                          </View>
                          <Button
                              onPress={() =>{
                                this.closeModal()
                                newPower =(Math.pow(10,( (this.state.currentLevel + this.state.selectedAtt) /10 )))/1000
                                this.setState({currentPower : newPower})
                                //this.networkCall(this,this.state.selectedAtt,"setAtt")
                              }
                              }
                              title="Submit">
                          </Button>        
                      </View>
                  </ModalWrapper>

                  <ModalWrapper
                      transparent={true}
                      visible={this.state.modePromptVisible}
                      animationIn={'slideInUp'}
                      animationOut={'slideOutDown'}
                      animationInTiming = {1000} 
                      onRequestClose={() => this.closeModal()}
                      style={styles.modal}
                      showOverlay = {true}
                      >
                      <View style={styles.modalContainer}> 
                          <Text>Enter Mode :</Text>
                          <RadioForm style={styles.bandRadio}
                              radio_props ={ [
                                {label: 'Forward', value: "F" },
                                {label: 'Reflect', value: "R" } ,
                              ] }
                              initial={0}
                              formHorizontal={true}
                              labelHorizontal={false}
                              buttonColor={'purple'}
                              onPress={
                                (value) => {
                                  this.setState({selectedFR:value} )
                                } 
                              }
                            />       
                          <Button
                              title="Submit"
                                onPress={() =>{
                                    this.closeModal()
                                    this.networkCall(this,this.state.selectedFR,"setFR")
                                  }
                                  }
                              >
                          </Button>        
                      </View>
                  </ModalWrapper>
          </View>
        </View>
      );
     }
    PowerGauge =() => {
      return (
        <View style={styles.powerGaugeContainer}>
            <Text style={styles.powerLabel}>power</Text>
            <View>
                <AnimatedGaugeProgress
                    style={styles.powerGauge}
                    size={255}
                    width={20}
                    fill={ this.evaluatePower(this.state.powerDisplay,this.state.currentMax)}
                    rotation={90}
                    cropDegree={90}
                    tintColor="purple"
                    backgroundColor="gray"
                    stroke={[2, 2]} //For a equaly dashed line
                    strokeCap="circle" >
                {(fill) => (
                  <View style={styles.gaugeRange}>
                    <Text style={styles.minText}>0</Text>
                    <Text style={styles.maxText}>1000</Text>
                  </View>
                )}
                </AnimatedGaugeProgress>
            </View>
            <View style={styles.powerDisplay}> 
                            <Text style={styles.powerDisplayDigit} >{ (parseFloat(this.state.powerDisplay)).toFixed(2)}</Text> 
                            <Text style={styles.powerDisplayUnit}> {this.state.powerUnit} </Text>
            </View>             
        </View>
              ) ; 
            }
    LevelGauge =() =>{
      return (
        <View style={styles.levelGaugeContainer}>
            <Text style={styles.levelLabel}>Level</Text>
            <View>
              <AnimatedGaugeProgress
                  size={100}
                  width={13}
                  fill={(parseInt(this.state.currentLevel)/15 )  *100}
                  rotation={180}
                  cropDegree={220}
                  tintColor="purple"
                  backgroundColor="gray"
                  stroke={[2, 2]} //For an equaly dashed line
                  strokeCap="circle" >
              </AnimatedGaugeProgress>
            </View>
            <View style={styles.levelDisplay}>      
                            <AnimateNumber style={styles.levelDisplayDigit} value={ parseFloat(this.state.currentLevel).toFixed(2) } countBy={100} interval={100} /> 
                            <Text style={styles.levelDisplayUnit}> dBm </Text>
            </View>
        </View>
        ) ; 
      }
    LeftFooter =()=> {
        return (
        <View style={styles.band}>  
        <View style={styles.bandContainer}>
        <Text style={styles.bandLabel}>{this.state.selectedBand}</Text>
        <RadioForm style={styles.bandRadio}
          radio_props ={ [
            {label: 'FM', value: "FM" },
            {label: 'VHF', value: "VHF" } ,
            {label: 'UHF', value: "UHF" }
          ] }
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'purple'}
          onPress={
            (value) => {
              this.setState({selectedBand:value} ,
              () =>
                this.selectPickers() ) ;
                bandString=value.charAt(0) ;
                this.networkCall(this,bandString,"setBand") 
            }
            } 
        />
        <Picker style={styles.bandPicker}
          selectedValue={this.state.selectedFreq}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedFreq: itemValue})}>
          {this.state.pickers}
        </Picker>
        </View>
        <Button title="Set Channel" style={styles.sendButton}
                        onPress={
                          ()=> {
                            this.setState({currentFreq: parseFloat(this.state.selectedFreq.valueOf())})
                            if(this.state.selectedBand.charAt(0) == 'F'){
                              channelString=(parseInt(this.state.selectedFreq.valueOf())-88)
                              if(channelString<10){
                                channelString = ""+0+channelString
                              }
                            }
                            else if(this.state.selectedBand.charAt(0) == 'V'){
                              channelString=(this.state.selectedFreq.valueOf()+65) ;
                            }
                            else {
                              channelString=this.state.selectedFreq.valueOf() ;
                            }
                            this.networkCall(this,channelString,"setChannel") 
                          }
                        }
            ></Button>
        </View>
        );
      }
    RightFooter =() => {
      return (
        <View style={styles.att}>
        <View style={styles.attContainer}>
        <Text style={styles.bandLabel}>{this.state.mode}</Text>
        <RadioForm style={styles.bandRadio}
          radio_props ={ [
            {label: 'powemeter', value: "powemeter" },
            {label: 'levelmeter', value: "levelmeter" } 
          ] }
          initial={1}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'purple'}
          onPress={
            (value) => {
              this.setState({mode:value} , () =>{}) ;
              this.networkCall(this,value.charAt(0),"setMode")
            }
            } 
        />
        { this.RightPanel() }
        </View>
        </View>
        );
      } 

    RightPanel=()=>{
     if(this.state.mode=="levelmeter"){
        return(
                <View >
                        <Button
                            style={styles.throughInputs}
                             title="Attenuation"
                            onPress={() => this.openAttModal()} >
                        </Button>
                        <View style={styles.infos}>
                            <Text style={styles.infoItem}>Channel :{this.state.currentFreq} </Text>
                            <Text style={styles.infoItem}>Coupling :{this.state.selectedAtt} </Text>
                            <Text style={styles.infoItem}>Power(dBm) :{ 10*(Math.log((this.state.currentPower))*1000) } </Text>
                        </View>
                </View>
        );
      }else {
        return (
            <View>
                    <Button 
                          title="Forward / Reflect" 
                          onPress={() => this.openModeModal()}>
                    </Button>
            </View>
        )
      }
     }
  
  
  

  
  
  
  
  
    }

  
  