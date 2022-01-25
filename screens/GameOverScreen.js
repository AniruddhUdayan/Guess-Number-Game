import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import MainButton from '../components/MainButton';


export default function GameOverScreen(props) {
  return (
      <View style={styles.screen}>
          <Text style={styles.title}>The Game is Over!</Text>
          <View style={styles.imageContainer}>
          <Image source={require('../assets/success.png')} style={styles.image}></Image></View>
          <View style={styles.result}>
          <Text style={styles.font}>Number of rounds:<Text style={styles.highlight}> {props.roundsNumber}</Text></Text>
          <Text style={styles.font}>Number was:<Text style={styles.highlight}> {props.userNumber}</Text></Text>
          </View>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow:'hidden',
        marginVertical: 30
    },
    image: {
        width:'100%',
        height:'100%'
    },
    title: {
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight:'bold'
    },
    highlight: {
        color: '#c717fc',
        fontFamily: 'serif',
        fontWeight:'bold'
    },
    result: {
       
        marginVertical: 15
    },
    font: {
        fontSize:20,
        fontFamily:'serif'
    }
});
