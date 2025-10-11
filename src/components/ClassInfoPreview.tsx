/**
 * ClassInfoPreview - Layer 1: Inline preview component
 * Shows a brief summary when a class is selected
 */

import { getClassDescription } from '../data/classDescriptions';
import './ClassInfoPreview.css';

interface ClassInfoPreviewProps {
  className: string;
  currentLevel?: number;
  currentTalentPoints?: number;
  onShowDetails?: () => void;
}

export function ClassInfoPreview({ className, currentLevel, currentTalentPoints, onShowDetails }: ClassInfoPreviewProps) {
  const classInfo = getClassDescription(className);

  if (!classInfo) {
    return null;
  }

  return (
    <div className="class-info-preview">
      <div className="class-info-header">
        <span className="class-icon">{classInfo.icon}</span>
        <h3 className="class-name">{classInfo.name}</h3>
      </div>

      <p className="class-short-description">{classInfo.shortDescription}</p>

      <div className="class-quick-stats">
        <div className="quick-stat">
          <span className="stat-label">Talent Points {currentLevel ? `(Level ${currentLevel})` : '(Level 1)'}:</span>
          <span className="stat-value">{currentTalentPoints ?? classInfo.startingTalentPoints}</span>
        </div>
        <div className="quick-stat">
          <span className="stat-label">Playstyle:</span>
          <span className="stat-value">{classInfo.playstyle}</span>
        </div>
      </div>

      {onShowDetails && (
        <button
          type="button"
          className="learn-more-button"
          onClick={onShowDetails}
        >
          Learn more →
        </button>
      )}
    </div>
  );
}
