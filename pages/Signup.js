import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { Input } from 'react-native-elements';

function Signup({ navigation }) {
    return (
      <View style={styles.container}>
               <ImageBackground source={require('../pictures/suncokreti.jpg')} style={styles.login}>
                  <View style={styles.login2}>
                      <Image source={require('../pictures/login.png')} style={styles.image}/>
                      <Input  placeholder='Name' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 50}}/>
                      <Input  placeholder='Last name' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 25}}/>
                      <Input  placeholder='E-mail' errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 25}}/>
                      <Input  placeholder='Password' secureTextEntry={true}  errorStyle={{ color: 'red' }} errorMessage=''  style={{marginTop: 25}}/>
                      <Text style={{marginTop:50, color:'#828A8A' }}>You already have account?  <Text style={{color:'#CA6F1E'}} onPress = {() => navigation.navigate('Login')}>Sign in.</Text></Text>
                      <TouchableOpacity style={styles.loginBtn}>
                          <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Signup</Text>
                      </TouchableOpacity>
                   </View>
               </ImageBackground>
      </View>
    );
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
        justifyContent: "center",
        marginTop : 40
      },
    login2:{
        width: 380,
        height: 680,
        backgroundColor : "#D7DBDD"
      },
    loginBtn:{
        width: '100%',
        height:50,
        marginTop: 50,
        alignSelf: "center",
        backgroundColor: '#535757',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    
    
  }
  );

export default Signup;