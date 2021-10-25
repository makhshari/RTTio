
    export function onConnect() {
      client.subscribe("getCoupling");
      client.subscribe("getLevel");
  
      switch(method){
        case "setMode" :
        try{
          client.publish("setMode",data.toString())
          }
        catch(e){
          }
          break ;
        case "setFR" :
          try{
            client.publish("setFR",data.toString())
            }
          catch(e){
            throw e;
          }
            break ;
        case "setAtt" :
          try{
            client.publish("setAtt",data.toString())
            }
          catch(e){
            throw e;
            }
          break ;
        case "setCoupling" :
          try{
            client.publish("setCoupling",data.toString())
            }
            catch(e){
              throw e;
            }
          break ;
        case "setBand" :
          try{
              client.publish("setBand",data.toString())
            }
            catch(e){
              throw e;
            }
          break ;
          case "setChannel" :
          try{
            client.publish("setChannel",data.toString())
            }
            catch(e){
              throw e;
            }
          break ;
        default:
          break ;
      }
}