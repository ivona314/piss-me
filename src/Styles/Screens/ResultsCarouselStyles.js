import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({

  image_background_style: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  container: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor:'rgb(255, 255, 255)',
    marginTop: 20,
  },

  title: {
    fontSize: 40,
    marginTop: 25,
    padding: 5,
    borderRadius: 10,
    backgroundColor:'rgb(255, 255, 255)',
    overflow: 'hidden',
  },

  percentage_text: {
    position: 'absolute',
    left: 122,
    top: 210,
    fontSize: 25,
    fontWeight: 'bold',
  },

  carousel: {
    height: 80,
    width: 80,
  },
  description_text: {
    fontSize: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor:'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',

  }

});
