import React from 'react';
import { BUGZILLA_LANGUAGES, THIRD_PARTY_LINKS } from '../../utils/constants';
import { Link, useParams } from 'react-router-dom';
import './index.css';

export default function Sidebar({ classes }) {
  const { language: activeLanguage } = useParams();
  const languages = ['Swift', ...Object.keys(BUGZILLA_LANGUAGES)].sort();

  return (
    <div className="flex flex-column flex-grow-1">
      <ul className="nav nav-tiles flex-column">
        {languages.map((language) => (
          <li key={language} className="nav-item">
            <Link
              className={
                language.toLowerCase() === activeLanguage
                  ? 'nav-link active'
                  : 'nav-link'
              }
              to={`/languages/${language.toLowerCase()}`}
            >
              {language}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="nav flex-column flex-grow-1 justify-content-end">
        {THIRD_PARTY_LINKS.map((link) => (
          <li key={link.link}>
            <a
              className="nav-link"
              rel="noopener noreferrer"
              target="_blank"
              href={link.link}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
