import React, {
  Component,
  SegmentedControlIOS,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import MapExplore from '../containers/MapExplore';
// import MapExample from '../components/MapExample';
import FeedList from '../containers/FeedList';
import Settings from '../containers/Settings';

// var focus = <MapExample/>;

class Explore extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      focus: <MapExplore navigator={this.props.navigator}/>
    }
  }

  goToSettings(){
    this.props.navigator.push({
      component: Settings,
    });
  }

  render() {
    var { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableHighlight
            onPress={() => {
              this.goToSettings();
            }}
            underlayColor='#39247F'>
            <Image 
              style = {styles.profilePic}
              source = {{uri: (currentUser) ? currentUser.picture_url : ""}}
            />
          </TouchableHighlight>
          <Text style={styles.title}>Explore</Text>
          <SegmentedControlIOS 
            values={['Map', 'List']}
            style={styles.segmentedControl}
            tintColor="white"
            selectedIndex={0} 
            onChange={this._onChange.bind(this)}/>
        </View>
        {this.state.focus}
      </View>
    );
  }

  _onChange(event) {
    console.log("click:", event.nativeEvent.value);
    var touchEvent = event.nativeEvent.value;
    
    if ( touchEvent === "Map") {
      this.setState({
        focus: <MapExplore navigator={this.props.navigator}/>
      });
    } else {
      this.setState({
        focus: <FeedList navigator={this.props.navigator}/>
      });
    }
  }

};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  row: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#39247F',
    height: 55
  },
  profilePic: {
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  title:{
    fontFamily: 'Lato-Bold',
    marginTop: 4,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    flex:1,
  },
  segmentedControl:{
    marginRight: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    width: 100,
  }
});

export default Explore;
