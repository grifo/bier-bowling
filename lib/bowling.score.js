(function (namespace) {

    /* ---- SCORE ---- */

    function Score() {
        var frames = []
          , i

        for (i = 0; i < Score.TOTAL_FRAMES - 1; i++) {
            frames.push(new Frame())
        }
        frames.push(new TenthFrame())

        this.frames = frames
        this.turn = 0
    }

    Score.SPARE_BONUS = 1
    Score.STRIKE_BONUS = 2
    Score.TOTAL_FRAMES = 10

    Score.prototype.roll = function (pins) {
        if (this.frames[this.turn].isFull()) {
            this.turn = Math.min(this.turn + 1, Score.TOTAL_FRAMES - 1)
        }

        if (!this.frames[this.turn].isFull()) {
            this.frames[this.turn].roll(pins)
        }
    }

    Score.prototype.rolls = function (rolls) {
        rolls.forEach(function (pins) {
            this.roll(pins)
        }.bind(this))
    }

    Score.prototype.isSpareIn = function (turn) {
        return this.frames[turn].isSpare()
    }

    Score.prototype.isStrikeIn = function (turn) {
        return this.frames[turn].isStrike()
    }

    Score.prototype.bonusOf = function (bonus, turn) {
        var frame = this.frames[turn + 1]
          , sum = 0

        if (bonus >= 1) {
            sum += frame.pins[0]
        }
        if (bonus >= 2) {
            if (frame.turn >= 1) {
                sum += frame.pins[1]
            } else {
                sum += this.bonusOf(1, turn + 1)
            }
        }
        return sum
    }

    Score.prototype.points = function () {
        var sum = 0
          , points = []

        this.frames.forEach(function (frame, turn) {
            var bonus = 0
            if (frame.turn < 0) {
                return
            }
            sum += frame.points()

            if (frame instanceof Frame) {
                if (frame.isSpare()) {
                    bonus = Score.SPARE_BONUS
                } else if (frame.isStrike()) {
                    bonus = Score.STRIKE_BONUS
                }
            }
            sum += this.bonusOf(bonus, turn)

            points.push(sum)
        }.bind(this))

        return points
    }

    Score.prototype.result = function () {
        return this.points().pop() || 0
    }


    /* ---- FRAME ---- */

    function Frame() {
        this.turn = -1
        this.pins = [0, 0, 0]
        this.cells = 2
    }

    Frame.prototype.isStrike = function () {
        return this.pins[0] === 10
    }

    Frame.prototype.isSpare = function () {
        return !this.isStrike()
            && (this.pins[0] + this.pins[1]) === 10
    }

    Frame.prototype.isFull = function () {
        return this.turn === this.cells - 1 
            || this.isStrike()
    }

    Frame.prototype.points = function () {
        return this.pins[0] + this.pins[1] + this.pins[2]
    }

    Frame.prototype.roll = function (pins) {
        if (!this.isFull()) {
            this.pins[++this.turn] = pins
        } else {
            return false
        }
    }


    /* ---- TENTH FRAME ---- */

    function TenthFrame() {
        Frame.call(this)
        this.cells = 3
    }

    TenthFrame.prototype = {
        constructor:    TenthFrame
      , isStrike:       Frame.prototype.isStrike
      , isSpare: Frame.prototype.isSpare
      , points:         Frame.prototype.points
      , roll:           Frame.prototype.roll
    }

    TenthFrame.prototype.isComboStrike = function () {
        return this.isStrike() && this.pins[1] === 10
    }

    TenthFrame.prototype.isTripleStrike = function () {
        return this.isComboStrike() && this.pins[2] === 10
    }

    TenthFrame.prototype.isFull = function () {
        var extra = this.isComboStrike() || this.isSpare()

        return this.turn === this.cells - 1
            || (this.turn === 1 && !extra) 
    }


    /* namespace */

    namespace.Score = Score
    namespace.Score.Frame = Frame
    namespace.Score.TenthFrame = TenthFrame

})(BierBowling)