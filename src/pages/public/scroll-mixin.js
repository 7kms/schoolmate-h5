export default {
    computed: {
        noScroll () {
            return this.loading || this.noMoreData;
        }
    },
    beforeRouteLeave (to, from, next) {
        if (to.name != 'column-detail') {
            this.$store.dispatch('activity/RESET_COLUMN_LIST');
        }
        next();
    }
}
