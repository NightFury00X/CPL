declare let jQuery: any;
declare let moment: any;

export class Utils {
    static scrollTop() {
        jQuery('html, body').animate({ scrollTop: 0 }, 600);
    }

    static scrollTo(selector: string) {
        let $el = jQuery(selector);
        let offset = $el.length ? $el.offset().top + 'px' : 0;
        jQuery('html, body').animate({ scrollTop: offset }, 600);
    }

    static uuid() {
        /* tslint:disable */
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        /* tslint:enable */
    }



    static extractIdFromIRI(iriString: string = '') {
        return ((iriString || '').match(/\d+$/) || [])[0];
    }

    // Converts (size) to KB
    static toKB(size: number = 0): number {
        return size ? Math.round(<number>size / 1024) : 0;
    }


    static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static toURL(url: string) {
        var pattern = /^(http|https|ftp|\/\/)/;
        if (!pattern.test(url)) {
            url = 'http://' + url;
        }
        return url;
    }

    static isMobile(): any {
        /* tslint:disable */
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            },
            anyMobile: function() {
                return isMobile.any() && (window && window.screen && window.screen.width < 760);
            }
        };
        /* tslint:enable */
        return isMobile;
    }
}

export interface JsonLDArray {
    'hydra:member'?: any[];
}

export interface JsonLD {
    '@id'?: string;
    cid?: string;
}

export class GenericModel implements JsonLD {
    cid: string;

    static extractId(iriString: string = '') {
        return Utils.extractIdFromIRI(iriString);
    }

    constructor(attributes: JsonLD = {}) {
        this.cid = (attributes && attributes.cid) || Utils.uuid();
        return Object.assign(this, attributes);
    }

    isNew() {
        let id = this.id;
        return !(!!id && id.length);
    }

    equals(model: GenericModel) {
        return !!this['@id'] && !!model['@id'] ? this['@id'] === model['@id'] : this.cid === model.cid;
    }

    merge(model: any) {
        Object.keys(model).forEach((key) => {
            // Merge any property other than @id or cid (those 2 have to stay the same)
            if (key !== '@id') {
                this[key] = model[key];
            }
        });
    }

    update(model: any) {
        Object.keys(model).forEach((key) => {
            this[key] = model[key];
        });
    }

    serialize() {
        let clone = Object.assign({}, this);
        delete clone.cid;
        if (this.isNew()) {
            delete clone['@id'];
        }
        return clone;
    }

    get id(): string {
        return GenericModel.extractId(this['@id']);
    }
}

export class ArrayUtils {
    static remove(items: any[] = [], item: any): any[] {
        return ArrayUtils.removeByIndex(items, ArrayUtils.findIndex(items, item));
    }

    static removeByIndex(items: any[] = [], index: number): any[] {
        let array: any[] = [...items];
        if (index >= 0) {
            array.splice(index, 1);
        }
        return array;
    }

    static findIndex (array: GenericModel[], item: GenericModel): number {
        return array.findIndex((citem) => item.equals(citem));
    }

    static push(array: any[] = [], item: any) {
        return item ? [...array, item] : [...array];
    }

    static update(array: any[] = [], item: any) {
        return this.updateByIndex(array, ArrayUtils.findIndex(array, item), item);
    }

    static updateByIndex(array: any[] = [], index: number, item: any) {
        return index < 0 ? array : array.map((citem, cindex) => {
            return cindex === index ? item : citem;
        });
    }
}
