(function (namespace) {

    /* ÷÷÷÷ FRAME ÷÷÷÷ */

    function Frame() {
        this.turn = 0
        this.pins = [0, 0, 0]
    }

    Frame.prototype.isStrike = function () {
        return this.pins[0] === 10
    }

    Frame.prototype.isSpare = function () {
        return !this.isStrike()
            && (this.pins[0] + this.pins[1]) === 10
    }

    Frame.prototype.isFull = function () {
        return this.turn === 2 || this.isStrike()
    }

    Frame.prototype.points = function () {
        return this.pins[0] + this.pins[1] + this.pins[2]
    }

    Frame.prototype.roll = function (pins) {
        if (!this.isFull()) {
            this.pins[this.turn++] = pins
        } else {
            return false
        }
    }



    /* ÷÷÷÷ TENTH FRAME ÷÷÷÷ */

    function TenthFrame() {
        Frame.call(this)
    }

    TenthFrame.prototype = {
        constructor:    TenthFrame
      , isStrike:       Frame.prototype.isStrike
      , isClassicSpare: Frame.prototype.isSpare
      , points:         Frame.prototype.points
      , roll:           Frame.prototype.roll
    }

    TenthFrame.prototype.isComboStrike = function () {
        return this.isStrike() && this.pins[1] === 10
    }

    TenthFrame.prototype.isFull = function () {
        var extra = this.isComboStrike() || this.isClassicSpare()

        return this.turn === 3
            || (this.turn === 2 && !extra) 
    }


    /* ÷÷÷÷ SCORE ÷÷÷÷ */

    function Score() {
        this.frames = []
        this.turn = 0
    }

    Score.prototype.roll = function (pins) {
        
    }

    Score.prototype.rolls = function (pins) {
        // call each roll
    }




    /* namespace */

    namespace.Score = Score
    namespace.Score.Frame = Frame
    namespace.Score.TenthFrame = TenthFrame

})(BierBowling)