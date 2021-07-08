import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import AddTab from './AddTab';
import { connect } from 'react-redux';


class Main extends Component {
  constructor(props) {
    super();
  }
  static navigationOptions = {
    headerShown: false,
  };
    render(){
        return (
             <AppTabsScreen/>
          );
    }
}

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator 
  
  tabBarOptions={{ showLabel:false, activeBackgroundColor:"#B9770E", inactiveBackgroundColor:"#F9E79F" }}>
    <AppTabs.Screen
      name="HomeTab"
      component={HomeTab}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="md-home" size={33} color="#535757" />
        ),
      }}
    />
    <AppTabs.Screen
      name="AddTab"
      component={AddTab}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="md-add-circle-sharp" size={44} color="#535757" />
        ),
      }}
    />
     <AppTabs.Screen
      name="ProfileTab"
      component={ProfileTab}
      options={{
        tabBarIcon: (props) => (
            <FontAwesome name="user-circle-o" size={33} color="#535757" />
        ),
      }}
    />
  </AppTabs.Navigator>
);

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

export default connect() (Main);