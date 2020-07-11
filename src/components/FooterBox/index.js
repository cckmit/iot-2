import FooterBox from './FooterBox.vue';
import FooterItem from './FooterItem.vue';

FooterBox.install = (Vue) => {
    Vue.component(FooterBox.name, FooterBox);

    Vue.component(FooterItem.name, FooterItem);
}

export default FooterBox;