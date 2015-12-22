import Facebook from '../containers/Facebook';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';
import Signup from '../containers/Signup';
import Navbar from '../containers/Navbar';

var STORAGE_KEY = 'facebook';

class Login extends Component {
  
  componentDidMount() {
      this._loadInitialState().done()  
  }

  async _loadInitialState() {
    var {storeToken} = this.props;
    var value = await AsyncStorage.getItem(STORAGE_KEY);
    if ( value !== null) {
      console.log("The value is: ", value);
      storeToken(value);

    } else {
      console.log("Nothing stored");
    }
  }

  _getCurrentUser() {
      var { getUserDetails, login } = this.props;

      console.log("login.facebook");

      getUserDetails(() => {
        this.props.navigator.push({
          component: Navbar,
        });
      });
  }

  _checkFacebookStatus() {
    
    var { login, getUserDetails } = this.props;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("login.facebook is: ", login.facebook);

    if ( login.facebook !== "init" ) {

      // this._getCurrentUser();
          this.props.navigator.push({
          component: Navbar,
        });

      
    } else if ( login.facebook === "init" ) {

      // show facebook login
      return (
        <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
      )

    } else {

      return (
        <ActivityIndicatorIOS
          animating = {true}
          color = 'white'
          size = 'large'
        ></ActivityIndicatorIOS>
      )
      
    }


  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.splashImage}>
          <Text style={styles.logo}>WORMIE</Text>
        </View>
        <Text style={styles.subtitle}>LETS GO EXPLORING</Text>
        {this._checkFacebookStatus()}
      <View style={styles.bottomLayer}>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39247F'
  },
  logo: {
    fontSize: 50,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Lato-Semibold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    flex: 1
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: '#39247F'
  },
  facebookButton: {
    paddingBottom: 50
  },
  bottomLayer: {
    margin: 30
  }
});

export default Login;
