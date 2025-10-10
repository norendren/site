import { useState, useMemo } from 'react';
import { COMMON_TALENTS, TALENT_COSTS } from '../utils/classReference';
import type { TalentExpertise } from '../utils/classReference';
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
      return total + TALENT_COSTS[talent.expertise];
    }, 0);
  }, [allocatedTalents]);

  const remainingPoints = totalTalentPoints - spentPoints;

  // Get current expertise for a talent
  const getTalentExpertise = (talentName: string): TalentExpertise => {
    const talent = allocatedTalents.find(t => t.name === talentName);
    return talent?.expertise || 'none';
  };

  // Check if we can afford to upgrade a talent
  const canAffordUpgrade = (currentExpertise: TalentExpertise): boolean => {
    const nextLevel: TalentExpertise =
      currentExpertise === 'none' ? 'apprentice' :
      currentExpertise === 'apprentice' ? 'journeyman' :
      currentExpertise === 'journeyman' ? 'master' :
      'master';

    if (nextLevel === currentExpertise) return false; // Already at max

    const costDifference = TALENT_COSTS[nextLevel] - TALENT_COSTS[currentExpertise];
    return remainingPoints >= costDifference;
  };

  // Set talent expertise level
  const setTalentExpertise = (talentName: string, expertise: TalentExpertise) => {
    const newTalents = allocatedTalents.filter(t => t.name !== talentName);

    if (expertise !== 'none') {
      newTalents.push({ name: talentName, expertise });
    }

    onTalentsChange(newTalents);
  };

  // Increment talent expertise
  const incrementTalent = (talentName: string) => {
    const currentExpertise = getTalentExpertise(talentName);

    if (!canAffordUpgrade(currentExpertise)) return;

    const nextExpertise: TalentExpertise =
      currentExpertise === 'none' ? 'apprentice' :
      currentExpertise === 'apprentice' ? 'journeyman' :
      'master';

    setTalentExpertise(talentName, nextExpertise);
  };

  // Decrement talent expertise
  const decrementTalent = (talentName: string) => {
    const currentExpertise = getTalentExpertise(talentName);

    if (currentExpertise === 'none') return;

    const prevExpertise: TalentExpertise =
      currentExpertise === 'master' ? 'journeyman' :
      currentExpertise === 'journeyman' ? 'apprentice' :
      'none';

    setTalentExpertise(talentName, prevExpertise);
  };

  // Render expertise bubbles
  const renderBubbles = (expertise: TalentExpertise) => {
    const filledCount = TALENT_COSTS[expertise];

    return (
      <div className="talent-bubbles">
        {[1, 2, 3].map(level => (
          <div
            key={level}
            className={`bubble ${level <= filledCount ? 'filled' : 'empty'}`}
            title={level === 1 ? 'Apprentice' : level === 2 ? 'Journeyman' : 'Master'}
          />
        ))}
      </div>
    );
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
        {COMMON_TALENTS.map((talentName) => {
          const expertise = getTalentExpertise(talentName);
          const canUpgrade = canAffordUpgrade(expertise);
          const canDowngrade = expertise !== 'none';

          return (
            <div
              key={talentName}
              className={`talent-row ${selectedTalent === talentName ? 'selected' : ''}`}
              onClick={() => setSelectedTalent(talentName)}
            >
              <div className="talent-name">{talentName}</div>

              {renderBubbles(expertise)}

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
                  {expertise === 'none' ? '—' :
                   expertise === 'apprentice' ? 'App' :
                   expertise === 'journeyman' ? 'Jrn' :
                   'Mst'}
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
