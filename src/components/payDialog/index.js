import PayApply from './payApply';
import PayCancel from './payCancel';


export default {
    showApply (options) {
        PayApply(options);
    },
    showCancel (options) {
        PayCancel(options);
    }
};

