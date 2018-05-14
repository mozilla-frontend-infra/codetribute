import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';

export default function Examples(_ref, _ref2) {
	var examples = _ref.examples,
	    name = _ref.name;
	var codeRevision = _ref2.codeRevision;

	return React.createElement(
		ExamplesRenderer,
		null,
		examples.map(function (example, index) {
			switch (example.type) {
				case 'code':
					return React.createElement(Playground, {
						code: example.content,
						evalInContext: example.evalInContext,
						key: codeRevision + '/' + index,
						name: name,
						index: index,
						settings: example.settings
					});
				case 'markdown':
					return React.createElement(Markdown, { text: example.content, key: index });
				default:
					return null;
			}
		})
	);
}
Examples.propTypes = {
	examples: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired
};
Examples.contextTypes = {
	codeRevision: PropTypes.number.isRequired
};