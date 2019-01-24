export * from 'bpmn-js/test/helper';

import {
  insertCSS
} from 'bpmn-js/test/helper';

insertCSS('diagram-js.css', require('bpmn-js/dist/assets/diagram-js.css'));
insertCSS('bpmn-embedded.css', require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'));

insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.test-container > div'
);

import coreModule from 'bpmn-js/lib/core';
import bpmnPaletteModule from 'bpmn-js/lib/features/palette';
import modelingModule from 'bpmn-js/lib/features/modeling';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const response_html = `
	<div style="color:red">
		Hello World!
	</div>
`;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(response_html);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});
