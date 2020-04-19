import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text, Alert, Image, Dimensions} from 'react-native'
import DatePicker from 'react-native-datepicker'
import UserAvatar from 'react-native-user-avatar';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Profile extends React.Component {
    state = {
        height: null,
        weight: null,
        dateOfBirth: "1970-01-01",
        gender: '',
        weeklyActivity: null,
    };

    handleHeightChange = height => {
        this.setState({ height: height })
    };

    handleWeightChange = weight => {
        this.setState({ weight: weight })
    };

    handleGenderChange = gender => {
        this.setState({ gender: gender })
    };

    handleWeeklyActivityChange = weeklyActivity => {
        this.setState({ weeklyActivity: weeklyActivity })
    };

    onSubmit = () => {
        try {
            if (this.state.gender.length > 0 && this.state.height > 0  && this.state.weight > 0 && this.state.dateOfBirth !== null && this.state.weeklyActivity > 0) {
                //Alert.alert('Congrats!', 'You have submitted your data successfully and helped us to advise you more accurately!')
                Alert.alert('Congrats!', this.state.height + ';' + this.state.weight + ';' + this.state.gender + ';' + this.state.dateOfBirth + ';' + this.state.weeklyActivity + ';')
            } else {
                Alert.alert('Oops!', 'Credentials are invalid. Please try again!')
            }
        } catch (error) {
            alert(error)
        }
    };

    render() {
        return (
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style={{ bottom: 30, width:"80%", justifyContent: 'center', alignItems: 'center' }}>
                        <UserAvatar size="100" name="John Doe" color="#087694" />
                        <Text style={styles.avatar}>john.doe@example.com</Text>
                    </View>
                    <Text style={styles.signup}>Height in cm:</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.height}
                            placeholder='Enter height (cm)'
                            placeholderTextColor="#003f5c"
                            autoCapitalize='none'
                            onChangeText={this.handleHeightChange}
                        />
                    </View>
                    <Text style={styles.signup}>Weight in kg:</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.weight}
                            placeholder='Enter weight (kg)'
                            placeholderTextColor="#003f5c"
                            autoCapitalize='none'
                            onChangeText={this.handleWeightChange}
                        />
                    </View>
                    <Text style={styles.signup}>Gender:</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.gender}
                            placeholder='Enter Gender'
                            placeholderTextColor="#003f5c"
                            autoCapitalize='none'
                            onChangeText={this.handleGenderChange}
                        />
                    </View>
                    <Text style={styles.signup}>Weekly activity in minutes:</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.weeklyActivity}
                            placeholder='Enter weekly activity (minutes)'
                            placeholderTextColor="#003f5c"
                            autoCapitalize='none'
                            onChangeText={this.handleWeeklyActivityChange}
                        />
                    </View>
                    <Text style={styles.signup}>Date of birth:</Text>
                    <DatePicker
                        style={{width: SCREEN_WIDTH * 0.8, backgroundColor: 'white', borderRadius: 3,height: 50}}
                        date={this.state.dateOfBirth}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate="2015-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={styles.dateInputStyles}
                        onDateChange={(dateOfBirth) => {this.setState({dateOfBirth: dateOfBirth})}}
                    />

                    <TouchableOpacity style={styles.loginBtn} onPress={this.onSubmit}>
                        <Text style={styles.loginText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0C9D6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView:{
        width:"80%",
        borderRadius: 3,
        backgroundColor:"#fff",
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"black"
    },
    avatar:{
        color:"white",
        fontSize:16,
        fontWeight: "bold",
        marginTop: 6
    },
    loginBtn:{
        width:"80%",
        borderRadius: 3,
        backgroundColor:"#087694",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white",
        fontWeight: "bold"
    },
    signup:{
        width:"80%",
        color:"white",
        fontSize:16,
        fontWeight: "bold",
        justifyContent: 'left',
        alignItems: 'left',
        bottom: 4
    },
    dateInputStyles: {
        dateIcon: {
            position: 'absolute',
            left: 14,
            top: 8,
            marginLeft: 0
        },
        dateInput: {
            top: 6,
            borderColor: "#fff",
        }
    }
});