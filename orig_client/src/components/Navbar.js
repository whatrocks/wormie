import React, {
  Component,
  TabBarIOS,
  StyleSheet,
} from 'react-native';
import Profile from '../containers/Profile';
import Discover from '../containers/Discover';
import FeedList from '../containers/FeedList';
import Explore from '../containers/Explore';
// import api from '../Utils/api';


class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feeds'
    };
  }

  componentWillMount() {
    var { currentUser, getUserDetailsForLoggedInUser } = this.props;
    console.log("COMPONENT WILL MOUNT");
    getUserDetailsForLoggedInUser();
  }

  render() {
    let { setClickedProfile } = this.props;

    return (
      <TabBarIOS
        // tintColor="C"
        // barTintColor="black"
        selectedTab={this.state.selectedTab}
      >
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'feeds'}
          icon={{uri:'featured'}}
          onPress={() => {
            this.setState({
              selectedTab: 'feeds',
            });
            // this.goToFeedList.bind(this)
          }}>
          <Explore navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'discover'}
          icon={{uri:'featured'}}
          onPress={() => {
            this.setState({
              selectedTab: 'discover',
            });
            // this.goToFeedList.bind(this)
          }}>
          <Discover navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="contacts"
          selected={this.state.selectedTab === 'profile'}
          icon={{uri:'contacts'}}
          onPress={() => {
            setClickedProfile(currentUser);
            this.setState({
              selectedTab: 'profile',
            });
            // this.goToProfile.bind(this)
          }}>
          <Profile navigator={this.props.navigator} />
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}

export default Navbar;
