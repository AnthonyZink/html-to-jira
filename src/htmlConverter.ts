import { JSDOM } from 'jsdom';

export default class HtmlToJsonConverter {
    private dom: JSDOM;

    constructor(html: JSDOM) {
        this.dom = html;
    }

    public convert(): any[] {
        return this.processNode(this.dom.window.document.body);
    }

    private processNode(node: Node): any[] {
        let result = [];
        node.childNodes.forEach((child) => {
            if (child instanceof this.dom.window.HTMLElement) {
                //@ts-ignore
                let jsonNode = this.elementToJson(child);
                if (jsonNode) {
                    result.push(jsonNode);
                }
            } else if (child.nodeType === this.dom.window.Node.TEXT_NODE) {
                let textNode = this.textToJson(child as Text);
                if (textNode) {
                    result.push(textNode);
                }
            }
        });

        return result;
    }

    private elementToJson(element: HTMLElement): any | null {
        switch (element.tagName.toLowerCase()) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                return this.headingToJson(element);
            case 'hr':
                return this.hrToJson(element);
            case 'p':
                return this.paragraphToJson(element);
            case 'del':
                return this.strikeToJson(element);
            case 'u':
                return this.underlineToJson(element);
            case 'i':
                return this.italicToJson(element);
            case 'a':
                //@ts-ignore
                return this.linkToJson(element);
            case 'code':
                return this.codeToJson(element);
            case 'strong':
            case 'b':
                return this.strongToJson(element);
            case 'blockquote':
                return this.blockquoteToJson(element);
            case 'ul':
                return this.ulToJson(element);
            case 'ol':
                return this.olToJson(element);
            case 'li':
                return this.liToJson(element);
            default:
                return null;
        }
    }

    private ulToJson(ulElement: HTMLElement): any {
        return {
            type: 'bulletList',
            content: Array.from(ulElement.children)
                .filter(child => child.tagName.toLowerCase() === 'li')
                .map(li => this.liToJson(li as HTMLElement))
        };
    }

    private olToJson(olElement: HTMLElement): any {
        // Récupérer l'attribut 'start' s'il est présent, sinon utiliser 1 comme valeur par défaut
        let order = olElement.getAttribute('start') ? parseInt(olElement.getAttribute('start')!) : 1;

        return {
            type: 'orderedList',
            attrs: {
                order: order
            },
            content: Array.from(olElement.children)
                .filter(child => child.tagName.toLowerCase() === 'li')
                .map(li => this.liToJson(li as HTMLElement))
        };
    }

    private liToJson(liElement: HTMLElement): any {
        // Extraction du texte directement contenu dans le <li> (sans les balises enfants)
        let textContent = Array.from(liElement.childNodes)
            .filter(node => node.nodeType === this.dom.window.Node.TEXT_NODE)
            .map(node => node.textContent?.trim())
            .join(' ')
            .trim();

        // Construction du contenu de l'objet listItem
        let content = [];
        if (textContent) {
            content.push({
                type: 'paragraph',
                content: [{ type: 'text', text: textContent }]
            });
        }

        // Traitement des listes imbriquées (ul ou ol)
        let nestedList = liElement.querySelector('ul, ol');
        if (nestedList) {
            if (nestedList.tagName.toLowerCase() === 'ul') {
                // @ts-ignore
                content.push(this.ulToJson(nestedList));
            } else {
                // @ts-ignore
                content.push(this.olToJson(nestedList));
            }
        }

        return {
            type: 'listItem',
            content: content
        };
    }

    private headingToJson(element: HTMLElement): any {
        return {
            type: 'heading',
            attrs: { level: parseInt(element.tagName.substring(1)) },
            content: this.processNode(element)
        };
    }

    private hrToJson(element: HTMLElement): any {
        return {
            type: 'rule'
        };
    }

    private paragraphToJson(element: HTMLElement): any {
        return {
            type: 'paragraph',
            content: this.processNode(element)
        };
    }

    private linkToJson(element: HTMLAnchorElement): any {
        return {
            type: 'text',
            text: element.textContent || '',
            marks: [{
                type: 'link',
                attrs: { href: element.href }
            }]
        };
    }

    private strongToJson(element: HTMLElement): any {
        return {
            type: 'text',
            text: element.textContent || '',
            marks: [{ type: 'strong' }]
        };
    }

    private strikeToJson(element: HTMLElement): any {
        return {
            type: 'text',
            text: element.textContent || '',
            marks: [{ type: 'strike' }]
        };
    }

    private italicToJson(element: HTMLElement): any {
        return {
            type: 'text',
            text: element.textContent || '',
            marks: [{ type: 'em' }]
        };
    }

    private underlineToJson(element: HTMLElement): any {
        return {
            type: 'text',
            text: element.textContent || '',
            marks: [{ type: 'underline' }]
        };
    }

    private blockquoteToJson(element: HTMLElement): any {
        return {
            type: 'blockquote',
            content: this.processNode(element)
        };
    }

    private textToJson(text: Text): any | null {
        if (text.textContent?.trim()) {
            return {
                type: 'text',
                text: text.textContent
            };
        }
        return null;
    }

    private codeToJson(codeElement: HTMLElement): any {
        return {
            type: 'text',
            text: codeElement.textContent || '',
            marks: [{ type: 'code' }]
        };
    }
}