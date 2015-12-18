var React = require('react-native');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

// Youtube
var YouTube = require('react-native-youtube');
var Video = require('react-native-video');

// Potential clicked pages
import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole';
import Profile from '../containers/Profile';

var {
  StyleSheet,
  Component,
  Text,
  View,
  StatusBarIOS,
  Image,
} = React;

var MapExplore = React.createClass({

  mixins: [Mapbox.Mixin],

  componentWillMount() {
    var { refreshFeedData, currentWormhole } = this.props;
    refreshFeedData(() => {
      this.getWormholeAnnotations();
    });
  },

  getWormholeAnnotations() {

    var { feed } = this.props;

    var annotations = [];

    for ( var wormhole in feed ) {

     annotations.push({
        coordinates: [ parseFloat(feed[wormhole].latitude), parseFloat(feed[wormhole].longitude)],
        'type': 'point',
        // title: feed[wormhole].title,
        title: feed[wormhole].latitude + ": " + feed[wormhole].longitude,
        subtitle: feed[wormhole].notes,
        rightCalloutAccessory: {
          url: 'https://cldup.com/9Lp0EaBw5s.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: feed[wormhole].requestor.picture_url,
          height: 35,
          width: 35
        },
        // id is the index of the wormhole in the feed
        id: wormhole
      });

    }

    this.addAnnotations(mapRef, annotations);

  },
  
  getInitialState() {

    var { feed, refreshFeedData } = this.props;

    return {
      center: {
        latitude: 37.7861400,
        longitude: -122.4057540
      },
      zoom: 11,
      annotations: [],
    };
  },

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },

  onRegionWillChange(location) {
    // var { currentWormhole } = this.props;
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // console.log(currentWormhole);
    // let { refreshFeedData } = this.props;
    // refreshFeedData();
    // this.getWormholeAnnotations();
  },

  onUpdateUserLocation(location) {
    console.log(location);
  },

  onOpenAnnotation(annotation){
    var {feed, updateCurrentWormhole} = this.props;
    updateCurrentWormhole(feed[annotation.id]);
  },

  // 
  onRightAnnotationTapped(e) {
    console.log(e);
  },

  onLongPress(location){
    console.log('long pressed', location);
  },

  _renderYoutube(){
    
    var { currentWormhole } = this.props;

    var currentWorm = (currentWormhole.requestor) ? currentWormhole : false;

    if ( currentWorm && currentWorm.submissions.length ) {
      return (
        <YouTube 
          videoId={currentWorm.submissions[0].video_url}
          play={false}
          hidden={false}
          playsInline={false}
          showinfo={false}
          modestbranding={true}
          onError={(e)=>{console.log('youtube error: ', e.error)}}
          style={{height: 121, width: 121, marginRight: 5}}
        />

      );
    } else {
      return (
        <Image 
          style={{height: 121, width: 121, marginRight: 5}}
          source = {require('../assets/dsnWormhole.jpg')}
        />

      );
    }
  },

  render: function() {
    var {feed, currentWormhole } = this.props;
    StatusBarIOS.setHidden(true);
    return (
      <View style={styles.container}>
        <Mapbox
          style={styles.map}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={mapboxConfig.accessToken}
          styleURL={mapboxConfig.styleURL}
          userTrackingMode={this.userTrackingMode.follow}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress} />
        <View style={styles.row}>
          {this._renderYoutube()}
          <View>
            <Text style={styles.cardTitle}>{currentWormhole.title}</Text>
            <View style={styles.row}>
              <Image 
                    style = {styles.profilePic}
                    source = {{uri: (currentWormhole.requestor) ? currentWormhole.requestor.picture_url : ""}}
                  />
              <Text style={styles.cardRequestor}>{ (currentWormhole.requestor) ? currentWormhole.requestor.username : ""}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBorder: {
    marginTop: 15,
    height: 1,
    backgroundColor: '#E4E4E4',
  },
  bottomBorder: {
    height: 1,
    backgroundColor: '#E4E4E4',
  },

  map: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 170
  },
  cardTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Lato-Semibold',
    fontSize: 16,
    color: '#3e3e3e',
  },
  cardRequestor: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#727272',
  },
  profilePic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },

});

export default MapExplore;
