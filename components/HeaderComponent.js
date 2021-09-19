import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import {deleteUserCredentials} from '../reducers/dataReducer'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function  HeaderComponent(props)  {
    const navigation = useNavigation();

    const logout = () => {
       console.log("logout");
       console.log(props.jwt);
       fetch('http://192.168.100.14:8080/logoutUser', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ props.jwt
        },
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
          
          navigation.navigate('Login');
          deleteUserCredentialss(data);
          return true;
        }
        else {
            alert('Logout failed!');
            return false;}
      })
      ;

    }
    const openSettings = () => {
      navigation.navigate('Settings');
    }
    const deleteUserCredentialss = (data) =>
    {
        props.dispatch({type: deleteUserCredentials, payload: data});
    }
    return (
        <View style= {{flexDirection: "column"}}>
            <TouchableOpacity style={styles.settingsBtn} onPress = {openSettings}>
              <Ionicons size= {40} name="settings"></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress = {logout}>
              <Ionicons size= {40} name="power"></Ionicons>
            </TouchableOpacity>

        </View>
        );
}
const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt, settings: state.userSettings.settings}
};
export default connect(mapStateToProps)(HeaderComponent);

const styles = StyleSheet.create({
  settingsBtn:{
    width: 40,
    height:40,
    marginTop: 40,
    marginLeft:250,
    marginBottom:10,
    alignSelf: "center",
    borderRadius: 25,
  },
    loginBtn:{
        width: 40,
        height:40,
        marginTop: -50,
        marginLeft:350,
        marginBottom:10,
        alignSelf: "center",
        borderRadius: 25,
    },
});