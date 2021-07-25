import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Expo from 'expo';


function  AddTab(props) {
    
    const [image, setImage] = useState(null);
 /*   useEffect(() => {
        (async () => {
        if (Platform.OS !== //'web'
            'android'
            ) {
              const { status } = await Camera.requestPermissionsAsync();
              setHasPermission(status === 'granted');
        }
        })();
    }, []);
*/
    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        //var base64File= await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64'  });

        //console.log(base64File);
        /*
        await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaTypeOptions.All],
        allowsEditing: true,
        //aspect: [4, 3],
        //quality: 1,
        base64 : true,
        
        });
        */
        if (true) {
          /*
            var str = base64File;
            var uri = ''+result.uri;
            var name= result.name;
            */
            const obj = new FormData();

            obj.append('file', {
                uri: result.uri,
                type: result.type,
                name: result.name
            });
            
            //var imguri='data:image/png;base64,'+base64File;
            setImage(result.uri);
            console.log(result.name);
            fetch('http://192.168.100.14:8080/uploadFile', {
              method: 'POST',
              headers: {
                //Accept: 'application/json',
                //'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ props.jwt
              },


              body: 
              obj
              /*
               JSON.stringify({
                username: str,
                name: name,
              }),
              */
            })
            .then((response) => {
              console.log(response.status);
            })
            .catch((error) => console.log(error));

 
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