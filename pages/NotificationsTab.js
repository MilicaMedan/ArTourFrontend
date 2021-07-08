import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

class NotificationsTab extends React.Component {
    
    render(){
        return (
            <View style={styles.container}>
                     <Text>NotificationsTab</Text>
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
      }
  }
  );
export default NotificationsTab;