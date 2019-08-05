import CustomRules from './CustomRules';
import CustomPalette from './CustomPalette';
import CustomContextPadProvider from './CustomContextPadProvider';
import CustomReplace from './CustomReplace';
import CustomReplaceMenuProvider from './CustomReplaceMenuProvider';
import CustomUpdater from './CustomUpdater';

export default {
  __init__: [ 
    
    'customRules',
    'paletteProvider',

    'replaceMenuProvider',
    'contextPadProvider',

    'customUpdater',
    
  ],
  customRules: [ 'type', CustomRules ],
  paletteProvider: [ 'type', CustomPalette ],
  bpmnReplace: ['type', CustomReplace],

  replaceMenuProvider: [ 'type', CustomReplaceMenuProvider ],
  contextPadProvider: [ 'type', CustomContextPadProvider ],

  customUpdater: [ 'type', CustomUpdater ],

};
