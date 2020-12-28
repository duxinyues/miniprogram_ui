module.exports = Behavior({
    behavior: [],
    properties: {
        isShow: {
            type: String
        }
    },
    data: {},
    attached: function () {

    },
    methods: {
        myBehaviorMethod: function (e) {
            console.log(e)
        }
    }
})