import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { Input } from 'react-native-elements';
import {Formik} from 'formik'
import {changeUserCredentials} from '../reducers/dataReducer'
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super();
  }
  static navigationOptions = {
    headerShown: false,
  };


  log = (userData) => {
    fetch('http://192.168.100.14:8080/signup', {
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
       // flexDirection: "column",
        backgroundColor: "#D7DBDD",
        alignItems: "center",
        justifyContent: "center"
      },
    image: {
        width: 140,
        height: 140,
        borderRadius: 140/2,
        marginTop: -70,
        alignSelf: "center"
        
    },
    login:{
        width: 400,
        height: 700,
        alignItems: "center",
        backgroundColor : "#424949",
        justifyContent: "center"
      },
    login2:{
        width: 380,
        height: 680,
        backgroundColor : "#D7DBDD"
      },
    loginBtn:{
        width: '100%',
        height:50,
        marginTop: 30,
        alignSelf: "center",
        backgroundColor: '#535757',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    
    
  }
  );

export default connect() (Signup);