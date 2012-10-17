(function (namespace) {

    function App(standings, form) {
        this.standings = standings
        this.standingsRolls = standings.find('.rolls').children()
        this.standingsPoints = standings.find('.points').children()
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
        this.renderFrame(this.turn())
    }

    App.prototype.turn = function () {
        return this.score.turn
    }

    /* 
        TODO: cover all render functions with tests
    */

    App.prototype.renderFrame = function (turn) {
        var frame = this.score.frames[turn]
          , rollCell = this.standingsRolls.eq(turn * 2)

        this.renderRollCells(frame, rollCell)
        this.renderPoints()
    }

    App.prototype.renderRollCells = function(frame, cell) {
        var roll

        for (roll = 0; roll < frame.cells; roll++, cell = cell.next()) {
            if (roll > frame.turn) {
                continue
            }
            cell.text(frame.pins[roll])
            cell.addClass(this.renderRollClasses(frame, roll))
        }
    }

    App.prototype.renderRollClasses = function (frame, roll) {
        classes = []
        if (roll === 0 && frame.isStrike()) {
            classes.push('strike')
        }

        if (roll === 1 && frame.isSpare()) {
            classes.push('spare')
        }

        if (frame instanceof namespace.Score.TenthFrame) {

            if (roll === 1 && frame.isComboStrike()) {
                classes.push('strike')
            }

            if (roll === 2 && frame.isTripleStrike()) {
                classes.push('strike')
            }

        }
        return classes.join(' ')
    }

    App.prototype.renderPoints = function(points, cell) {
        var cell = this.standingsPoints.first()

        this.score.points().forEach(function (points) {
            cell.text(points)
            cell = cell.next()
        })
    }


    namespace.App = App

})(BierBowling)