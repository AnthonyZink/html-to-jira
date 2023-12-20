import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"

describe('Rule - Paragraph', () => {
    it("Rule alone", () => {
        const data = `<hr>`
        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "rule"
        }])
    })
})