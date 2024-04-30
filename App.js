import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';
import Timer from './components/Timer';
import { Audio } from 'expo-av';

export default function App() {

  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null

    if (isActive) {
      // run the timer
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)

    } else {
      // clean the interval
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)
  }, [isActive, time]);

  const bgColors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']

  const handlerIsActive = () => {
    playSound()
    setIsActive(!isActive)
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/off-click.mp3')
    )
    await sound.playAsync()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColors[currentTime] }]}>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS == 'android' && 30,
          paddingHorizontal: 15,
        }}>

        <Text style={styles.text}>Pomodoro</Text>

        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          setIsActive={setIsActive}
        />

        <Timer time={time} />

        <TouchableOpacity
          onPress={() => handlerIsActive()}
          style={styles.button}
        >

          <Text
            style={styles.buttonText}
          >
            {isActive ? 'STOP' : 'START'}
          </Text>

        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333333',
    paddingTop: 15,
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
