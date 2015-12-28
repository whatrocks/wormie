const host = 'http://wormie-4-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-4-dev.elasticbeanstalk.com/auth';
const wormieHost = 'http://localhost:7878';

const urls = {
	wormholes: `${host}/wormholes/`,
	submissions: `${host}/submissions/`,
	users: `${host}/users/`,
  usersByFacebookID: `${host}/users/fb/`,
	accounts: `${host}/accounts/`,
  convertToken: `${authHost}/convert\-token/`,
  discover: `${host}/discover/`,
  createWormie: `${wormieHost}/wormie/`,
  createHeart: `${wormieHost}/heart/`,
  getWormie: `${wormieHost}/static/`,
  getHeart: `${wormieHost}/static/heart/`,
}

export default urls;
