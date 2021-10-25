import ModalWrapper from 'react-native-modal-wrapper' ;

export PowerModalWrapper=() =>{
transparent={true}
visible={this.state.attPromptVisible}
animationIn={'slideInUp'}
animationOut={'slideOutDown'}
animationInTiming = {1000} 
onRequestClose={() => this.closeModal()}
style={styles.modal}
showOverlay = {true}
return(
  <View>
  <View style={styles.modalContainer}> 
    <Text>Enter Attenuation :</Text>
    <View style={styles.inp xContainer}>
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
)}