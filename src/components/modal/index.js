import Modal from './Modal.vue';
import store from '@/store';

Modal.install = (Vue, opt = {}) => {

    let { startId = 0 } = opt;

    let startModalId = 1;

    if (typeof startId === 'number') {
        startModalId = startId;
    }
    else if (process.env.NODE_ENV === "development") {
        console.warn('startId 必须是数字');
    }

    /**
     * 打开一个modal
     * @param options --弹窗配置项
     * @param thisArg --this指向对象
     */
    Vue.prototype.$modal = (options, thisArg) => {
        let { component, data, title, id, actions, btns, beforeClose, open = true } = options;

        //将函数的this指向绑定至调用方指定的对象上
        if (thisArg) {
            if (beforeClose) {
                beforeClose = beforeClose.bind(thisArg);
            }

            if (actions) {
                let newActions = {};

                for (let fnName in actions) {
                    let fn = actions[fnName];
                    newActions[fnName] = fn.bind(thisArg);
                }

                actions = newActions;
            }
        }

        //modal实例对象
        const modal = {
            id: id || startModalId++,
            component,
            data,
            title,
            visible: false,
            actions,
            btns,
            beforeClose,

            close() {
                store.dispatch('modal/close', this.id);
            },

            open() {
                store.dispatch('modal/open', this);
            }
        }

        //添加modal到store
        store.dispatch('modal/add', modal);

        //打开modal(直接将modal的visible赋值为true的话,无法触发el-dialog的打开动画,体验稍差,因此在nextTick中open)
        if (open === true) {
            Vue.nextTick(() => {
                store.dispatch('modal/open', modal);
            });
        }

        return modal;
    }

    /**
     * 关闭modal
     * @param modal 弹窗对象或者弹窗id
     */
    Vue.prototype.$modal.close = (modal) => {
        modal = (typeof modal === 'object') ? modal.id : modal;

        store.dispatch('modal/close', modal)
    }

    /**
     * 关闭所有modal
     */
    Vue.prototype.$modal.closeAll = () => {
        store.dispatch('modal/removeAll')
    }

    /**
     * 根据id获取modal对象
     */
    Vue.prototype.$modal.get = (id) => {

        const modal = store.state.modal.modal_list.find(m => m.id === id);

        return modal ? {
            instance: modal,
            close: function () {
                store.dispatch('modal/close', modal.id)
            }
        } : null;
    }
}

export default Modal;