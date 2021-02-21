
const { dateFormating } = require('./common-function');


describe("Date Formating Test", () => {
    it("Valid parameter should return 8 digit string", () => {
        let date = new Date('2020-08-25')
        let result = dateFormating(date);
        expect(result.length).toBe(8);
    })

    it("Valid parameter should return 8 digit string", () => {
        let date = new Date('2020-10-05')
        let result = dateFormating(date);
        expect(result.length).toBe(8);
    })

    it("Valid date should be return 8 digit specific string", () => {
        let date = new Date('2020-08-25')
        let result = dateFormating(date);
        expect(result).toBe("20200825");
    })

    it("Valid date should be return 8 digit specific string", () => {
        let date = new Date('2020-10-05')
        let result = dateFormating(date);
        expect(result).toBe("20201005");
    })
});