(function (namespace) {

    /* ÷÷÷÷ FRAME ÷÷÷÷ */

    function Frame() {
        this.turn = -1
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
        return this.turn === 1 || this.isStrike()
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

        return this.turn === 2
            || (this.turn === 1 && !extra) 
    }


    /* ÷÷÷÷ SCORE ÷÷÷÷ */

    function Score() {
        var frames = []
          , i

        for (i = 0; i < 9; i++) {
            frames.push(new Frame())
        }
        frames.push(new TenthFrame())

        this.frames = frames
        this.turn = 0
    }

    Score.prototype.roll = function (pins) {
        if (this.frames[this.turn].isFull()) {
            this.turn++
        }
        this.frames[this.turn].roll(pins)
    }

    Score.prototype.rolls = function (pins) {
        // call each roll
    }

    Score.prototype.isSpare = function (i) {
        return this.frames[i].isSpare()
    }

    Score.prototype.isStrike = function (i) {
        return this.frames[i].isStrike()
    }

    Score.prototype.result = function () {
        return this.points().pop() || 0
    }

    Score.prototype.bonusOf = function (num, frame) {

    }

    Score.prototype.points = function () {
        var points = []
          , sum = 0
          , bonus

        this.frames.forEach(function (frame, turn) {
            bonus = 0
            sum += frame.points()

            if (frame instanceof Frame) {
                // spare
                if (frame.isSpare()) {
                    bonus = 1
                // strike
                } else if (frame.isStrike()) {
                    bonus = 2
                }
            }

            if (bonus > 0) {
                sum += this.frames[turn + 1].pins[0]
                if (bonus > 1) {
                    if (this.frames[turn + 1].turn > 0) {
                        sum += this.frames[turn + 1].pins[1]
                    } else {
                        sum += this.frames[turn + 2].pins[0]
                    }
                }
            }



            console.log(bonus)

            points.push(sum)
        }.bind(this))
            // for (i = 0; i <= this.turn; i++) {
                

            


            //     



            //     // if(this.frames[i - 1] && this.frames[i - 1].isStrike()) {
            //     //     points += frame.pins[0] + frame.pins[1];
                    
            //     //     if (frame.isStrike() && this.frames[i + 1]) {
            //     //         points += this.frames[i + 1].pins[0]
            //     //     }
            //     // }
            //     // if (this.frames[i - 1] && this.frames[i-1].isSpare()) {
            //     //     points += frame.pins[0];
            //     // }
            // }

        return points
    }






    /* namespace */

    namespace.Score = Score
    namespace.Score.Frame = Frame
    namespace.Score.TenthFrame = TenthFrame

})(BierBowling)