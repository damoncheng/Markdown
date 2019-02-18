import CustomElementFactory from './CustomElementFactory'
import CustomRenderer from './CustomRenderer';
import CustomPalette from './CustomPalette';
import CustomContextPadProvider from './CustomContextPadProvider';

import CustomRules from './CustomRules';

export default {

	__init__: [
       'customRenderer',
       'paletteProvider',
       'contextPadProvider',

       'customRules',
    ],

    elementFactory: ['type', CustomElementFactory],
    customRenderer: [ 'type', CustomRenderer ],
    paletteProvider: [ 'type', CustomPalette ],
    contextPadProvider: [ 'type', CustomContextPadProvider ],

    customRules: [ 'type', CustomRules ],


}
