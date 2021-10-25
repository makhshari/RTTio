export generatePickers () {
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
  export selectPickers(){
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