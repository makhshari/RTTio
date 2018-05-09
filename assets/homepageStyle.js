import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modal : {
    width: 280,
    height: 180,
    paddingLeft: 24,
    paddingRight: 24 ,
    borderWidth : 1 ,
    borderRadius : 5 ,
  } ,
  inpContainer : {
    marginTop : 15 ,
    alignItems : 'center' ,
    alignContent :'center' ,
},
  innerContainer : {
          display : 'flex' ,
          flexDirection : 'row' ,
          flexWrap:'wrap' ,
  },
  couplingInput : {
    borderWidth : 1 ,
    borderRadius : 5 ,
    marginTop : 5 ,
    marginBottom : 5 ,
    paddingTop : 3 ,
    paddingBottom : 3 ,
    width : 50 ,
    alignContent : 'center',
    alignItems : 'center' ,
    textAlign : 'center'
  },
  modalUnit : {
    justifyContent: 'center',
    fontSize : 10 ,
    marginLeft : 5 ,
  } ,


  deviceMode : {
    width:100 ,
    position : 'absolute',
    top : -110 ,
    right : 20 ,
  } ,
  powerLabel : {
    marginBottom :10 ,
    fontSize : 20 ,
  },
  levelLabel : {
    marginBottom :10 ,
    fontSize : 15 ,
  } ,
  gaugeRange : {
    display: 'flex' ,
    flexDirection : 'row' ,
    alignContent : 'flex-start' ,
    justifyContent : 'flex-start' ,
    paddingTop : 215 ,
    position : 'absolute' ,
  },
  minText : {
      textAlign : 'center' ,
      marginLeft : 10 ,
      width:30 ,
      height : 25 ,
      backgroundColor : '#f5ccff',
      borderWidth: 2 ,
      borderColor : '#f5ccff',
      borderRadius : 10 ,
      overflow:'hidden' ,
  } ,
  maxText : {
     textAlign : 'center' ,
      width:40 ,
      height : 25 ,
      marginLeft :175 ,
      backgroundColor : 'gray',
      borderWidth: 2 ,
      borderColor : 'gray',
      borderRadius : 10 ,
      overflow:'hidden' ,
  } , 
  footer :{
    paddingBottom : 10 ,
    flex : 0.7 ,
    display: 'flex' ,
    flexDirection : 'row' ,
    alignContent : 'flex-start' ,
    justifyContent : 'flex-start' ,
  } ,

  powerGauge : {
    marginBottom : -90 ,
  } ,
  sendButton : {
    textAlign: 'center' ,
    padding:20 ,
    fontSize : 30 ,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex' ,
    flexDirection : 'column' ,
  },
  displayContainer : {
    flex: 0.4 ,
    paddingTop : 100  ,
    display: 'flex' ,
    flexDirection : 'row' ,
    alignContent : 'center' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
 
  } ,
  powerGaugeContainer : {
    marginBottom:100 ,
    padding : 20 ,
    left : 2 ,
    flex: 0.8 ,
    display: 'flex' ,
    flexDirection : 'column' ,
    alignContent : 'center' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
    
  } ,
  levelGaugeContainer : {
    flex: 0.2 ,
    margin : 10 ,
    paddingRight: 40 ,
    left : 10 ,
    display: 'flex' ,
    flexDirection : 'column' ,
    alignContent : 'center' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
   
  } ,
  powerDisplay: {
    flex : 0.4 ,
    paddingBottom:20 ,
    width :100 ,
    display : 'flex' ,
    flexDirection : 'row' ,
    alignContent : 'center' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
    position : 'relative' ,
  },
  levelDisplay: {
    width :120 ,
    marginLeft:15 ,
    left : 20 ,
    display : 'flex' ,
    flexDirection : 'row' ,
    alignContent : 'center' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
  },
  powerDisplayDigit : {
    textAlign : 'center' ,
    borderWidth : 1 ,
    borderRadius : 5 ,
    overflow: 'hidden' ,
    backgroundColor:'black' ,
    color : 'green' ,
    fontSize : 30 ,
} ,
powerDisplayUnit : {
  textAlign : 'center' ,
  overflow:'hidden' ,
  borderRightWidth : 1 ,
  borderRadius : 5 ,
  backgroundColor: '#d9d9d9' ,
  color : 'green' ,
  fontSize : 12 ,
} ,
  levelDisplayDigit : {
      borderWidth : 1 ,
      borderRadius : 5 ,
      overflow: 'hidden' ,
      backgroundColor:'black' ,
      color : 'green' ,
      fontSize : 18 ,
  } ,
  levelDisplayUnit : {
    overflow:'hidden' ,
    borderRightWidth : 1 ,
    borderRadius : 5 ,
    backgroundColor: '#d9d9d9' ,
    color : 'green' ,
    fontSize : 10 ,
  } ,
  min : {
    marginTop : -50 ,
    marginLeft : 0 ,
  } ,
  max : {
    marginTop : -50 ,
    marginLeft : 120 ,
  } ,
  // **************************************************
 
  navigationBar: {
    flex: 0.15,
    backgroundColor: 'purple' ,
    alignItems : 'center' ,
    justifyContent: 'center' ,

  },
  navigationBarLabel : {
    fontSize : 20 ,
    fontWeight : 'bold' ,
    color : 'white',
  } ,
  navigationBarInfo : {
    fontSize : 15 ,
    fontWeight : '100' ,
    color : 'lightgreen',
  } ,

// **************************************************
band :{
display : 'flex' ,
flex: 0.5 ,
borderRightWidth:1 ,
borderColor : 'gray' ,
borderStyle: 'solid' ,
},
bandContainer :{
  display: 'flex' ,
  flexDirection : 'column' ,
  alignContent : 'flex-start' ,
  justifyContent : 'flex-start' ,
},
bandLabel : {
  backgroundColor :'purple' ,
  color : 'white' ,
  margin : 10 ,
  fontSize : 15 ,
  textAlign : 'center' ,
  borderWidth : 2 ,
  borderColor : 'purple' ,
  borderRadius : 5 ,
  overflow:'hidden' ,
  color: 'white',
},   
bandRadio : {
  justifyContent : 'center' ,

} ,
bandPicker : {
  height : 150 ,
  overflow : "hidden" ,
},
// **************************************************
att: {
  display : 'flex' ,
  flex: 0.5 ,
  borderLeftWidth:1 ,
  borderStyle: 'solid' ,
  borderColor : 'gray' ,
},
attContainer :{
  display: 'flex' ,
  flexDirection : 'column' ,
  alignContent : 'flex-start' ,
  justifyContent : 'flex-start' ,
},
throughInputs : {
  display: 'flex' ,
  flexDirection : 'column' ,
} , 
});


