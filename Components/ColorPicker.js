import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {PanGestureHandler,TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {useSharedValue,useAnimatedStyle,useAnimatedGestureHandler,
    withTiming,withSpring,useDerivedValue,interpolateColor} from 'react-native-reanimated';

const  CIRCLE_PICKER_RADIUS=45;
const INTERNAL_PICKER_RADIUS=CIRCLE_PICKER_RADIUS/1.5;

const ColorPicker = (props) => {

    const translateX=useSharedValue(0);
    const translateY=useSharedValue(0);
    const scale=useSharedValue(1);

    

    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0),props.maxWidth-CIRCLE_PICKER_RADIUS);
      });

      const adjustedTranslateY = useDerivedValue(() => {
        return Math.min(Math.max(translateY.value,-10),10)
          
      });



    const panGestureHandler=useAnimatedGestureHandler({
        onStart:(event,context)=>{
            context.x=adjustedTranslateX.value;
            context.y=adjustedTranslateY.value;
            // scale.value=withSpring(1.2) ;
        },
        onActive:(event,context)=>{
            translateX.value= event.translationX+context.x;
            translateY.value= event.translationY+context.y;

        },
        onEnd:(event,context)=>{
            translateX.value=withTiming(event.translationX+context.x);
            translateY.value=withSpring(0);
            scale.value=withSpring(1) ;
        }
    });

    const pickerStyle=useAnimatedStyle(()=>{
        return{
            transform:[{translateX:adjustedTranslateX.value},{translateY:adjustedTranslateY.value},{scale:scale.value}]
        }
    });

    const inputRange=props.color.map((_,index) => {
        return (index/props.color.length)*props.maxWidth
    })

    const internalPickerStyle=useAnimatedStyle(()=>{

        const backgroundColor=interpolateColor(adjustedTranslateX.value,inputRange,props.color);
      props.onColorChange(backgroundColor)

        return {
            backgroundColor
        }
    })


    const tapGestureHandler=useAnimatedGestureHandler({
        onStart:(event,context)=>{
            scale.value=withSpring(1.2) ;
            translateX.value= withTiming(event.absoluteX-CIRCLE_PICKER_RADIUS);
        },
        onEnd:(event,context)=>{
           
            translateY.value=withSpring(0);
            scale.value=withSpring(1) ;
        },
    })

    return (
        <TapGestureHandler onGestureEvent={tapGestureHandler}>
        <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={styles.pickerContainer}>

        <LinearGradient colors={props.color} style={props.style}  start={props.start} end={props.end} />

        <Animated.View style={[styles.picker,pickerStyle]}> 
        <Animated.View style={[styles.internalPicker,internalPickerStyle]} />
        </Animated.View>

       </Animated.View>
       </PanGestureHandler>
       </Animated.View>
       </TapGestureHandler>
    )
}

export default ColorPicker;



const styles = StyleSheet.create({
pickerContainer:{
justifyContent:'center',

},
picker:{
    position:'absolute',
    backgroundColor:'#fff',
    width:CIRCLE_PICKER_RADIUS,
    height:CIRCLE_PICKER_RADIUS,
    borderRadius:CIRCLE_PICKER_RADIUS/2,
    justifyContent:'center',
    alignItems:'center',

},
internalPicker:{
    width:INTERNAL_PICKER_RADIUS,
    height:INTERNAL_PICKER_RADIUS,
    borderRadius:INTERNAL_PICKER_RADIUS/2,
    borderColor:'rgba(0,0,0,0.3)',
    borderWidth:1
},

})
