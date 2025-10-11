/**
 * ClassInfoPanel - Layer 2: Detailed info modal/panel
 * Shows comprehensive class information for educational purposes
 */

import { getClassDescription } from '../data/classDescriptions';
import './ClassInfoPanel.css';

interface ClassInfoPanelProps {
  className: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ClassInfoPanel({ className, isOpen, onClose }: ClassInfoPanelProps) {
  const classInfo = getClassDescription(className);

  if (!isOpen || !classInfo) {
    return null;
  }

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <div className="class-info-backdrop" onClick={handleBackdropClick}>
      <div className="class-info-panel">
        <div className="panel-header">
          <div className="panel-title">
            <span className="panel-icon">{classInfo.icon}</span>
            <h2>{classInfo.name}</h2>
          </div>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="panel-content">
          <section className="panel-section">
            <h3>Overview</h3>
            <p>{classInfo.longDescription}</p>
          </section>

          <section className="panel-section">
            <h3>Playstyle</h3>
            <p className="playstyle-text">{classInfo.playstyle}</p>
          </section>

          <section className="panel-section strengths-section">
            <h3>Strengths</h3>
            <ul className="feature-list strengths-list">
              {classInfo.strengths.map((strength, index) => (
                <li key={index}>
                  <span className="feature-icon">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel-section weaknesses-section">
            <h3>Weaknesses</h3>
            <ul className="feature-list weaknesses-list">
              {classInfo.weaknesses.map((weakness, index) => (
                <li key={index}>
                  <span className="feature-icon">⚠</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel-section ideal-section">
            <h3>Ideal For</h3>
            <p className="ideal-text">{classInfo.idealFor}</p>
          </section>

          <section className="panel-section stats-section">
            <h3>Starting Stats</h3>
            <div className="stat-box">
              <span className="stat-label">Talent Points at Level 1:</span>
              <span className="stat-value-large">{classInfo.startingTalentPoints}</span>
            </div>
          </section>
        </div>

        <div className="panel-footer">
          <button
            type="button"
            className="confirm-button"
            onClick={onClose}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

// Need to import React for useEffect
import React from 'react';
