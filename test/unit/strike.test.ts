import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter";

describe('Strike - Paragraph', () => {
    it("Strike alone", () => {
        const data = `<del>I'm an striked text</del>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "I'm an striked text",
                "marks": [
                    {
                        "type": "strike"
                    }
                ]
            }
        ]
        )


    })

    it("Strike is in first place", () => {
        const data = `<del>Strike</del> is in first place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Strike",
                "marks": [
                    {
                        "type": "strike"
                    }
                ]
            }, {
                "type": "text",
                "text": " is in first place"
            },
        ]
        )


    })

    it("Strike is in middle place", () => {
        const data = `Strike is in <del>middle</del> place`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "text",
            "text": "Strike is in "
        }, {
            "type": "text",
            "text": "middle",
            "marks": [
                {
                    "type": "strike"
                }
            ]
        }, {
            "type": "text",
            "text": " place"
        },
        ]
        )


    })

    it("Strike is in last place", () => {
        const data = `Strike is in <del>last place</del>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Strike is in "
            }, {
                "type": "text",
                "text": "last place",
                "marks": [
                    {
                        "type": "strike"
                    }
                ]
            },
        ]
        )


    })

    it("Strike is multiple times", () => {
        const data = `Strike is in <del>middle place</del> and also <del>in last place</del> and <del>again</del>`
        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Strike is in "
            }, {
                "type": "text",
                "text": "middle place",
                "marks": [
                    {
                        "type": "strike"
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
                        "type": "strike"
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
                        "type": "strike"
                    }
                ]
            }
        ]
        )
    })
})