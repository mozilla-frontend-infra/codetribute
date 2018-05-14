import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';
import { DisplayModes } from '../../consts';

export default function Section(_ref, _ref2) {
	var section = _ref.section,
	    depth = _ref.depth;
	var displayMode = _ref2.displayMode;
	var name = section.name,
	    slug = section.slug,
	    filepath = section.filepath,
	    content = section.content,
	    components = section.components,
	    sections = section.sections,
	    description = section.description;


	var contentJsx = content && React.createElement(Examples, { examples: content, name: name });
	var componentsJsx = components && React.createElement(Components, { components: components, depth: depth + 1 });
	var sectionsJsx = sections && React.createElement(Sections, { sections: sections, depth: depth + 1 });

	return React.createElement(SectionRenderer, {
		description: description,
		name: name,
		slug: slug,
		filepath: filepath,
		content: contentJsx,
		components: componentsJsx,
		sections: sectionsJsx,
		isolated: displayMode !== DisplayModes.all,
		depth: depth
	});
}

Section.propTypes = {
	section: PropTypes.object.isRequired,
	depth: PropTypes.number.isRequired
};

Section.contextTypes = {
	displayMode: PropTypes.string
};