import React ,{useCallback}from 'react';
import { StyleSheet, Text, View ,Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ColorPicker from './Components/ColorPicker';


const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const {width,height}=Dimensions.get('window');

const WIDTH=width*0.9;

const CIRCLE_WIDTH=width*0.7;

export default function App() {

  const pickedColor=useSharedValue(COLORS[0]);


  const onColorChange=useCallback((color)=> {
    'worklet'
    pickedColor.value=color;
  },[])

  const mainStyle=useAnimatedStyle(()=>{
    return {
      backgroundColor:pickedColor.value
    }
  })

  return (
   <>
   <Animated.View style={styles.topContainer}>
     <Animated.View style={[styles.circle,mainStyle]}></Animated.View>
   </Animated.View>
   <View style={styles.bottomContainer}>
     <ColorPicker color={COLORS} style={styles.gradient}  start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 0 }} maxWidth={WIDTH} onColorChange={onColorChange} />
   </View>
   </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent:'center',
    alignItems:'center',
    
  },
  bottomContainer:{
    flex:1,
    backgroundColor:BACKGROUND_COLOR,
    justifyContent:'center',
    alignItems:'center',
  },
  gradient:{
    height:40,
    width:WIDTH,
    borderRadius:20,

  },
  circle: {
    width:CIRCLE_WIDTH,
    height:CIRCLE_WIDTH,
    borderRadius:CIRCLE_WIDTH/2,
    borderColor:'rgba(0,0,0,0.3)',
    borderWidth:1, 
  },
});
