import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';




export default function StartGameScreen(props) {

const [enteredValue, setEnteredValue]= useState('');
const [confirmed, setConfirmed] = useState(false);
const [selectedNumber, setSelectedNumber] = useState();

const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
};

const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
}

const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber> 99){
        Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
        return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
   
};

let confirmedOutput;
if (confirmed) {
    confirmedOutput = (
    <Card style={styles.summaryContainer}>
    <Text>You selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton onPress={()=> props.onStartGame(selectedNumber)}>START GAME!</MainButton>
    </Card>)
};

  return (
      <TouchableWithoutFeedback onPress={()=> {
          Keyboard.dismiss();
      }}>
     <View style={styles.screen}>
       <Text style={styles.title}>Start a new Game!</Text>
       <Card style={styles.inputContainer}>
           <Text>Select a Number</Text>
           <Input style={styles.input} 
             blurOnSubmit 
             autoCapitalize="none" 
             autoCorrect={false} 
             keyboardType="number-pad" 
             maxLength={2}
             onChangeText={numberInputHandler}
             value={enteredValue}>              
             </Input>
           <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title='RESET' onPress={resetInputHandler} color='#c717fc'></Button></View>
            <View style={styles.button}><Button title='CONFIRM' onPress={confirmInputHandler} color='#f7287b'></Button></View>
           </View>
       </Card>
       {confirmedOutput}
     </View>
     </TouchableWithoutFeedback>
  );
}
const styles= StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'serif',
        fontWeight: 'bold'
        
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems:'center'
    }
});