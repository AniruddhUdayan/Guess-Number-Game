import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons} from '@expo/vector-icons'
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';


const generateRandomBetween = (min, max, exclude) => {
    min=Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min,max, exclude);
    } else {
        return rndNum;
    }
};


export default function GameScreen(props) {

const[currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100,props.userChoice));
const [rounds, setRounds] = useState(0);
const currentLow = useRef(1);
const currentHigh = useRef(100);


const{userChoice, onGameOver} = props

useEffect(() => {
    if(currentGuess === userChoice){
        onGameOver(rounds);
    }
},[currentGuess,userChoice,onGameOver]);

const nextGuessHaandler = direction => {
    if(
    (direction === 'lower' && currentGuess < props.userChoice) || 
    (direction === 'greater' && currentGuess>props.userChoice) 
    ){
        Alert.alert("LOL don't fool me ._.", "You know this is wrong...",[{text: 'SORRY!', style: 'cancel'}]);
        return;
    }
    if (direction === 'lower'){
       currentHigh.current=currentGuess;
    }else{
        currentLow.current=currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(currRounds => currRounds + 1);
};

  return (
      <View style={styles.screen}>
      <View >
          <Text style={styles.title}>Opponent's Guess</Text>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <Card style={styles.buttonContainer}>
              <MainButton onPress={nextGuessHaandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white"/></MainButton>
              <MainButton onPress={nextGuessHaandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white"/></MainButton>
          </Card>

      </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    title: {
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: 'bold'
    }
});