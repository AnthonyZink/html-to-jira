import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"

describe('Heading', () => {
    it("Headings alone", () => {
        for (let level = 1; level <= 6; level++) {
            const data = `<h${level}>I'm a heading level ${level}</h${level}>`

            const converter = new HtmlToJsonConverter(new JSDOM(data));
            const jsonResult = converter.convert();

            expect(jsonResult).toStrictEqual([{
                "type": "heading",
                "attrs": {
                    "level": level
                },
                "content": [
                    {
                        "type": "text",
                        "text": `I'm a heading level ${level}`
                    }
                ]
            }])
        }


    })

})