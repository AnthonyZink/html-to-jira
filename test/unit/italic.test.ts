import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter";

describe('Italic single star - Paragraph', () => {
    it("Italic alone", () => {
        const data = `<i>I'm an italic text</i>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "I'm an italic text",
                "marks": [
                    {
                        "type": "em"
                    }
                ]
            }
        ]
        )
    })

    it("Italic is in first place", () => {
        const data = `<i>Italic</i> is in first place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Italic",
                "marks": [
                    {
                        "type": "em"
                    }
                ]
            }, {
                "type": "text",
                "text": " is in first place"
            },
        ]
        )


    })

    it("Italic is in middle place", () => {
        const data = `Italic is in <i>middle</i> place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "text",
            "text": "Italic is in "
        }, {
            "type": "text",
            "text": "middle",
            "marks": [
                {
                    "type": "em"
                }
            ]
        }, {
            "type": "text",
            "text": " place"
        },
        ]
        )


    })

    it("Italic is in last place", () => {
        const data = `Italic is in <i>last place</i>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Italic is in "
            }, {
                "type": "text",
                "text": "last place",
                "marks": [
                    {
                        "type": "em"
                    }
                ]
            },
        ]
        )


    })

    it("Italic is multiple times", () => {
        const data = `Italic is in <i>middle place</i> and also <i>in last place</i> and <i>again</i>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Italic is in "
            }, {
                "type": "text",
                "text": "middle place",
                "marks": [
                    {
                        "type": "em"
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
                        "type": "em"
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
                        "type": "em"
                    }
                ]
            }
        ]
        )


    })
})