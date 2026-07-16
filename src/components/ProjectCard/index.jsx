import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import ProjectIcon from '../ProjectIcon';
import './index.css';

export default class ProjectCard extends Component {
  handleSummaryClick = (event) => {
    if (event.target.href) {
      event.stopPropagation();
    }
  };

  linkRenderer = (props) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );

  render() {
    const {
      classes,
      project: { icon, name, summary, fileName },
    } = this.props;

    return (
      <Link className="card-link"to={`projects/${fileName}`}>
        <div className="card">
            <ProjectIcon icon={icon} />
            <h4 className="card-title">{name}</h4>
            {summary && (
              <div className="card-content" onClick={this.handleSummaryClick}>
                <Markdown components={{ a: this.linkRenderer }}>{summary}</Markdown>
              </div>
            )}
        </div>
      </Link>
    );
  }
}
