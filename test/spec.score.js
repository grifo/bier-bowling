describe('Bier Bowling Score', function () {
    var score

    beforeEach(function () {
        score = new BierBowling.Score()
    })

    /* ÷÷÷÷ SPARE ÷÷÷÷ */

    describe('Spare', function () {

        it('First frame is not spare', function () {
            score.roll(4)
            expect(score.isSpareIn(0)).toBeFalsy()
        })

        it('First frame is spare', function () {
            score.roll(4)
            score.roll(6)
            expect(score.isSpareIn(0)).toBeTruthy()
        })

        it('Second frame is spare', function () {
            score.roll(10)
            score.roll(4)
            score.roll(6)
            expect(score.isSpareIn(1)).toBeTruthy()
        })

    })

    /* ÷÷÷÷ STRIKE ÷÷÷÷ */

    describe('Strike', function () {

        it('First frame is not strike', function () {
            score.roll(4)
            expect(score.isStrikeIn(0)).toBeFalsy()
        })

        it('First frame is strike', function () {
            score.roll(10)
            expect(score.isStrikeIn(0)).toBeTruthy()
        })

        it('Second frame is strike', function () {
            score.roll(4)
            score.roll(4)
            score.roll(10)
            expect(score.isStrikeIn(1)).toBeTruthy()
        })

    }) 

    /* ÷÷÷÷ ROLLS ÷÷÷÷ */

    describe('Rolls', function () {

        beforeEach(function () {
            spyOn(score, 'roll').andCallThrough()
        })

        it('No call roll', function () {
            expect(score.roll).not.toHaveBeenCalled()
        })

        it('Simple call', function () {
            score.rolls([4])
            expect(score.roll).toHaveBeenCalledWith(4)
        })

        it('Tow rolls', function () {
            score.rolls([4, 2])
            expect(score.roll.calls.length).toBe(2)
        })

        it('Three rolls', function () {
            score.rolls([4, 2, 3])
            expect(score.roll.calls.length).toBe(3)
        })

    })

    /* ÷÷÷÷ BONUS OF ÷÷÷÷ */

    describe('Bonus Of', function () {

        it ('No fun for you', function() {
            score.roll(1) // turn 0
            score.roll(1) // turn 0

            score.roll(1) // turn 1
            expect(score.bonusOf(0, 0)).toBe(0)
        })

        it ('Spare', function() {
            score.roll(4) // turn 0
            score.roll(6) // turn 0

            score.roll(2) // turn 1
            expect(score.bonusOf(2, 0)).toBe(2)
        })

        it ('Strike', function() {
            score.roll(10) // turn 0

            score.roll(2) // turn 1
            score.roll(1) // turn 1
            expect(score.bonusOf(2, 0)).toBe(3)
        })

        it ('Combo strike', function() {
            score.roll(10) // turn 0

            score.roll(10) // turn 1

            score.roll(1) // turn 2
            expect(score.bonusOf(2, 0)).toBe(11)
        })

    })

    /* ÷÷÷÷ POINTS ÷÷÷÷ */

    describe('Points', function () {

        it('Begins empty', function () {
            expect(score.points().length).toBe(0)
        })

        it('One roll points', function () {
            score.roll(4)
            expect(score.points().join(',')).toBe('4')
        })

        it('One roll strike points', function () {
            score.roll(10)
            expect(score.points().join(',')).toBe('10')
        })

        it('Two simple rolls', function () {
            score.rolls([4, 5])
            expect(score.points().join(',')).toBe('9')
        })
        
        it('Three simple rolls', function () {
            score.rolls([1, 4, 6])
            expect(score.points().join(',')).toBe('5,11')
        })

        it('Strike follow by simple rolls', function () {
            score.roll(10)

            score.roll(4) // x2
            score.roll(2) // x2

            score.roll(4)
            expect(score.points().join(',')).toBe('16,22,26')
        })

        it('Spare follow by simple rolls', function () {
            score.roll(4)
            score.roll(6)

            score.roll(2) // x2
            score.roll(5)
            expect(score.points().join(',')).toBe('12,19')
        })

        it ('Combo strike follow by two simple rolls', function () {
            score.roll(10)

            score.roll(10) // x2

            score.roll(1) // x3
            score.roll(1) // x2
            expect(score.points().join(',')).toBe('21,33,35')
        })

        it('Very low full play', function () {
            score.rolls([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            expect(score.points().join(','))
                .toBe('0,0,0,0,0,0,0,0,0,0')
        })

        it('Normal full play', function () {
            score.rolls([10, 7, 3, 7, 2, 9, 1, 10, 10, 10, 2, 3, 6, 4, 7, 3, 3])
            expect(score.points().join(','))
                .toBe('20,37,46,66,96,118,133,138,155,168')
        })

        it ('Megabolic play', function () {
            score.rolls([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])
            expect(score.points().join(','))
                .toBe('30,60,90,120,150,180,210,240,270,300')
        })

        it('Dont play beyond the limit', function () {
            score.rolls([10, 7, 3, 7, 2, 9, 1, 10, 10, 10, 2, 3, 6, 4, 7, 3, 3, 3, 3])
            expect(score.points().join(','))
                .toBe('20,37,46,66,96,118,133,138,155,168')
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

        it('Two simple rolls', function () {
            score.rolls([4, 5])
            expect(score.result()).toBe(9)
        })

        it('Strike follow by simple rolls', function () {
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

        it ('Combo strike follow by two simple rolls', function () {
            score.roll(10)

            score.roll(10) // x2

            score.roll(1) // x3
            score.roll(1) // x2
            expect(score.result()).toBe(35)
        })

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