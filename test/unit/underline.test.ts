import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter";

describe('Underline - Paragraph', () => {
    it("Underline alone", () => {
        const data = `<u>I'm an underlined text</u>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "I'm an underlined text",
                "marks": [
                    {
                        "type": "underline"
                    }
                ]
            }
        ])


    })

    it("Underline is in first place", () => {
        const data = `<u>Underline</u> is in first place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Underline",
                "marks": [
                    {
                        "type": "underline"
                    }
                ]
            }, {
                "type": "text",
                "text": " is in first place"
            },
        ]
        )


    })

    it("Underline is in middle place", () => {
        const data = `Underline is in <u>middle</u> place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "text",
            "text": "Underline is in "
        }, {
            "type": "text",
            "text": "middle",
            "marks": [
                {
                    "type": "underline"
                }
            ]
        }, {
            "type": "text",
            "text": " place"
        },
        ]
        )


    })

    it("Underline is in last place", () => {
        const data = `Underline is in <u>last place</u>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Underline is in "
            }, {
                "type": "text",
                "text": "last place",
                "marks": [
                    {
                        "type": "underline"
                    }
                ]
            },
        ]
        )


    })

    it("Underline is multiple times", () => {
        const data = `Underline is in <u>middle place</u> and also <u>in last place</u> and <u>again</u>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Underline is in "
            }, {
                "type": "text",
                "text": "middle place",
                "marks": [
                    {
                        "type": "underline"
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
                        "type": "underline"
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
                        "type": "underline"
                    }
                ]
            }
        ]
        )


    })
})