describe('Bier Bowling App', function () {
    var app, standings, field, form

    beforeEach(function () {
        standings = $('<div>')
        field = $('<input>')
        form = $('<form>').append(field)
        
        app = new BierBowling.App(standings, form)
    })

    /* ---- FORM ---- */

    describe('Form', function () {

        it('Form click call onThrow', function () {
            spyOn(app, 'onThrow').andCallThrough()

            form.trigger('submit')
            expect(app.onThrow).toHaveBeenCalled()
        })

    })

    /* ----ON THROW ---- */

    describe('On throw', function () {

        beforeEach(function () {
            spyOn(app, 'roll').andCallThrough()
        })

        it('Dont call roll if dont have pins defined', function () {
            app.onThrow()
            expect(app.roll).not.toHaveBeenCalled()
        })

        it('Call roll if pins is 00', function () {
            field.val('00')
            app.onThrow()
            expect(app.roll).toHaveBeenCalledWith(0)
        })

        it('Call roll if pins are 2', function () {
            field.val(2)
            app.onThrow()
            expect(app.roll).toHaveBeenCalledWith(2)
        })

        it('Call roll if pins are 09', function () {
            field.val('09')
            app.onThrow()
            expect(app.roll).toHaveBeenCalledWith(9)
        })

        it('Dont call roll if pins are 11', function () {
            field.val(11)
            app.onThrow()
            expect(app.roll).not.toHaveBeenCalled()
        })

        it('Dont call roll if pins are -1', function () {
            field.val(-1)
            app.onThrow()
            expect(app.roll).not.toHaveBeenCalled()
        })

        it('Call clear field', function () {
            spyOn(app, 'clearField').andCallThrough()

            field.val(10)
            app.onThrow()

            expect(app.clearField).toHaveBeenCalled()
        })

    })


    /* ---- ROLL ---- */

    describe('Roll', function () {

        it('Roll should call score roll', function () {
            spyOn(app.score, 'roll').andCallThrough()

            app.roll(4)
            expect(app.score.roll).toHaveBeenCalledWith(4)
        })

    })


    /* ---- FIELD ---- */

    describe('Field', function () {

        it('Get correct field', function () {
            expect(app.field()[0]).toBe(field[0])
        })

        it('Clear field value', function () {
            field.val('teste')

            app.clearField()
            expect(field.val()).toBe('')
        })

    })


})