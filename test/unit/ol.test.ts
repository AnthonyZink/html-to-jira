import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"

describe('Ol', () => {
    it("Ol classic", () => {
        const data = `<ol><li>ol 1</li><li>ol 2</li></ol>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "orderedList",
                "attrs": {
                    "order": 1
                },
                "content": [
                    {
                        "type": "listItem",
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "type": "text",
                                        "text": "ol 1"
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
                                        "text": "ol 2"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ])
    })

    it("Ul with tree", () => {
        const data = `<ol><li>ol 1<ol><li>ol 1.a<ol><li>ol 1.a.i</li></ol></li></ol></li><li>ol 2</li></ol>`

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "orderedList",
                "attrs": {
                    "order": 1
                },
                "content": [
                    {
                        "type": "listItem",
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "type": "text",
                                        "text": "ol 1"
                                    }
                                ]
                            },
                            {
                                "type": "orderedList",
                                "attrs": {
                                    "order": 1
                                },
                                "content": [
                                    {
                                        "type": "listItem",
                                        "content": [
                                            {
                                                "type": "paragraph",
                                                "content": [
                                                    {
                                                        "type": "text",
                                                        "text": "ol 1.a"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "orderedList",
                                                "attrs": {
                                                    "order": 1
                                                },
                                                "content": [
                                                    {
                                                        "type": "listItem",
                                                        "content": [
                                                            {
                                                                "type": "paragraph",
                                                                "content": [
                                                                    {
                                                                        "type": "text",
                                                                        "text": "ol 1.a.i"
                                                                    }
                                                                ]
                                                            }
                                                        ]
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
                                        "text": "ol 2"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ])
    })
})