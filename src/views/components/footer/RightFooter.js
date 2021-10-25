export RightFooter =() => {
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