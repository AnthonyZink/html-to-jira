import HtmlToJsonConverter from "../../src/htmlConverter";
import { JSDOM } from 'jsdom';

describe('Link - Parse', () => {
    it("Link alone", () => {
        const data = `<a href="https://daringfireball.net/projects/markdown/">Daring Fireball</a>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();


        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "Daring Fireball",
                "marks": [
                    {
                        "type": "link",
                        "attrs": {
                            "href": 'https://daringfireball.net/projects/markdown/'
                        }
                    }
                ]
            }]
        )


    })

    it("Link is inside", () => {
        const data = `I'm a <a href="https://daringfireball.net/projects/markdown/">super link</a> in a sentence`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();


        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "I'm a "
            },
            {
                "type": "text",
                "text": "super link",
                "marks": [
                    {
                        "type": "link",
                        "attrs": {
                            "href": 'https://daringfireball.net/projects/markdown/'
                        }
                    }
                ]
            },
            {
                "type": "text",
                "text": " in a sentence"
            },]
        )


    })

    it("Link is multiple times", () => {
        const data = `I'm a <a href="https://daringfireball.net/projects/markdown/">super link</a> in a sentence and an <a href="https://google.com/">end link</a>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();


        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": "I'm a "
            },
            {
                "type": "text",
                "text": "super link",
                "marks": [
                    {
                        "type": "link",
                        "attrs": {
                            "href": 'https://daringfireball.net/projects/markdown/'
                        }
                    }
                ]
            },
            {
                "type": "text",
                "text": " in a sentence and an "
            },
            {
                "type": "text",
                "text": "end link",
                "marks": [
                    {
                        "type": "link",
                        "attrs": {
                            "href": 'https://google.com/'
                        }
                    }
                ]
            },]
        )


    })

    it("Link fake", () => {
        const data = `I'm a [) in a sentence`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();


        expect(jsonResult).toStrictEqual([
            {
                "type": "text",
                "text": data
            }
        ]
        )


    })
})