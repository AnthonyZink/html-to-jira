import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"

describe('convert paragraph', () => {

    it("Basic paragraph", () => {
        const data = `<p>I'm a simple paragraph</p>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();


        expect(jsonResult).toStrictEqual([{
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "I'm a simple paragraph"
                }]
        }])
    })

    it("Paragraph with bold", () => {
        const data = `<p>I'm a paragraph <b>with bold</b> in the middle</p>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "I'm a paragraph "
                },
                {
                    "type": "text",
                    "text": "with bold",
                    "marks": [
                        {
                            "type": "strong"
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": " in the middle"
                }
            ]
        }])


    })

    it("Paragraph with italic", () => {
        const data = `<p>I'm a paragraph <i>with italic</i> in the middle</p>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "I'm a paragraph "
                },
                {
                    "type": "text",
                    "text": "with italic",
                    "marks": [
                        {
                            "type": "em"
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": " in the middle"
                }
            ]
        }])


    })

    it("Paragraph with italic and bold", () => {
        const data = `<p>I'm a paragraph <i>with italic</i> in the middle and <b>bold</b> at the end</i>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "I'm a paragraph "
                },
                {
                    "type": "text",
                    "text": "with italic",
                    "marks": [
                        {
                            "type": "em"
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": " in the middle and "
                },
                {
                    "type": "text",
                    "text": "bold",
                    "marks": [
                        {
                            "type": "strong"
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": " at the end"
                },
            ]
        }])


    })
})