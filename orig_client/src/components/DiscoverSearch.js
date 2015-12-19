import React, {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ListView,
} from 'react-native';

import { Icon } from 'react-native-icons';
import Topbar from './Topbar';
import SearchLocation from './SearchLocation';
import DiscoverRequest from '../containers/DiscoverRequest';


var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 4,
    marginTop: 4,
    fontFamily: 'Lato-Regular',
  },
  infoContainer: {
    // color: 'black',
    alignSelf: 'flex-start'
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginTop: 10,
    marginBottom: 5,
  },
  handle: {
    fontSize: 16,
    color: '#727272'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginTop: 2,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  button: {
    flex: 1,
    flexDirection:'column',
    alignItems:'flex-end',
    paddingRight: 7,
  },
  ionic: { 
    width: 30, 
    height: 30,
  },
  singleButton: {
    width: 172,
    height: 138,
    marginBottom: 10,
    backgroundColor: '#55378F',
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 25,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 20,
    paddingLeft: 20,
    alignSelf: 'center'
  },
  floatView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 88,
    left: 0,
    backgroundColor: 'green',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 20,
    marginTop: 2,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginRight: 10
  },
  ratingImage: {
    height: 20,
    width: 100,
    paddingLeft: 5,
    margin: 5,
  },
  name: {
    color: '#39247F',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
    marginTop: 4,
    marginRight: 15
  },
});

class DiscoverSearch extends React.Component{

  setTarget(data) {
    let { setCurrentTarget } = this.props;
    setCurrentTarget(data);
    let name = data.name;
    this.props.navigator.push({
      component: DiscoverRequest,
      passProps: {topbarTitle: name}
    });
  } 

  // <View><Text> {rowData.location.coordinate.longitude || ''} </Text></View>
  // <View><Text> {rowData.location.coordinate.latitude || ''} </Text></View>

  separator(){
    let { responseList } = this.props;
    if (responseList[0].location['display_address'].length === 0) {
      return (
        <View />
      )
    } else {
      return (
        <View style={styles.separator} />
      );      
    }
  }

  _renderRow(rowData){
    let list = rowData.location['display_address'].map((address, index) => {
      return (
        <Text key={index} style={{fontFamily: 'Lato-Regular'}}> { address } </Text>
      );
    })
    return (
      <View>
        <TouchableHighlight
          style={styles.container}
          onPress={this.setTarget.bind(this, rowData)}
          underlayColor = 'rgba(222,93,74,0.1)'
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image 
              source = {{uri: rowData['image_url']}} 
              style={styles.image}
            />
            <View>
              <View
                style={{alignSelf: 'flex-end'}}
              >
                <Text style={styles.name}> {rowData.name || ''} </Text>
                <Image 
                  source = {{uri: rowData['rating_img_url']}} 
                  style={styles.ratingImage}
                />
                { list }
              </View>
            </View>
          </View>
        </TouchableHighlight>
        { this.separator() }
      </View>
    )
  }

  _renderList(ds) {
    let { responseList } = this.props;
    var rows = responseList;

    if (rows) {
      return (
        <ListView
          dataSource={ds.cloneWithRows(rows)}
          renderRow={this._renderRow.bind(this)}
          style={{
            backgroundColor:'white',
            position: 'absolute',
            top: 120,
            order: 99,
            width: 380,
            height: 520,
          }}
        />
      );
    } else {
      return <View />
    }
  }

  render() {
    let { responseList, setCurrentTerm, setCurrentLocation } = this.props;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    return (
      <View
        style={{marginTop: 20}}
      >
        <Topbar
          topbarTitle={this.props.topbarTitle}
          navigator={this.props.navigator}
        />
        { this._renderList(ds) }
        <SearchLocation
          setCurrentTerm={this.props.setCurrentTerm} 
          setCurrentLocation={this.props.setCurrentLocation}
          searchInfo={this.props.searchInfo}
          category={this.props.category}
          term={this.props.term}
          location={this.props.location}
          style={{
            position: 'absolute',
            top: 20,
          }}
        />
      </View>
    );
  }
}

DiscoverSearch.propTypes = {
  responseList: React.PropTypes.object.isRequired
}

export default DiscoverSearch;
