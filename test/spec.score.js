describe('Bier Bowling Score', function () {
    var score

    beforeEach(function () {
        score = new BierBowling.Score()
    })

    it('Begin empty', function () {
        expect(score.points()).toBe(0)
    })

    it('One roll', function () {
        score.roll(4)
        expect(score.points()).toBe(4)
    })

    it('Be strike', function() {
        score.roll(10)
        expect(score.points()).toBe(10)
    })

    it('rolls multiple balls', function() {
        score.roll(4);
        score.roll(5);
        expect(score.points()).toBe(9)
    })
    
    it('ball #3', function() {
        score.roll(1)
        score.roll(4)
        score.roll(6)
        expect(score.points()).toBe(11)
    })

    it('strike', function() {
        score.roll(10);
        score.roll(4);
        score.roll(2);
        score.roll(4);
        expect(score.points()).toBe(26);
    })

    it('spare', function() {
        score.roll(4);
        score.roll(6);
        score.roll(2);
        score.roll(5);
        expect(score.points()).toBe(19);
    })

    it ('combo strike', function() {
        score.roll(10);
        score.roll(10);
        score.roll(1);
        score.roll(1);
        expect(score.points()).toBe(35);
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