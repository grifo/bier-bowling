describe('Bier Bowling Score', function () {
    var score

    beforeEach(function () {
        score = new BierBowling.Score()
    })

    /* ÷÷÷÷ SPARE ÷÷÷÷ */

    describe('Spare', function () {

        it('First frame is not spare', function () {
            score.roll(4)
            expect(score.isSpare(0)).toBeFalsy()
        })

        it('First frame is spare', function () {
            score.roll(4)
            score.roll(6)
            expect(score.isSpare(0)).toBeTruthy()
        })

        it('Second frame is spare', function () {
            score.roll(10)
            score.roll(4)
            score.roll(6)
            expect(score.isSpare(1)).toBeTruthy()
        })

    })

    /* ÷÷÷÷ STRIKE ÷÷÷÷ */

    describe('Strike', function () {

        it('First frame is not strike', function () {
            score.roll(4)
            expect(score.isStrike(0)).toBeFalsy()
        })

        it('First frame is strike', function () {
            score.roll(10)
            expect(score.isStrike(0)).toBeTruthy()
        })

        it('Second frame is strike', function () {
            score.roll(4)
            score.roll(4)
            score.roll(10)
            expect(score.isStrike(1)).toBeTruthy()
        })

    })

    /* ÷÷÷÷ RESULT ÷÷÷÷ */

    describe('Result', function () {

        it('Begins empty', function () {
            expect(score.result()).toBe(0)
        })

        it('One roll points', function () {
            score.roll(4)
            expect(score.result()).toBe(4)
        })

        it('One roll strike points', function () {
            score.roll(10)
            expect(score.result()).toBe(10)
        })

        it('Two simple rolls', function () {
            score.roll(4)
            score.roll(5)
            expect(score.result()).toBe(9)
        })
        
        it('Three simple rolls', function () {
            score.roll(1)
            score.roll(4)
            score.roll(6)
            expect(score.result()).toBe(11)
        })

        /*it('Strike follow by simple rolls', function () {
            score.roll(10)

            score.roll(4) // x2
            score.roll(2) // x2

            score.roll(4)
            expect(score.result()).toBe(26)
        })

        it('Spare follow by simple rolls', function () {
            score.roll(4)
            score.roll(6)

            score.roll(2) // x2
            score.roll(5)
            expect(score.result()).toBe(19)
        })

        it ('Combo strike follow by two simple rolls', function() {
            score.roll(10)

            score.roll(10) // x2

            score.roll(1) // x3
            score.roll(1) // x2
            expect(score.result()).toBe(35)
        })*/

    })
})




describe('Bier Bowling Score Frame', function () {
    var frame

    beforeEach(function () {
        frame = new BierBowling.Score.Frame()
    })

    /* ÷÷÷÷ SUM ÷÷÷÷ */

    it('sum rolls points', function () {
        expect(frame.points()).toBe(0)

        frame.roll(1)
        expect(frame.points()).toBe(1)

        frame.roll(3)
        expect(frame.points()).toBe(4)
    })

    /* ÷÷÷÷ ROLL ÷÷÷÷ */

    it('full frame do not computes a roll', function () {
        frame.roll(1)
        frame.roll(1)
        frame.roll(1)
        expect(frame.points()).toBe(2)
    })

    
    /* ÷÷÷÷ STRIKE ÷÷÷÷ */

    describe('Strike', function () {

        it('not strike', function () {
            expect(frame.isStrike()).toBeFalsy()
        })

        it('real strike', function () {
            frame.roll(10)
            expect(frame.isStrike()).toBeTruthy()
        })

        it('two rolls false strike', function () {
            frame.roll(5)
            frame.roll(5)
            expect(frame.isStrike()).toBeFalsy()
        })

        it('one roll false strike', function () {
            frame.roll(9)
            expect(frame.isStrike()).toBeFalsy()
        })

    })
    

    /* ÷÷÷÷ SPARE ÷÷÷÷ */

    describe('Spare', function () {

        it('not', function () {
            expect(frame.isSpare()).toBeFalsy()
        })

        it('real spare', function () {
            frame.roll(1)
            frame.roll(9)
            expect(frame.isSpare()).toBeTruthy()
        })

        it('one roll false spare', function () {
            frame.roll(8)
            expect(frame.isSpare()).toBeFalsy()
        })

        it('two rolls false spare', function () {
            frame.roll(1)
            frame.roll(8)
            expect(frame.isSpare()).toBeFalsy()
        })

        it('strike is not a spare', function () {
            frame.roll(10)
            expect(frame.isSpare()).toBeFalsy()
        })

    })
    
    /* ÷÷÷÷ FULL ÷÷÷÷ */
    
    describe('Full', function () {

        it('init empty', function () {
            expect(frame.isFull()).toBeFalsy()
        })

        it('strike fills the frame', function () {
            frame.roll(10)
            expect(frame.isFull()).toBeTruthy()
        })

        it('one simple roll doesnt fill the frame', function () {
            frame.roll(8)
            expect(frame.isFull()).toBeFalsy()
        })

        it('two rolls fills the frame', function () {
            frame.roll(1)
            frame.roll(2)
            expect(frame.isFull()).toBeTruthy()
        })

    })
})



describe('Bier Bowling Score Tenth Frame', function () {
    var frame

    beforeEach(function () {
        frame = new BierBowling.Score.TenthFrame()
    })
    
    /* ÷÷÷÷ COMBO STRIKE ÷÷÷÷ */

    describe('Combo Strike', function () {
        it('not', function () {
            expect(frame.isComboStrike()).toBeFalsy()
        })

        it('one strike is not a combo', function () {
            frame.roll(10)
            expect(frame.isComboStrike()).toBeFalsy()
        })

        it('combo strike', function () {
            frame.roll(10)
            frame.roll(10)
            expect(frame.isComboStrike()).toBeTruthy()
        })

        it('combo strike with extra ball', function () {
            frame.roll(10)
            frame.roll(10)
            frame.roll(1)
            expect(frame.isComboStrike()).toBeTruthy()
        })

        it('not combo strike', function () {
            frame.roll(5)
            frame.roll(5)
            expect(frame.isComboStrike()).toBeFalsy()
        })

        it('not combo strike', function () {
            frame.roll(10)
            frame.roll(9)
            frame.roll(10)
            expect(frame.isComboStrike()).toBeFalsy()
        })
    })
    
    /* ÷÷÷÷ FULL ÷÷÷÷ */
    
    describe('Full', function () {

        it('init empty', function () {
            expect(frame.isFull()).toBeFalsy()
        })

        it('strike not fill the frame', function () {
            frame.roll(10)
            expect(frame.isFull()).toBeFalsy()
        })

        it('strike gives a extra ball', function () {
            frame.roll(10)
            frame.roll(1)
            expect(frame.isFull()).toBeTruthy()
        })

        it('spare gives a extra ball', function () {
            frame.roll(1)
            frame.roll(9)
            frame.roll(2)
            expect(frame.isFull()).toBeTruthy()
        })

        it('combo strike not fill the frame', function () {
            frame.roll(10)
            frame.roll(10)
            expect(frame.isFull()).toBeFalsy()
        })

        it('spare not fill the frame', function () {
            frame.roll(0)
            frame.roll(10)
            expect(frame.isFull()).toBeFalsy()
        })

        it('one simple roll doesnt fill the frame', function () {
            frame.roll(8)
            expect(frame.isFull()).toBeFalsy()
        })

        it('two rolls fills the frame', function () {
            frame.roll(1)
            frame.roll(2)
            expect(frame.isFull()).toBeTruthy()
        })
    })    
})