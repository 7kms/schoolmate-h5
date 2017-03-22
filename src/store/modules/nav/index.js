import * as types from './mutatuon-types';
var state = {
    list: [
        {
            title: '校友活动',
            icon: require('../../../assets/images/icon-activity.png'),
            activeIcon: require('../../../assets/images/icon-activity-on.png'),
            path: '/activity'
        },
        {
            title: '校友资源',
            icon: require('../../../assets/images/icon-help.png'),
            activeIcon: require('../../../assets/images/icon-help-on.png'),
            path: '/interact',
            alias:'/'
        },
        {
            title: '校友圈子',
            icon: require('../../../assets/images/icon-moments.png'),
            activeIcon: require('../../../assets/images/icon-moments-on.png'),
            path: '/moments'
        },
        {
            title: '我的',
            icon: require('../../../assets/images/icon-mine.png'),
            activeIcon: require('../../../assets/images/icon-mine-on.png'),
            path: '/mine'
        }
    ]
};
const getters = {
    [types.GET_NAV] (state) {
        return Object.assign([], state.list);
    }
}
export default {
    state,
    getters
}
