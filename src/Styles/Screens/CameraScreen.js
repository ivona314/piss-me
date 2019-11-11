import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  imagePreview: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 60,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  repeatPhotoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: 120,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  focusFrameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  focusFrame: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dotted',
    borderRadius: 5,
  },
  topLeftCorner: {
    position: 'absolute',
 	top: 50,
 	left: 100,
 	height: 30,
    width: 30,
  },
  topRightCorner: {
    position: 'absolute',
 	top: 50,
 	right: 100,
 	height: 30,
    width: 30,
	transform: [{ rotate: '90deg' }],
  },
  bottomLeftCorner: {
    position: 'absolute',
 	bottom: 150,
 	left: 100,
 	height: 30,
    width: 30,
	transform: [{ rotate: '-90deg' }],
  },
  bottomRightCorner: {
    position: 'absolute',
 	bottom: 150,
 	right: 100,
 	height: 30,
    width: 30,
	transform: [{ rotate: '180deg' }],
  },
  photoPreviewRepeatPhotoText: {
    color: '#abcfff',
    fontSize: 15,
    marginLeft: 10,
  },
  usePhotoContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '50%',
    height: 120,
    backgroundColor: '#000',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  photoPreviewUsePhotoText: {
    color: '#abcfff',
    fontSize: 15,
    marginRight: 10,
  },
  preview: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  takePictureContainer: {
    position: 'absolute',
 	top: 300,
  },
    found: {
    position: 'absolute',
 	top: 200,
 	right: 110,
 	height: 150,
 	width: 150,
 },
 
  loading: {
    position: 'absolute',
 	top: 180,
 	right: 110,
    height: 200,
    width: 150,
    opacity: 0.6,
	},
	
	intro: {
    height: 730,
    width: 400,


	},
	hello: {
    position: 'absolute',
    top: 150,
    left: 50,
	color: '#ffffff',
    fontSize: 45,
    textAlign: 'center',

  },
  btn: {
  	position: 'absolute',
  	top: -450,
  	left:100,
	color: '#ffffff',
    fontSize: 45,
    textAlign: 'center',

  },
  
  btn_learn_more: {

		position: 'absolute',
    	padding: 20,
        borderRadius: 5,
        top: 400,
        justifyContent: 'center',
        alignItems: 'center',
    	alignSelf: 'center',
		backgroundColor: '#0099aa',
       
    },

    btn_scan_code: {

		position: 'absolute',
    	padding: 20,
        borderRadius: 5,
        top: 500,
        justifyContent: 'center',
        alignItems: 'center',
    	alignSelf: 'center',
        backgroundColor: '#0099aa',

    },
    
    text_wellcome: {
    	position: 'absolute',
    	alignSelf: 'center',
    	textAlign: 'center',
    	fontFamily: 'Helvetica-BoldOblique',
		top: 150,
        fontSize: 50,
        color: '#FFFFFF',
    },
    text: {
    
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
    
    backgroundVideo: {
    height: 750,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
	
});
