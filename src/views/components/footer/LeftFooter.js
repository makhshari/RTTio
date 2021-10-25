export LeftFooter =()=> {
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