import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const options = ["Pomodoro", "Short Break", "Long Break"]

const Header = ({currentTime, setCurrentTime, setTime, setIsActive}) => {

    const handlerPress = (index) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15 
        setCurrentTime(index)
        setTime(newTime * 60)
        setIsActive(false)
    }

    return (
        <View style={styles.header}>
            {options.map((opt, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => handlerPress(index)} 
                    style={[
                        styles.item, 
                        currentTime !== index && { borderColor: 'transparent' }
                    ]}
                >
                    <Text style={{fontWeight: 'bold'}}>{opt}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
    },
    item: {
        width: '33%',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 5,
    }
})

export default Header