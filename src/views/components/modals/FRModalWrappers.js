import ModalWrapper from 'react-native-modal-wrapper' ;
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel,index} from 'react-native-simple-radio-button'; 

export FRModalWrapper = () ={
return(
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
)}