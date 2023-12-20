import { JSDOM } from 'jsdom';
import HtmlToJsonConverter from "../../src/htmlConverter"
import fs from 'fs';
import path from 'path';


describe('Big test html', () => {
    it('should read the markdown file', () => {
        // Chemin du fichier Markdown
        const markdownPath = path.join(__dirname, '../data/mdx.html');

        // Lire le fichier
        const data = fs.readFileSync(markdownPath, 'utf8');

        const converter = new HtmlToJsonConverter(new JSDOM(data));
        const jsonResult = converter.convert();

        expect(jsonResult).toStrictEqual([
            {
                "type": "heading",
                "attrs": {
                    "level": 1
                },
                "content": [
                    {
                        "type": "text",
                        "text": "Welcome"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "This is a "
                    },
                    {
                        "type": "text",
                        "text": "live demo",
                        "marks": [
                            {
                                "type": "strong"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "text": " of MDXEditor with all default features on."
                    }
                ]
            },
            {
                "type": "blockquote",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "type": "text",
                                "text": "The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions."
                            }
                        ]
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "Daring Fireball",
                        "marks": [
                            {
                                "type": "link",
                                "attrs": {
                                    "href": "https://daringfireball.net/projects/markdown/"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "rule",
            },
            {
                "type": "paragraph",
                "content": [{
                    'type': "text",
                    'text': "In here, you can find the following markdown elements:"
                }]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "The current editor content is styled using the "
                    },
                    {
                        "type": "text",
                        "text": "@tailwindcss/typography",
                        "marks": [
                            {
                                "type": "code"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "text": "plugin",
                        "marks": [
                            {
                                "type": "link",
                                "attrs": {
                                    "href": "https://tailwindcss.com/docs/typography-plugin"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "heading",
                "attrs": {
                    "level": 2
                },
                "content": [
                    {
                        "type": "text",
                        "text": "What can you do here?"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [{
                    'type': "text",
                    'text': "This is a great location for you to test how editing markdown feels. If you have an existing markdown source, you can switch to source mode using the toggle group in the top right, paste it in there, and go back to rich text mode."
                }]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "A line with "
                    },
                    {
                        "type": "text",
                        "text": "striked text",
                        "marks": [
                            {
                                "type": "strike"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "text": " and "
                    },
                    {
                        "type": "text",
                        "text": "underlined text",
                        "marks": [
                            {
                                "type": "underline"
                            }
                        ]
                    },
                ]
            },
            {
                "type": "paragraph",
                "content": [{
                    'type': "text",
                    'text': "If you need a few ideas, here's what you can try:"
                }]
            },
            {
                "type": "heading",
                "attrs": {
                    "level": 2
                },
                "content": [
                    {
                        "type": "text",
                        "text": "A code sample"
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [{
                    'type': "text",
                    'text': "MDXEditor embeds CodeMirror for code editing."
                }]
            }
        ])
    });
});