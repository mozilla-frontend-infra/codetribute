import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';

var styles = function styles(_ref) {
	var space = _ref.space;
	return {
		root: {
			marginBottom: space[4]
		}
	};
};

export function SectionRenderer(allProps) {
	var classes = allProps.classes,
	    name = allProps.name,
	    slug = allProps.slug,
	    content = allProps.content,
	    components = allProps.components,
	    sections = allProps.sections,
	    depth = allProps.depth,
	    description = allProps.description;


	return React.createElement(
		'section',
		{ className: classes.root },
		name && React.createElement(
			SectionHeading,
			{ depth: depth, id: slug, slotName: 'sectionToolbar', slotProps: allProps },
			name
		),
		description && React.createElement(Markdown, { text: description }),
		content,
		sections,
		components
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	slug: PropTypes.string,
	filepath: PropTypes.string,
	content: PropTypes.node,
	components: PropTypes.node,
	sections: PropTypes.node,
	isolated: PropTypes.bool,
	depth: PropTypes.number.isRequired
};

export default Styled(styles)(SectionRenderer);