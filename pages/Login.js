import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { Input } from 'react-native-elements';
import {Formik} from 'formik'
import {changeUserCredentials, changeUserSettings} from '../reducers/dataReducer'
import {serverUrl} from '../serverSettings/serverSettings'
import {styles} from '../styles/login';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super();
  }
  static navigationOptions = {
    headerShown: false,
  };


  log = (userData) => {
    fetch(serverUrl+'/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      }).then((response) => {
        if (response.status == 200) {
          return response.json();
        } 
        else return [];
      })
      .then(response => 
      {
        if (response.jwt!= null)
        {
          var data = {...response, jwt: response.jwt}
          this.changeUserCredentials(data);
          var data = {...response, settings: response.settings}
          this.changeUserSettings(data);
          this.props.navigation.navigate('Main');
          return true;
        }
        else {
            alert('Wrong credentials!');
            return false;}
      })
      ;
      
  }

  changeUserCredentials(data)
  {
      this.props.dispatch({type: changeUserCredentials, payload: data})
  }

  changeUserSettings(data)
  {
      this.props.dispatch({type: changeUserSettings, payload: data})
  }

  render(){
      return (
        <View style={styles.container}>
        <ImageBackground source={require('../pictures/suncokreti.jpg')} style={styles.login}>
           <View style={styles.login2}>
              <Formik initialValues={{username: '', password: ''}} onSubmit={(values, actions) => {
                          
                          if (!this.log(values)){
                            actions.resetForm({username: '', password: ''});
                          }
                        }}>
                    { (props) => (  
                        <View>
                            <Image source={require('../pictures/login.png')} style={styles.image}/>
                            <Input  placeholder='username' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 100}} onChangeText={props.handleChange('username')}
                                value={props.values.username}/>
                            <Input  placeholder='password' secureTextEntry={true}  errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 50}} onChangeText={props.handleChange('password')}
                                value={props.values.password}/>
                            <Text style={{marginTop:50, color:'#828A8A' }}>You don't have account?  <Text style={{color:'#CA6F1E'}} onPress = {() => this.props.navigation.navigate('Signup')}>Sign up.</Text></Text>
                            <TouchableOpacity style={styles.loginBtn} onPress = {props.handleSubmit}>
                                <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Login</Text>
                            </TouchableOpacity>

                        </View>
                    )}
              </Formik>
          </View>
        </ImageBackground>
        </View>
      );
   }
}


export default connect() (Login);