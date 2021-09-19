import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Expo from 'expo';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { useIsFocused } from "@react-navigation/core";


function  AddTab(props) {
    
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [audio, setAudio] = useState(null);
    const [data, setData] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
        }else {
          return () => {
            setImage(null);
            setVideo(null);
            setAudio(null);
            setData(null);
          }
        }
    }, [isFocused]);

    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type == 'success') {
            const photoData = new FormData();
            var nameArray = result.name.split(".");
            var dataType = nameArray[nameArray.length - 1];
            if(dataType == "jpg" || dataType == "png" || dataType == "webp"){
              var type = "image/"+dataType;
              console.log(type);
              photoData.append("file", {
                uri: result.uri,
                name: result.name,
                type: ""+type
              });
              setImage(result.uri);
              setVideo(null);
              setAudio(null);
            }
            else if (dataType == "mp3" || dataType == "ogg" || dataType == "m4a"){
              var type = "audio/"+dataType;
              console.log(type);
              photoData.append("file", {
                uri: result.uri,
                name: result.name,
                type: ""+type
              });
              setAudio(result.uri);
              setImage(null);
              setVideo(null);
            }
            else if(dataType == "mp4"){
              var type = "video/"+dataType;
              console.log(result.name);
              photoData.append("file", {
                uri: result.uri,
                name: result.name,
                type: "video/mp4"
              });
              console.log(result.uri);
              setVideo(result.uri);
              setImage(null);
              setAudio(null);
            }else {
              alert("Wrong format");
            }
            setData(photoData);

        }
    };

    const save = async () => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = e => {
          if (xhr.readyState !== 4) {
            return;
          }

          if (xhr.status === 200) {
            console.log('200');
            setData(null);
          } else {
            console.log(xhr.headers);
          }
      };
      xhr.open("POST", 'http://192.168.100.14:8080/uploadFile');
      xhr.setRequestHeader('Authorization', 'Bearer '+ props.jwt);
      xhr.send(data);

    }


    if(data == null){
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.loginBtn} onPress = {pickImage}>
                <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Pick an image from camera roll</Text>
           </TouchableOpacity>
        </View>
      );
    }else {
      return (
        <View style={styles.container}>
          {image && <Image source={{ uri: image }} style={{marginTop: 50, width: '100%', height: 500 }} />}
          {audio && <VideoPlayer
                    style={{marginTop: 50, width: 500, height: 500 }}
                    videoProps={{
                        dataType: "audio/mp3",
                        shouldPlay: true,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        source: {
                        uri: audio,
                        },
                        posterSource: require('../pictures/suncokreti.jpg'),
                        posterStyle: {width: 400, height: 400 }
                    }}
                    />}
          {video && <VideoPlayer
                    style={{marginTop: 50, width: 500, height: 500 }}
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        source: {
                        uri: video,
                        },
                    }}
                    />}
          <TouchableOpacity style={styles.loginBtn} onPress = {save}>
                <Text style={{color:'#D7DBDD', fontWeight: 'bold', fontSize:25}}>Save</Text>
           </TouchableOpacity>
          
        </View>
      );
    }
}

const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt, settings: state.userSettings.settings}
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