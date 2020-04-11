import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Trump from './trump2.jpg';

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const App: () => React$Node = () => {
  const [{quote, isTrumpQuote}, setQuote] = useState({
    quote: '',
    isTrumpQuote: false,
  });

  const [refetch, setRefetch] = useState(0);

  const getNewQuote = () => setRefetch(prev => prev + 1);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const res = await fetch('https://type.fit/api/quotes');
        const quotes = await res.json();
        setQuote({
          quote: sample(quotes).text,
          isTrumpQuote: false,
        });
      } catch (err) {
        console.log(err);
      }
    };
    const fetchTrumpQuote = async () => {
      try {
        const res = await fetch(
          'https://api.whatdoestrumpthink.com/api/v1/quotes/random/'
        );
        const {message} = await res.json();
        console.log({message});
        setQuote({
          quote: message,
          isTrumpQuote: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
    const action = sample([fetchTrumpQuote, fetchRandomQuote]);
    action();
  }, [refetch]);

  const handlePress = didHeSay => () => {
    if (isTrumpQuote === didHeSay) {
      return Alert.alert(
        'Success!',
        'You fucking nailed it, champ!',
        [
          {
            text: "god damn I'm smart",
            onPress: () => getNewQuote(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
    return Alert.alert(
      'WRONG!',
      'You fucking dummy',
      [
        {
          text: "ugh, I'm so stupid",
          onPress: () => getNewQuote(),
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <View style={styles.view}>
      <ImageBackground source={Trump} style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.quote}>{quote}</Text>
        </View>
        <View style={styles.responseContainer}>
          <Text style={styles.answer}>Did he say it?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePress(true)}>
              <Text style={styles.buttonText}>Yes, definitely</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePress(false)}>
              <Text style={styles.buttonText}>No fucking way</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  responseContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 30,
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  quote: {
    position: 'relative',
    top: '20%',
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff90',
  },
  answer: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#00000099',
    height: 50,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default App;
