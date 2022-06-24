const { MarkovMachine } = require('./markov');

describe('markov machine test', function(){
    test('makes chains', function(){
        let mm = new MarkovMachine("aa bb cc aa BB bb CC cc DD");

        expect(mm.chains).toEqual(new Map([
            ['aa', ['bb', 'BB']],
            ['bb', ['cc', 'CC']],
            ['cc', ['aa', 'DD']],
            ['BB', ['bb']],
            ['CC', ['cc']],
            ['DD', [null]]
        ]));
    });
    test('choice picks from array', function () {
        expect(MarkovMachine.choice([2, 2, 2])).toEqual(2);
        expect([4, 5, 6]).toContain(MarkovMachine.choice([4, 5, 6]));
      });
    test('generates semi-predictable text', function () {
        let mm = new MarkovMachine("l m n o");
        let text = mm.makeText();
        expect(["l m n o", "m n o", "n o", "o"]).toContain(text);
      });
})