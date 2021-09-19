import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { Input } from 'react-native-elements';
import {Formik} from 'formik'
import {changeUserCredentials} from '../reducers/dataReducer'
import { connect } from 'react-redux';
import {serverUrl} from '../serverSettings/serverSettings';
import {styles} from '../styles/signup';

class Signup extends Component {
  constructor(props) {
    super();
  }
  static navigationOptions = {
    headerShown: false,
  };


  log = (userData) => {
    fetch(serverUrl+'/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          mail: userData.mail,
          name: userData.name,
          lastname: userData.lastname,
          username: userData.username,
          passwordHash: userData.password,
        }),
      }).then((response) => {
        if (response.status == 200) {
          return response.json();
        } 
        else {console.log(response.status); return [];}
      })
      .then(response => 
      {
        if (response.jwt!= null)
        {
          var data = {...response, jwt: response.jwt}
          this.changeUserCredentials(data);
          this.props.navigation.navigate('Main');
          return true;
        }
        else {
            return false;}
      })
      ;
      
  }

  changeUserCredentials(data)
  {
      this.props.dispatch({type: changeUserCredentials, payload: data})
  }

  render(){
      return (
        <View style={styles.container}>
        <ImageBackground source={require('../pictures/suncokreti.jpg')} style={styles.login}>
           <View style={styles.login2}>
              <Formik initialValues={{name: '', lastname: '', mail: '',username: '', password: ''}} onSubmit={(values, actions) => {
                          
                          if (!this.log(values)){
                            actions.resetForm({name: '', lastname: '', mail: '', username: '', password: ''});
                          }
                        }}>
                    { (props) => (  
                        <View>
                            <Image source={require('../pictures/login.png')} style={styles.image}/>
                            <Input  placeholder='name' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 100}} onChangeText={props.handleChange('name')}
                                value={props.values.name}/>
                            <Input  placeholder='lastname' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 10}} onChangeText={props.handleChange('lastname')}
                            value={props.values.lastname}/>
                            <Input  placeholder='mail' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 10}} onChangeText={props.handleChange('mail')}
                                value={props.values.mail}/>
                            <Input  placeholder='username' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 10}} onChangeText={props.handleChange('username')}
                                value={props.values.username}/>
                            <Input  placeholder='password' secureTextEntry={true}  errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 10}} onChangeText={props.handleChange('password')}
                                value={props.values.password}/>
                            <Text style={{marginTop:10, color:'#828A8A' }}>Already have account?  <Text style={{color:'#CA6F1E'}} onPress = {() => this.props.navigation.navigate('Login')}>Sign in</Text></Text>
                            <TouchableOpacity style={styles.loginBtn} onPress = {props.handleSubmit}>
                                <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Sign up</Text>
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


export default connect() (Signup);