import React, {
  Component,
  TabBarIOS,
  StyleSheet,
} from 'react-native';
import Profile from '../containers/Profile';
import FeedList from '../containers/FeedList';
import Explore from '../containers/Explore';
// import api from '../Utils/api';


class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feeds'
    }
  }

  render() {
    let { setClickedProfile, currentUser } = this.props;
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
