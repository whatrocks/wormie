import React, {
  Component,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 0
  },
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
  floatView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 200,
    left: 40,
    backgroundColor: 'green',
  },
})

class SearchLocation extends React.Component{
  
  setTerm(term) {
    debugger;
    let { setCurrentTerm } = this.props;
    setCurrentTerm(term);
  }

  setLocation(location) {
    let { setCurrentLocation } = this.props;
    setCurrentLocation(location);
  }

  render() {
    // predefinedPlaces={[homePlace, workPlace]}
              // { ...userProps }
              // ref="textInput"
              // autoFocus={this.props.autoFocus}
              // style={[defaultStyles.textInput, this.props.styles.textInput]}
              // onChangeText={onChangeText ? text => {this._onChangeText(text); onChangeText(text)} : this._onChangeText}
              // value={this.state.text}
              // placeholder={this.props.placeholder}
              // onFocus={onFocus ? () => {this._onFocus(); onFocus()} : this._onFocus}
              // clearButtonMode="while-editing"

        // <View
        //   style={styles.container}
        // >
        //   <View
        //     style={styles.textInputContainer}
        //   >
        //     <TextInput style={styles.textInput} />
        //   </View>
        // </View>
      // <View
      //   style={{flex:1, flexDirection: 'row'}}
      // >
      // </View>
        // <GooglePlacesAutocomplete
        //   style={styles.textInput}
        //   enablePoweredByContainer={false}
        //   placeholder='Search'
        //   minLength={2} // minimum length of text to search
        //   autoFocus={false}
        //   fetchDetails={true}
        //   onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        //     console.log(data);
        //     console.log(details);
        //   }}
        //   getDefaultValue={() => {
        //     return ''; // text input default value
        //   }}
        //   query={{
        //     // available options: https://developers.google.com/places/web-service/autocomplete
        //     key: 'AIzaSyCNsbBETvV4YWKJED_pBZ_9UKJVwYXcHSs',
        //     language: 'en', // language of the results
        //     types: '(cities)', // default: 'geocode'
        //   }}
        //   styles={{
        //     description: {
        //       fontWeight: 'bold',
        //     },
        //     predefinedPlacesDescription: {
        //       color: '#1faadb',
        //     },
        //     textInput: {
        //       borderRadius: 0,
        //     },
        //     floatView: styles.floatView,
        //     // textInputContainer: {
        //     //   borderTopWidth: 0.1,
        //     //   borderBottomWidth: 0.1,
        //     // },
        //   }}

        //   currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        //   currentLocationLabel="Current location"
        //   nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        //   GoogleReverseGeocodingQuery={{
        //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        //   }}
        //   GooglePlacesSearchQuery={{
        //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        //     rankby: 'distance',
        //     types: 'food',
        //   }}


        //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        // />
    
              // onChange={this.setTerm}
            // this.setLocation(details['formatted_address']);
    return (
      <View>
        <View
          style={styles.container}
        >
          <View
            style={styles.textInputContainer}
          >
            <TextInput 
              style={styles.textInput} 
            />
          </View>
        </View>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCNsbBETvV4YWKJED_pBZ_9UKJVwYXcHSs',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          predefinedPlaces={[homePlace, workPlace]}
        />
      </View>
    );
  }
};
export default SearchLocation
