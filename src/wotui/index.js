import { Icon, Tab, Tabs, MessageBox} from 'wot-design'

const UIComponents = [Icon, Tab, Tabs, MessageBox]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin