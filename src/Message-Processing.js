
async networkCall(mainClass,data,method) {
    var mqtt_server = 'm10.cloudmqtt.com'
    var mqtt_port = 35691
    var mqtt_clientID = 'phone'
    var mqtt_userName = 'dkmilgkk'
    var mqtt_password = 'lNV2Dl-HBb-8'

    latestPower = 0;
    latestLevel = 0 ;
    init({
      size: 10000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      reconnect: true,
      sync : {
      }
    });
  
    const client = new Paho.MQTT.Client(mqtt_server, mqtt_port, mqtt_clientID);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ userName: mqtt_userName ,password : mqtt_password , onSuccess:onConnect, useSSL: true });

    function onConnect() {
      client.subscribe("getCoupling");
      client.subscribe("getLevel");
  
      switch(method){
        case "setMode" :
        try{
          console.log("publish setMode : ",data.toString())
          client.publish("setMode",data.toString())
          }
        catch(e){
          console.log("error in publishing to set mode: ",e);
          }
          break ;
        case "setFR" :
          try{
            console.log("publish setFR : ",data.toString())
            client.publish("setFR",data.toString())
            }
          catch(e){
            console.log("error in publishing to set mode: ",e);
            }
            break ;
        case "setAtt" :
          try{
            console.log("publish setAtt ",data.toString())
            client.publish("setAtt",data.toString())
            }
          catch(e){
            console.log("error in publishing to set att: ",e);
            }
          break ;
        case "setCoupling" :
          try{
            console.log("publish setCoupling ",data.toString())
            client.publish("setCoupling",data.toString())
            }
            catch(e){
              console.log("error in publishing to set Coupling: ",e);
            }
          break ;
        case "setBand" :
          try{
              console.log("publish set band : " ,data.toString() )
              client.publish("setBand",data.toString())
            }
            catch(e){
              console.log("error in publishing to set Band: ",e);
            }
          break ;
          case "setChannel" :
          try{
            console.log("publish setChannel ",data.toString())
            client.publish("setChannel",data.toString())
            }
            catch(e){
              console.log("error in publishing to setChannel: ",e);
            }
          break ;
        default:
          break ;
      }
    }
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
      }
    }
    function onMessageArrived(message) {
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
  
    }
        if( this.state.currentPower != latestPower && this._mounted)
          this.setState({currentPower : latestPower}) ;
        if(this.state.currentLevel != latestLevel && this._mounted)
          this.setState({currentLevel : latestLevel}) ;
  }