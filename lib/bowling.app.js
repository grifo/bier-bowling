(function (namespace) {

    function App(standings, form) {
        this.standings = standings
        this.form = form

        this.score = new namespace.Score()

        this.addEventListeners()
    }

    App.prototype.addEventListeners = function () {
        this.form.on('submit', function (event) {
            event.preventDefault()
            this.onThrow()
        }.bind(this))
    }

    App.prototype.field = function () {
        return this.form.find(':input')
    }

    App.prototype.clearField = function () {
        this.field().val('')
    }

    App.prototype.onThrow = function () {
        var pins = this.field().val()
        if (pins.match(/^(10|0?\d)$/)) {
            pins = parseInt(pins, 10)
            this.roll(pins)
        }
        this.clearField()
    }

    App.prototype.roll = function (pins) {
        this.score.roll(pins)
    }

    namespace.App = App

})(BierBowling)