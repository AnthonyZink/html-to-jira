import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"

describe('Bold - Paragraph', () => {
    it("Bold alone", () => {
        const data = `<strong>I'm a bold text</strong>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "text",
            "text": "I'm a bold text",
            "marks": [
                {
                    "type": "strong"
                }
            ]
        }])


    })

    it("Bold is in first place", () => {
        const data = `<strong>Bold</strong> is in first place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Bold",
                "marks": [
                    {
                        "type": "strong"
                    }
                ]
            }, {
                "type": "text",
                "text": " is in first place"
            },
        ])


    })

    it("Bold is in middle place", () => {
        const data = `Bold is in <strong>middle</strong> place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "text",
            "text": "Bold is in "
        }, {
            "type": "text",
            "text": "middle",
            "marks": [
                {
                    "type": "strong"
                }
            ]
        }, {
            "type": "text",
            "text": " place"
        },
        ]
        )


    })

    it("Bold is in last place", () => {
        const data = `Bold is in <strong>last place</strong>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Bold is in "
            }, {
                "type": "text",
                "text": "last place",
                "marks": [
                    {
                        "type": "strong"
                    }
                ]
            },
        ]
        )


    })

    it("Bold is multiple times", () => {
        const data = `Bold is in <strong>middle place</strong> and also <strong>in last place</strong> and <strong>again</strong>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Bold is in "
            }, {
                "type": "text",
                "text": "middle place",
                "marks": [
                    {
                        "type": "strong"
                    }
                ]
            }, {
                "type": "text",
                "text": " and also "
            }, {
                "type": "text",
                "text": "in last place",
                "marks": [
                    {
                        "type": "strong"
                    }
                ]
            }, {
                "type": "text",
                "text": " and "
            }, {
                "type": "text",
                "text": "again",
                "marks": [
                    {
                        "type": "strong"
                    }
                ]
            }
        ]
        )


    })
})