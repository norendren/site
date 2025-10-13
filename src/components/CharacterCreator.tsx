import { useState, useMemo } from 'react';
import { fillCharacterSheet, downloadPDF } from '../utils/pdfFiller';
import type { BasicCharacterData, TalentAllocation, AttributeAllocation } from '../utils/pdfFiller';
import { CLASSES, RACES, HOUSES, FAITHS } from '../utils/athiaConstants';
import {
  ACOLYTE_PROGRESSION,
  MAGE_PROGRESSION,
  ROGUE_PROGRESSION,
  WARRIOR_PROGRESSION,
  getAttributeBonus
} from '../utils/classReference';
import { TalentAllocator } from './TalentAllocator';
import { AttributeAllocator } from './AttributeAllocator';
import { RacialPerksSelector } from './RacialPerksSelector';
import { ClassInfoPreview } from './ClassInfoPreview';
import { ClassInfoPanel } from './ClassInfoPanel';
import './CharacterCreator.css';

export function CharacterCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [characterData, setCharacterData] = useState<BasicCharacterData>({
    characterName: '',
    class: '',
    level: '1',
    race: '',
    house: '',
    faith: '',
    age: '',
    racialPerks: [],
    talents: [],
    attributes: [],
  });
  const [baseAttributePool, setBaseAttributePool] = useState<number>(2); // Default: Young Heroes (0=Commoners, 2=Young Heroes, 4=Heroes)
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClassInfoOpen, setIsClassInfoOpen] = useState(false);

  // Calculate total attribute pool: base pool + level bonus
  const totalAttributePool = useMemo(() => {
    const level = parseInt(characterData.level) || 1;
    const className = characterData.class;

    // Base pool (campaign setting) + attribute bonus from level
    const levelBonus = getAttributeBonus(className, level);
    return baseAttributePool + levelBonus;
  }, [characterData.class, characterData.level, baseAttributePool]);

  // Calculate total talent points based on class and level
  const totalTalentPoints = useMemo(() => {
    const level = parseInt(characterData.level) || 1;
    const className = characterData.class;

    if (!className || level < 1 || level > 10) return 10; // Default

    let progression;
    switch (className) {
      case 'Acolyte':
        progression = ACOLYTE_PROGRESSION;
        break;
      case 'Mage':
        progression = MAGE_PROGRESSION;
        break;
      case 'Rogue':
        progression = ROGUE_PROGRESSION;
        break;
      case 'Warrior':
        progression = WARRIOR_PROGRESSION;
        break;
      default:
        return 10;
    }

    const levelData = progression[level - 1];
    return levelData?.talentPoints || 10;
  }, [characterData.class, characterData.level]);

  const handleInputChange = (field: keyof BasicCharacterData, value: string) => {
    setCharacterData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTalentsChange = (talents: TalentAllocation[]) => {
    setCharacterData(prev => ({
      ...prev,
      talents,
    }));
  };

  const handleAttributesChange = (attributes: AttributeAllocation[]) => {
    setCharacterData(prev => ({
      ...prev,
      attributes,
    }));
  };

  const handleAttributePoolChange = (pool: number) => {
    setBaseAttributePool(pool);
  };

  const handleRacialPerksChange = (racialPerks: string[]) => {
    setCharacterData(prev => ({
      ...prev,
      racialPerks,
    }));
  };

  const validateStep = (step: number): boolean => {
    setError(null);

    switch (step) {
      case 1:
        if (!characterData.characterName.trim()) {
          setError('Character name is required');
          return false;
        }
        if (!characterData.class) {
          setError('Class is required');
          return false;
        }
        if (!characterData.race) {
          setError('Race is required');
          return false;
        }
        return true;
      case 2:
        // Racial perks validation
        if (!characterData.racialPerks || characterData.racialPerks.length !== 2) {
          setError('Please select exactly 2 racial perks');
          return false;
        }
        return true;
      case 3:
        // Attribute validation - optional for now
        return true;
      case 4:
        // Talent validation - optional for now
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleGenerateCharacter = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      // Validate required fields
      if (!characterData.characterName.trim()) {
        throw new Error('Character name is required');
      }
      if (!characterData.class) {
        throw new Error('Class is required');
      }
      if (!characterData.race) {
        throw new Error('Race is required');
      }

      // Generate the PDF
      const pdfBytes = await fillCharacterSheet(
        '/pdf/sheet.pdf',
        characterData
      );

      // Download the filled PDF
      const filename = `${characterData.characterName.replace(/\s+/g, '_')}_character_sheet.pdf`;
      downloadPDF(pdfBytes, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate character sheet');
      console.error('Error generating character:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Basic Information</h2>
            <p className="step-description">Let's start with the basics about your character.</p>

            <div className="form-group">
              <label htmlFor="characterName">
                Character Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="characterName"
                value={characterData.characterName}
                onChange={(e) => handleInputChange('characterName', e.target.value)}
                placeholder="Enter character name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="class">
                Class <span className="required">*</span>
              </label>
              <select
                id="class"
                value={characterData.class}
                onChange={(e) => handleInputChange('class', e.target.value)}
                required
              >
                <option value="">Select a class</option>
                {CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="level">Level</label>
              <input
                type="number"
                id="level"
                value={characterData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                placeholder="Enter level"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="race">
                Race <span className="required">*</span>
              </label>
              <select
                id="race"
                value={characterData.race}
                onChange={(e) => handleInputChange('race', e.target.value)}
                required
              >
                <option value="">Select a race</option>
                {RACES.map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="house">House</label>
              <select
                id="house"
                value={characterData.house}
                onChange={(e) => handleInputChange('house', e.target.value)}
              >
                <option value="">Select a house</option>
                {HOUSES.map(house => (
                  <option key={house} value={house}>{house}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="faith">Faith</label>
              <select
                id="faith"
                value={characterData.faith}
                onChange={(e) => handleInputChange('faith', e.target.value)}
              >
                <option value="">Select a faith</option>
                {FAITHS.map(faith => (
                  <option key={faith} value={faith}>{faith}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={characterData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter age"
                min="1"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>{characterData.race} Racial Perks Available</h2>
            <p className="step-description">Choose 2 racial perks that define your character's unique heritage abilities.</p>
            <RacialPerksSelector
              race={characterData.race}
              selectedPerks={characterData.racialPerks || []}
              onPerksChange={handleRacialPerksChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Attribute Allocation</h2>
            <p className="step-description">Distribute your attribute points across your character's core stats. The total of all the attributes must not exceed the pool decided by the GM. Default is +2 for "Young Heroes"</p>
            <AttributeAllocator
              attributePool={totalAttributePool}
              allocatedAttributes={characterData.attributes || []}
              onAttributesChange={handleAttributesChange}
              onPoolChange={handleAttributePoolChange}
            />
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Talent Allocation</h2>
            <p className="step-description">Choose your character's talents and abilities.</p>
            {characterData.class && characterData.level ? (
              <TalentAllocator
                totalTalentPoints={totalTalentPoints}
                allocatedTalents={characterData.talents || []}
                allocatedAttributes={characterData.attributes || []}
                onTalentsChange={handleTalentsChange}
              />
            ) : (
              <div className="warning-message">
                Please complete Step 1 (Basic Information) to configure talents.
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2>Review & Generate</h2>
            <p className="step-description">Review your character and generate the PDF character sheet.</p>

            <div className="review-section">
              <h3>Character Summary</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Name:</span>
                  <span className="review-value">{characterData.characterName || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Class:</span>
                  <span className="review-value">{characterData.class || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Level:</span>
                  <span className="review-value">{characterData.level || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Race:</span>
                  <span className="review-value">{characterData.race || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">House:</span>
                  <span className="review-value">{characterData.house || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Faith:</span>
                  <span className="review-value">{characterData.faith || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Age:</span>
                  <span className="review-value">{characterData.age || '—'}</span>
                </div>
              </div>

              {characterData.racialPerks && characterData.racialPerks.length > 0 && (
                <>
                  <h3>Racial Perks</h3>
                  <div className="review-list">
                    {characterData.racialPerks.map((perk, idx) => (
                      <div key={idx} className="review-list-item">
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {characterData.attributes && characterData.attributes.length > 0 && (
                <>
                  <h3>Attributes</h3>
                  <div className="review-list">
                    {characterData.attributes.map((attr, idx) => (
                      <div key={idx} className="review-list-item">
                        <span>{attr.name}:</span>
                        <span>{attr.points}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {characterData.talents && characterData.talents.length > 0 && (
                <>
                  <h3>Talents</h3>
                  <div className="review-list">
                    {characterData.talents.map((talent, idx) => (
                      <div key={idx} className="review-list-item">
                        <span>{talent.name}:</span>
                        <span>{talent.points}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="character-creator">
      <h1 style={{ color: '#cbd5e1'}}>Athia Character Creator</h1>

      {/* Progress indicator */}
      <div className="wizard-progress">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="progress-circle">1</div>
          <div className="progress-label">Basic Info</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="progress-circle">2</div>
          <div className="progress-label">Perks</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
          <div className="progress-circle">3</div>
          <div className="progress-label">Attributes</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}>
          <div className="progress-circle">4</div>
          <div className="progress-label">Talents</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}>
          <div className="progress-circle">5</div>
          <div className="progress-label">Review</div>
        </div>
      </div>

      <div className="creator-layout">
        <div className="character-form">
          {/* Step content */}
          {renderStepContent()}

          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="wizard-navigation">
            <button
              type="button"
              className="nav-button back-button"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                className="nav-button next-button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="generate-button"
                onClick={handleGenerateCharacter}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Character Sheet'}
              </button>
            )}
          </div>
        </div>

        {/* Right sidebar: Helper text area */}
        <aside className="helper-sidebar">
          <div className="sidebar-sticky">
            {characterData.class ? (
              <ClassInfoPreview
                className={characterData.class}
                currentLevel={parseInt(characterData.level) || 1}
                currentTalentPoints={totalTalentPoints}
                onShowDetails={() => setIsClassInfoOpen(true)}
              />
            ) : (
              <div className="helper-placeholder">
                <h3>Need help choosing?</h3>
                <p>Select a class to learn more about it. We'll show you details about playstyle, strengths, and what makes each class unique.</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Layer 2: Detailed info modal */}
      {characterData.class && (
        <ClassInfoPanel
          className={characterData.class}
          isOpen={isClassInfoOpen}
          onClose={() => setIsClassInfoOpen(false)}
        />
      )}
    </div>
  );
}
