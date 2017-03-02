<style lang="less" module>

</style>
<template>
    <mt-popup
            v-model="showPicker"
            position="bottom"
            popup-transition="popup-fade">
        <mt-picker :slots="slots" :showToolbar="true" :rotateEffect="true" @change="selectPlace">
            <span></span><span @click="selectPlace">确定</span>
        </mt-picker>
    </mt-popup>
</template>
<script>
    import { placeObj } from '../../data';
    export default {
        props:{
            slots:{

            }
        },
        computed:{

        },
        data(){
            return {
                showPicker: false
            }
        }
    }
</script>