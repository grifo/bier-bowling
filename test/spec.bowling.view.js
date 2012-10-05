describe('Bier Bowling View', function () {
    var view, standings, field, button

    beforeEach(function () {
        standings = $('<div>')
        field = $('<input>')
        button = $('<button>')
        
        view = new BierBowling.View(standings, field, button)
    })

    /* ÷÷÷÷ BUTTON ÷÷÷÷ */

    describe('Button', function () {

        it('Button click call onThrow', function () {
            spyOn(view, 'onThrow').andCallThrough()

            button.trigger($.Event('click'))
            expect(view.onThrow).toHaveBeenCalled()
        })

    })


})