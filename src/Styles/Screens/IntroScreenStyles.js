import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  backgroundVideo: {
  height: 750,
  position: "absolute",
  top: 0,
  left: 0,
  alignItems: "stretch",
  bottom: 0,
  right: 0
},

text_wellcome: {
  position: 'absolute',
  alignSelf: 'center',
  textAlign: 'center',
  fontFamily: 'Helvetica-Light',
  top: 150,
  fontSize: 50,
  color: '#FFFFFF',
},

btn_learn_more: {
  position: 'absolute',
  top: 400,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: '#087694',
  width:"80%",
  height:50,
},

text: {
  fontWeight: "bold",
  textTransform: 'uppercase',
  color: '#FFFFFF',
},


  btn_scan_code: {
    position: 'absolute',
    top: 500,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#087694',
    width:"80%",
    height:50,
  },




});
