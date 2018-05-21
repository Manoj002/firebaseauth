import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-fir-userlogin-44527.cloudfunctions.net';

class SignUp extends React.Component {

    state={ phone: ''}

    handleSubmit =  async() => { // async resembles asynchronous
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone }) 
            // await means wait till the promise is resolved
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
            // this request is not started until above request and promise is resolved
        } catch(err) {
            console.log(err)
        }
    }

    // THE CODE above and below both are equivalent

    // handleSubmit = () => {
    //     axios.post(`${ROOT_URL}/createUser`, {
    //         phone: this.state.phone
    //     })
    //         .then(() => {
    //             axios.post(`${ROOT_URL}/requestOneTimePassword`, {
    //                 phone: this.state.phone
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }
    
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

                <Button 
                    onPress={this.handleSubmit}
                    title ="Submit" 
                />

            </View>
        )
    }
}

export default SignUp;