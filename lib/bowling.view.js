(function (namespace) {

    function View(standings, field, button) {
        this.standings = standings
        this.field = field
        this.button = button
    }

    View.prototype.addEventListeners = function () {
        this.button.on('click', this.onThrow.bind(this))
    }

    View.prototype.onThrow = function () {
        
    }

    View.prototype.roll = function () {

    }

    namespace.View = View

})(BierBowling)