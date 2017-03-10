import * as types from './mutation-types';
import $api from 'api'

var state = {
	profile: {

	}
};

const actions  = {
	[types.GET_ACCOUNT] ({ commit, dispatch}) {
		return new Promise(( resolve, reject ) => {
			$api.get('/Profile/getProfile')
				.then( data => {
					commit(types.GET_ACCOUNT, data.profile);
					resolve(data.profile);
				}, data => {
					reject(data);
				});
		});
	}
};

const mutations = {
	[types.GET_ACCOUNT] (state, profile) {
		state.profile = {...profile};
	}
};

export default {
	state,
	actions,
	mutations
}