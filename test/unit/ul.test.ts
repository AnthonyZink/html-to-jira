import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"

describe('Ul', () => {
    it("Ul classic", () => {
        const data = `<ul><li>ul 1</li><li>ul 2</li></ul>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "bulletList",
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "ul 1"
                                }
                            ]
                        },
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "ul 2"
                                }
                            ]
                        }
                    ]
                }
            ]
        }])
    })

    it("Ul with tree", () => {
        const data = `<ul><li>ul 1<ul><li>ul 1.1</li></ul></li><li>ul 2</li></ul>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([{
            "type": "bulletList",
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "ul 1"
                                }
                            ]
                        },
                        {
                            "type": "bulletList",
                            "content": [
                                {
                                    "type": "listItem",
                                    "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                                {
                                                    "type": "text",
                                                    "text": "ul 1.1"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "ul 2"
                                }
                            ]
                        }
                    ]
                }
            ]
        }])
    })
})