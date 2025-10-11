import { useState, useMemo } from 'react';
import { ATHIA_TALENTS, TALENT_ATTRIBUTES } from '../utils/classReference';
import type { TalentName } from '../utils/classReference';
import type { TalentAllocation } from '../utils/pdfFiller';
import './TalentAllocator.css';

interface TalentAllocatorProps {
  totalTalentPoints: number;
  allocatedTalents: TalentAllocation[];
  onTalentsChange: (talents: TalentAllocation[]) => void;
}

export function TalentAllocator({ totalTalentPoints, allocatedTalents, onTalentsChange }: TalentAllocatorProps) {
  const [selectedTalent, setSelectedTalent] = useState<string | null>(null);

  // Calculate spent talent points
  const spentPoints = useMemo(() => {
    return allocatedTalents.reduce((total, talent) => {
      return total + talent.points;
    }, 0);
  }, [allocatedTalents]);

  const remainingPoints = totalTalentPoints - spentPoints;

  // Get current points for a talent
  const getTalentPoints = (talentName: string): number => {
    const talent = allocatedTalents.find(t => t.name === talentName);
    return talent?.points || 0;
  };

  // Check if we can afford to add a point
  const canAffordUpgrade = (currentPoints: number): boolean => {
    return currentPoints < 6 && remainingPoints >= 1;
  };

  // Set talent points
  const setTalentPoints = (talentName: string, points: number) => {
    const newTalents = allocatedTalents.filter(t => t.name !== talentName);

    if (points > 0) {
      newTalents.push({ name: talentName, points });
    }

    onTalentsChange(newTalents);
  };

  // Increment talent (add 1 point)
  const incrementTalent = (talentName: string) => {
    const currentPoints = getTalentPoints(talentName);

    if (!canAffordUpgrade(currentPoints)) return;

    setTalentPoints(talentName, currentPoints + 1);
  };

  // Decrement talent (remove 1 point)
  const decrementTalent = (talentName: string) => {
    const currentPoints = getTalentPoints(talentName);

    if (currentPoints === 0) return;

    setTalentPoints(talentName, currentPoints - 1);
  };

  // Render expertise bubbles
  // Total 6 bubbles: 1-2 = Apprentice, 3-5 = Journeyman, 6 = Master
  const renderBubbles = (points: number) => {
    return (
      <div className="talent-bubbles">
        {[1, 2, 3, 4, 5, 6].map(level => {
          let title = '';
          if (level <= 2) title = 'Apprentice';
          else if (level <= 5) title = 'Journeyman';
          else title = 'Master';

          return (
            <div
              key={level}
              className={`bubble ${level <= points ? 'filled' : 'empty'}`}
              title={title}
            />
          );
        })}
      </div>
    );
  };

  // Get expertise label from points
  const getExpertiseLabel = (points: number): string => {
    if (points === 0) return '—';
    if (points <= 2) return 'App';
    if (points <= 5) return 'Jrn';
    return 'Mst';
  };

  return (
    <div className="talent-allocator">
      <div className="talent-header">
        <h3>Talent Points</h3>
        <div className="talent-points-display">
          <span className="remaining">{remainingPoints}</span>
          <span className="separator">/</span>
          <span className="total">{totalTalentPoints}</span>
          <span className="label">Available</span>
        </div>
      </div>

      <div className="talent-list">
        {ATHIA_TALENTS.map((talentName: TalentName) => {
          const points = getTalentPoints(talentName);
          const canUpgrade = canAffordUpgrade(points);
          const canDowngrade = points > 0;
          const attribute = TALENT_ATTRIBUTES[talentName];

          return (
            <div
              key={talentName}
              className={`talent-row ${selectedTalent === talentName ? 'selected' : ''}`}
              onClick={() => setSelectedTalent(talentName)}
            >
              <div className="talent-name">
                {talentName}
                <span className="talent-attribute">({attribute})</span>
              </div>

              {renderBubbles(points)}

              <div className="talent-controls">
                <button
                  className="talent-btn decrement"
                  onClick={(e) => {
                    e.stopPropagation();
                    decrementTalent(talentName);
                  }}
                  disabled={!canDowngrade}
                  aria-label={`Decrease ${talentName}`}
                >
                  −
                </button>

                <span className="expertise-label">
                  {getExpertiseLabel(points)}
                </span>

                <button
                  className="talent-btn increment"
                  onClick={(e) => {
                    e.stopPropagation();
                    incrementTalent(talentName);
                  }}
                  disabled={!canUpgrade}
                  aria-label={`Increase ${talentName}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {remainingPoints < 0 && (
        <div className="error-message">
          Warning: You have allocated more talent points than available!
        </div>
      )}
    </div>
  );
}
