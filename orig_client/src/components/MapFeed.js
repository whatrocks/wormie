var React = require('react-native');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

var {
  StyleSheet,
  Component,
  View,
  StatusBarIOS,
  Image,
} = React;

class MapFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      mixins: [Mapbox.Mixin]
    };
  }
  
  getInitialState() {

    return {
      center: {
        latitude: 37.7861400,
        longitude: -122.4057540
      },
      zoom: 11,
      annotations: [],
    };
  }

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  }

  onRegionWillChange(location) {
    console.log(location);
  }

  onUpdateUserLocation(location) {
    console.log(location);
  }

  onOpenAnnotation(annotation){
  }

  // 
  onRightAnnotationTapped(e) {
    console.log(e);
  }

  onLongPress(location){
    console.log('long pressed', location);
  }

  render() {
    StatusBarIOS.setHidden(true);
    console.log("Rendering map");
    console.log("state is:", this.state);
    return (
      <View style={styles.container}>
        <Mapbox
          style={styles.map}
          direction={0}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          ref={mapRef}
          accessToken={mapboxConfig.accessToken}
          styleURL={mapboxConfig.styleURL}
          userTrackingMode={false}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress} />
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
});

export default MapFeed;
  