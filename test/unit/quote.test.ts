import { JSDOM } from 'jsdom';

import HtmlToJsonConverter from "../../src/htmlConverter";


describe('Quote - Parse', () => {
    it("Quote alone", () => {
        const data = "<blockquote> <p>Line 1</p> </blockquote>"

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();


        expect(jsonResult).toStrictEqual([{
            "type": "blockquote",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Line 1"
                        }
                    ]
                }
            ]
        }])


    })

    it("Quote multiple lines", () => {
        const data = `<blockquote> <p>Line 1</p> <p>Line 2</p></blockquote>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "blockquote",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Line 1"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Line 2"
                        }
                    ]
                }
            ]
        }])


    })
})