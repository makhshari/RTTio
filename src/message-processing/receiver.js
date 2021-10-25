export function onMessageArrived(message) {
    var newMessage = message.payloadString
    var topic = message.destinationName
    switch(topic){
      case "getCoupling":
        console.log("message arrived from getCoupling topic: ",newMessage)
        newCoupling = newMessage/100
        if(mainClass.state.mode=="powermeter" ){
          if( mainClass.state.currentPower != newCoupling)
              newPower =(Math.pow(10,( (newCoupling + mainClass.state.currentLevel) /10 )))/1000
              mainClass.setState({currentPower : newPower})
              if(newPower>1000){
                mainClass.setState({powerDisplay : newPower/1000})
                mainClass.setState({powerUnit : "kWatts"})
              }
              else if(newPower<0.001){
                mainClass.setState({powerDisplay : newPower*1000000})
                mainClass.setState({powerUnit : "microWatts"})
              }
              else if(newPower<1){
                mainClass.setState({powerDisplay : newPower*1000})
                mainClass.setState({powerUnit : "miliWatts"})
              }
              else {
                mainClass.setState({powerDisplay : newPower})
                mainClass.setState({powerUnit : "Watt"})
              }


          this.latestPower = newCoupling 
        }
          break 
      case "getLevel":
        console.log("message arrived from getLevel topic :",newMessage)
        newLevel = newMessage/100

            mainClass.setState({currentLevel : newLevel})
            if(mainClass.state.mode=="levelmeter"){

              newPower =(Math.pow(10,( (parseFloat(mainClass.state.selectedAtt) + mainClass.state.currentLevel) /10 )))/1000
              if(newPower>1000){
                mainClass.setState({powerDisplay : newPower/1000})
                mainClass.setState({powerUnit : "kWatts"})
              }
              else if(newPower<0.001){
                mainClass.setState({powerDisplay : newPower*1000000})
                mainClass.setState({powerUnit : "microWatts"})
              }
              else if(newPower<1){
                mainClass.setState({powerDisplay : newPower*1000})
                mainClass.setState({powerUnit : "miliWatts"})
              }
              else {
                mainClass.setState({powerDisplay : newPower})
                mainClass.setState({powerUnit : "Watt"})
              }
            }
        
        this.latestLevel = newLevel 
          break 
    }
    if( this.state.currentPower != latestPower && this._mounted)
    this.setState({currentPower : latestPower}) ;
  if(this.state.currentLevel != latestLevel && this._mounted)
    this.setState({currentLevel : latestLevel}) ;
  }
