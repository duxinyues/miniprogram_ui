const util = require("../../utils/util");
module.exports = Behavior({
    properties: {
        isShow: {
            type: String
        }
    },
    data: {
        maskzIndex: util.getBiggerzIndex(),
        uiIndec: util.getBiggerzIndex(),
        clickToHide: true
    },
    attached: function () { },
    methods: {
        onMaskEvent: function (e) {
            if (this.data.maskEventName) {
                this.triggerEvent(this.data.maskEventName, e, {})
            }
        }
    }
})