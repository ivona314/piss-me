import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text, Alert} from 'react-native'
import { SocialIcon } from 'react-native-elements'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleEmailChange = email => {
        this.setState({ email: email })
    };

    handlePasswordChange = password => {
        this.setState({ password: password })
    };

    onLogin = () => {
        try {
            if (this.state.email.length > 0 && this.state.password.length > 0) {
                this.props.navigation.navigate('App')
            } else {
                Alert.alert('Oops!', 'Credentials are invalid. Please try again!')
            }
        } catch (error) {
            alert(error)
        }
    };

    goToSignup = () => this.props.navigation.navigate('Signup');
    render() {
        return (
            <DismissKeyboard>
                <View style={styles.container}>
                    <Text style={styles.logo}>CheckIT</Text>
                    <View style={styles.socialContainer}>
                        <SocialIcon type='twitter'/>
                        <SocialIcon type='facebook'/>
                        <SocialIcon type='google'/>
                    </View>
                    <Text style={styles.labelOr}>OR</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.email}
                            placeholder='Enter email'
                            placeholderTextColor="#003f5c"
                            autoCapitalize='none'
                            onChangeText={this.handleEmailChange}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            value={this.state.password}
                            placeholder='Enter password'
                            placeholderTextColor="#003f5c"
                            onChangeText={this.handlePasswordChange}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToSignup}>
                        <Text style={styles.signup}>Not registered? Sign up now</Text>
                    </TouchableOpacity>
                </View>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#2F4F4F",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#fff",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:16,
        fontWeight: "bold"
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#2F4F4F",
        borderRadius:25,
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
        color:"white",
        fontSize:16,
        fontWeight: "bold"
    },
    socialContainer:{
        flexDirection: 'row',
    },
    labelOr:{
        marginTop:20,
        marginBottom:25,
        color:"white",
        fontSize:16,
        fontWeight: "bold"
    }
});