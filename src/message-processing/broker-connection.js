
export async networkCall(mainClass,data,method) {
    var mqtt_server = process.env.MQTT_SERVER;
    var mqtt_port = process.env.MQTT_PORT;
    var mqtt_clientID = process.env.MQTT_CLIENTID;
    var mqtt_userName = process.env.MQTT_USERNAME;
    var mqtt_password =  process.env.MQTT_PASSWORD;

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
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage);
        }
      }
}

