import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-fir-userlogin-44527.cloudfunctions.net';

class SignIn extends React.Component {

    state={ phone: '', code: ''}

    handleSubmit = async () => {
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
                // data is an object returned as the promise is resolved   
                // data is used since, it contains a property JSON WEB TOKEN(JWT) and is itself an object
                phone: this.state.phone, code: this.state.code
            })
            
            firebase.auth().signInWithCustomToken( data.token );
        } catch(err) {
            console.log(err);
        }
    }

    render() {

        return(

            <View>
                <View style={{ marginBottom: 10 }}>

                    <FormLabel>
                        Enter phone number
                    </FormLabel>

                    <FormInput 
                        value={ this.state.phone }
                        onChangeText={phone => this.setState({ phone })}
                    />

                </View>

                <View style={{ marginBottom: 10 }}>

                    <FormLabel>
                        Enter code
                    </FormLabel>

                    <FormInput 
                        value={ this.state.code }
                        onChangeText={code => this.setState({ code })}
                    />

                </View>

                <Button 
                    onPress={this.handleSubmit}
                    title ="Submit" 
                />

            </View>
        )
    }
}

export default SignIn;