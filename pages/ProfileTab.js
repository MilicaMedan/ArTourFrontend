import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView , Button } from 'react-native';
import VoteComponent from '../components/CardComponent';
import { Rating, AirbnbRating } from 'react-native-elements';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { Buffer } from "buffer";
import { useIsFocused } from "@react-navigation/core";
import {serverUrl} from '../serverSettings/serverSettings';
import {styles} from '../styles/profile';
import { connect } from 'react-redux';


function  ProfileTab(props)  {
    const [images, setImages] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            return () => {
                setImages(null);
              };

        }else {
            return () => {
                setImages(null);
              };
        }
    }, [isFocused]);

    const loadImages = async () => {
        var imagess = await fetch(
            serverUrl+'/getMyPosts',
            {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer '+ props.jwt
                }
            }
        ).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((response) => {
            return response;
        });
        
        if(images == null || (images != null && imagess != null && images.length != imagess.length)){
           
            setImages(imagess);
        }
    }
    if(images == null && isFocused == true){
        loadImages();
    }

    if(images != null){
       var elements = [];
       for (var i = 0; i < images.length; i++) {
            var nameArray = images[i].name.split(".");
            var dataType = nameArray[nameArray.length - 1];
            if(dataType == "jpg" || dataType == "png" || dataType == "webp"){
                elements.push(
                    <Image 
                    key = {images[i].name} 
                    source={{ uri: serverUrl+'/image/?name='+images[i].name}} 
                    style={{width: 300, height: 300, marginBottom: 0 }} 
                    />,
                    <VoteComponent key = {images[i].id} id = {images[i].id} jwt={props.jwt} israted={images[i].ratedByYou} averageMark = {images[i].averageMark} ></VoteComponent>,

                );
            }else if (dataType == "mp3" || dataType == "ogg" || dataType == "m4a"){
                elements.push(
                    <VideoPlayer
                    key = {images[i].name}
                    style={{width: 300, height: 300, marginBottom: 0  }}
                    videoProps={{
                        dataType: "audio/mp3",
                        shouldPlay: false,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        source: {uri: serverUrl+'/audio/?name='+images[i].name},
                        posterSource: require('../pictures/suncokreti.jpg'),
                        posterStyle: {width: 400, height: 400 }
                    }}
                    />,
                    <VoteComponent key = {images[i].id} id = {images[i].id} jwt={props.jwt} israted={images[i].ratedByYou} averageMark = {images[i].averageMark}></VoteComponent>
                );
            }else if(dataType == "mp4"){
                elements.push(
                    <VideoPlayer
                    key = {images[i].name}
                    style={{width: 300, height: 300, marginBottom: 0  }}
                    videoProps={{
                        shouldPlay: false,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        source: {uri: serverUrl+'/video/?name='+images[i].name},
                    }}
                    />,
                    <VoteComponent key = {images[i].id} id = {images[i].id} jwt={props.jwt} israted={images[i].ratedByYou} averageMark = {images[i].averageMark}></VoteComponent>
                );
            }
            
        }
        return (
            <ScrollView  style={styles.container}>
                <View style = {styles.container1}>
                    {elements}
                </View>
            </ScrollView >
        );
    }else {
        return(
            <ScrollView  contentContainerStyle={styles.container}>
                <Text>Loading...</Text>
            </ScrollView >
        );
    }
    
}
const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt, settings: state.userSettings.settings}
  };
  
export default connect(mapStateToProps)(ProfileTab)

