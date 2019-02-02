import CustomElementFactory from './CustomElementFactory'
import CustomRenderer from './CustomRenderer';

export default {

	__init__: [
       'customRenderer',
    ],

    elementFactory: ['type', CustomElementFactory],
    customRenderer: [ 'type', CustomRenderer ],

}
