import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';

function  AddTab(props) {
    
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
        if (Platform.OS !== //'web'
            'android'
            ) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaTypeOptions.Images],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64 : true,
        
        });

        if (!result.cancelled) {
            var str = ''+result.base64;
            var uri = ''+result.uri;
            var spl_name= uri.split("/");
            var name= spl_name[spl_name.length-1];

            var imguri='data:image/png;base64,'+result.base64;
            setImage(imguri);
            console.log(name);
            fetch('http://192.168.100.14:8080/uploadFile', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ props.jwt
              },
              timeout: 600000,
              body: JSON.stringify({
                username: str,
                password: name,
              }
              ),
            })
            .then((response) => {
              console.log(response.status);
            });

 
        }
    };





    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.loginBtn} onPress = {pickImage}>
                <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Pick an image from camera roll</Text>
           </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{marginTop: 50, width: '100%', height: 500 }} />}
          
        </View>
      );


}

const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt}
  };
  
export default connect(mapStateToProps)(AddTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // flexDirection: "column",
        backgroundColor: "#D7DBDD",
        alignItems: "center",
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