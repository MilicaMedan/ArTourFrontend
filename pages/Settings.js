import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { changeUserSettings} from '../reducers/dataReducer'
import {Picker} from '@react-native-picker/picker';
import {serverUrl} from '../serverSettings/serverSettings';
import {styles} from '../styles/settings';
import { connect } from 'react-redux';


function  Settings(props)  {
  
  const [settings, setSettings] = useState(props.settings);

  const changeSettings = () => {
    fetch(serverUrl+'/changeSettings', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ props.jwt
        },
        body: JSON.stringify({
            settings : settings
        }),
      }).then((response) => {
        if (response.status == 200) {
          return response.json();
        } 
        else return [];
      })
      .then(response => 
      {
          var data = {...response, settings: response.settings}
          changeUserSettingss(data);
          props.navigation.navigate('Main');
          return true;
      });
  }
  const changeUserSettingss = (data) =>
  {
      props.dispatch({type: changeUserSettings, payload: data});
  }
  
    var element = [];
    if(settings == 0){
        element.push(
            <Text style = {{marginTop:100,marginLeft:130}} key='0'>Dont play</Text>
        );
    }else if(settings == 1){
        element.push(
            <Text style = {{marginTop:100,marginLeft:130}} key='1'>Play</Text>
        );
    }else if(settings == 2){
        element.push(
            <Text style = {{marginTop:100,marginLeft:130}} key='2'>Play with best mark</Text>
        );
    }
    return (
    <View>
        <Text style = {{marginLeft:50, marginTop:200, marginBottom:20, fontSize: 20, fontWeight: 'bold', color: '#7B7D7D'}}>Pick how to play video/audio.</Text>
        {element}
        <Picker
            style = {{ height: 100, width: 50, marginLeft: 250, marginTop: -60}}
            mode = 'dropdown'   
            selectedValue={0}
            onValueChange={(itemValue, itemIndex) =>
                setSettings(itemValue)
            }>
            <Picker.Item label="" value="5" />
            <Picker.Item label="Dont play" value="0" />
            <Picker.Item label="Play" value="1" />
            <Picker.Item label="Play with best mark" value="2" />
        </Picker>
        <TouchableOpacity style={styles.save} onPress = {changeSettings}>
            <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Save settings</Text>
        </TouchableOpacity>
    </View>
    );
   
}




  const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt, settings: state.userSettings.settings}
  };
  
export default connect(mapStateToProps)(Settings)