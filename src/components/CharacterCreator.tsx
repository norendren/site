import { useState, useMemo, useEffect, useRef } from 'react';
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
import { calculateTalentPointBonus } from '../utils/raceReference';
import type {
  ArcaneAptitudeAllocation,
  RogueSpecialtySelection,
  WarriorStyleSelection,
} from '../utils/classSpecialties';
import { calculateAcolyteBless } from '../utils/classSpecialties';
import { TalentAllocator } from './TalentAllocator';
import { AttributeAllocator } from './AttributeAllocator';
import { RacialPerksSelector } from './RacialPerksSelector';
import { ClassSpecialtySelector } from './ClassSpecialtySelector';
import { ClassInfoPreview } from './ClassInfoPreview';
import { ClassInfoPanel } from './ClassInfoPanel';
import { EditableDerivedStatsDisplay } from './EditableDerivedStatsDisplay';
import { AbilitySelector } from './AbilitySelector';
import { useDevMode } from '../hooks/useDevMode';
import { getTestCharacterByClass } from '../utils/testData';
import { abilities } from '../data/abilities';
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
    arcaneAllocations: [],
    rogueSpecialties: [],
    warriorStyles: [],
    abilities: [],
    manualOverrides: {},
  });
  const [baseAttributePool, setBaseAttributePool] = useState<number>(2); // Default: Young Heroes (0=Commoners, 2=Young Heroes, 4=Heroes)
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClassInfoOpen, setIsClassInfoOpen] = useState(false);

  // Helper function to get ability description
  const getAbilityDescription = (abilityName: string): string | undefined => {
    // Search through all class ability lists
    for (const classAbilities of Object.values(abilities)) {
      if (classAbilities[abilityName]) {
        return classAbilities[abilityName].description;
      }
    }
    return undefined;
  };

  // Dev mode for rapid testing
  // const { isDevMode, toggleDevMode } = useDevMode();
  const { isDevMode } = useDevMode();
  const prevDevMode = useRef(isDevMode);

  // Auto-fill test data when dev mode is enabled (initial load)
  useEffect(() => {
    if (isDevMode && !characterData.characterName) {
      // Auto-fill with Warrior test data by default
      const testData = getTestCharacterByClass('Warrior');
      setCharacterData(testData);
    }
  }, [isDevMode]); // Only run when dev mode changes

  // Lazy-load test data when class changes in dev mode
  useEffect(() => {
    if (isDevMode && characterData.class) {
      // Get fresh test data for the selected class
      const testData = getTestCharacterByClass(characterData.class);

      // Merge with existing data, preserving basic info but updating class-specific fields
      setCharacterData(prev => ({
        ...testData,
        // Keep user-modified basic info if present
        characterName: prev.characterName || testData.characterName,
        level: prev.level || testData.level,
        house: prev.house || testData.house,
        faith: prev.faith || testData.faith,
        age: prev.age || testData.age,
      }));
    }
  }, [characterData.class, isDevMode]); // Re-run when class changes in dev mode

  // Clear all data when dev mode is disabled
  useEffect(() => {
    // Detect transition from dev mode ON to OFF
    if (prevDevMode.current && !isDevMode) {
      clearData();
      setCurrentStep(1);
    }
    prevDevMode.current = isDevMode;
  }, [isDevMode]);

  // Calculate total attribute pool: base pool + level bonus
  const totalAttributePool = useMemo(() => {
    const level = parseInt(characterData.level) || 1;
    const className = characterData.class;

    // Base pool (campaign setting) + attribute bonus from level
    const levelBonus = getAttributeBonus(className, level);
    return baseAttributePool + levelBonus;
  }, [characterData.class, characterData.level, baseAttributePool]);

  // Calculate total talent points based on class and level + racial perk bonuses
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
    const baseTalentPoints = levelData?.talentPoints || 10;

    // Add bonus talent points from racial perks (e.g., Human "Sharp" = +4)
    const perkBonus = characterData.race && characterData.racialPerks
      ? calculateTalentPointBonus(characterData.race, characterData.racialPerks)
      : 0;

    return baseTalentPoints + perkBonus;
  }, [characterData.class, characterData.level, characterData.race, characterData.racialPerks]);

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

  const handleArcaneAllocationsChange = (arcaneAllocations: ArcaneAptitudeAllocation[]) => {
    setCharacterData(prev => ({
      ...prev,
      arcaneAllocations,
    }));
  };

  const handleRogueSpecialtiesChange = (rogueSpecialties: RogueSpecialtySelection[]) => {
    setCharacterData(prev => ({
      ...prev,
      rogueSpecialties,
    }));
  };

  const handleWarriorStylesChange = (warriorStyles: WarriorStyleSelection[]) => {
    setCharacterData(prev => ({
      ...prev,
      warriorStyles,
    }));
  };

  const handleAbilitiesChange = (abilities: string[]) => {
    setCharacterData(prev => ({
      ...prev,
      abilities,
    }));
  };

  // Handler for manual stat overrides in review page
  const handleStatOverride = (statName: string, value: number | undefined) => {
    setCharacterData(prev => ({
      ...prev,
      manualOverrides: {
        ...prev.manualOverrides,
        [statName]: value,
      },
    }));
  };

  // Handler for editing attribute points in review page
  const handleAttributePointsEdit = (attrName: string, points: number) => {
    setCharacterData(prev => ({
      ...prev,
      attributes: prev.attributes?.map(attr =>
        attr.name === attrName ? { ...attr, points } : attr
      ) || [],
    }));
  };

  // Handler for editing talent points in review page
  const handleTalentPointsEdit = (talentName: string, points: number) => {
    setCharacterData(prev => ({
      ...prev,
      talents: prev.talents?.map(talent =>
        talent.name === talentName ? { ...talent, points } : talent
      ) || [],
    }));
  };

  // Clear all character data (dev mode utility)
  const clearData = () => {
    setCharacterData({
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
      arcaneAllocations: [],
      rogueSpecialties: [],
      warriorStyles: [],
      abilities: [],
      manualOverrides: {},
    });
    setBaseAttributePool(2); // Reset to default (Young Heroes)
    setError(null);
  };

  // Switch test character by class (dev mode utility)
  const switchTestCharacter = (className: string) => {
    const testChar = getTestCharacterByClass(className);
    setCharacterData(testChar);
    setError(null);
  };

  const validateStep = (step: number): boolean => {
    setError(null);

    // Skip validation in dev mode
    if (isDevMode) {
      return true;
    }

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
        // Class specialties validation - optional for now
        return true;
      case 4:
        // Attribute validation - optional for now
        return true;
      case 5:
        // Talent validation - optional for now
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Check if user can navigate to a specific step
  const canNavigateToStep = (targetStep: number): boolean => {
    // In dev mode, allow navigation to any step
    if (isDevMode) {
      return true;
    }

    // Can always navigate to previous steps (already completed)
    if (targetStep < currentStep) {
      return true;
    }

    // Can't skip ahead
    if (targetStep > currentStep) {
      return false;
    }

    // Can stay on current step
    return true;
  };

  const handleStepClick = (targetStep: number) => {
    if (!canNavigateToStep(targetStep)) {
      return;
    }

    // If going forward, validate current step first (unless in dev mode)
    if (targetStep > currentStep && !isDevMode) {
      if (validateStep(currentStep)) {
        setCurrentStep(targetStep);
      }
    } else {
      // Going back or staying on current step, just navigate
      setError(null);
      setCurrentStep(targetStep);
    }
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

            {/* Dev Mode: Switch Character */}
            {isDevMode && (
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                padding: '0.75rem',
                backgroundColor: '#fef3c7',
                borderRadius: '0.375rem',
                marginBottom: '1rem'
              }}>
                <strong style={{ width: '100%', fontSize: '0.875rem', color: '#92400e' }}>Switch Test Character:</strong>
                <button type="button" onClick={() => switchTestCharacter('Warrior')} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Warrior
                </button>
                <button type="button" onClick={() => switchTestCharacter('Mage')} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Mage
                </button>
                <button type="button" onClick={() => switchTestCharacter('Rogue')} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Rogue
                </button>
                <button type="button" onClick={() => switchTestCharacter('Acolyte')} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Acolyte
                </button>
                <button type="button" onClick={clearData} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Clear Data
                </button>
              </div>
            )}

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
            <h2>Class Specialty: {characterData.class}</h2>
            <p className="step-description">Configure your class-specific abilities and specializations.</p>
            {characterData.class && characterData.level ? (
              <ClassSpecialtySelector
                className={characterData.class}
                level={parseInt(characterData.level) || 1}
                arcaneAllocations={characterData.arcaneAllocations}
                onArcaneChange={handleArcaneAllocationsChange}
                rogueSpecialties={characterData.rogueSpecialties}
                onRogueSpecialtiesChange={handleRogueSpecialtiesChange}
                warriorStyles={characterData.warriorStyles}
                onWarriorStylesChange={handleWarriorStylesChange}
              />
            ) : (
              <div className="warning-message">
                Please complete Step 1 (Basic Information) to configure class specialties.
              </div>
            )}
          </div>
        );

      case 4:
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

      case 5:
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

      case 6:
        return (
          <div className="step-content">
            <h2>Abilities</h2>
            <p className="step-description">
              Select character abilities that define your unique capabilities and skills.
            </p>
            {characterData.class && characterData.level ? (
              <AbilitySelector
                className={characterData.class}
                level={parseInt(characterData.level) || 1}
                selectedAbilities={characterData.abilities || []}
                onAbilitiesChange={handleAbilitiesChange}
              />
            ) : (
              <div className="warning-message">
                Please complete Step 1 (Basic Information) to select abilities.
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h2>Review & Generate</h2>
            <p className="step-description">Review and edit your character details, then generate the PDF character sheet.</p>

            <div className="review-section">
              <h3>Character Summary</h3>
              <div className="review-grid">
                <div className="review-item">
                  <label className="review-label">Name:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.characterName}
                    onChange={(e) => handleInputChange('characterName', e.target.value)}
                  />
                </div>
                <div className="review-item">
                  <label className="review-label">Class:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                  />
                </div>
                <div className="review-item">
                  <label className="review-label">Level:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                  />
                </div>
                <div className="review-item">
                  <label className="review-label">Race:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.race}
                    onChange={(e) => handleInputChange('race', e.target.value)}
                  />
                </div>
                <div className="review-item">
                  <label className="review-label">House:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.house}
                    onChange={(e) => handleInputChange('house', e.target.value)}
                  />
                </div>
                <div className="review-item">
                  <label className="review-label">Faith:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.faith}
                    onChange={(e) => handleInputChange('faith', e.target.value)}
                  />
                </div>
                <div className="review-item">
                  <label className="review-label">Age:</label>
                  <input
                    type="text"
                    className="review-input"
                    value={characterData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
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
                      <div key={idx} className="review-list-item editable">
                        <label>{attr.name}:</label>
                        <input
                          type="number"
                          className="review-points-input"
                          value={attr.points}
                          onChange={(e) => handleAttributePointsEdit(attr.name, parseInt(e.target.value) || 0)}
                          min={-3}
                          max={3}
                        />
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
                      <div key={idx} className="review-list-item editable">
                        <label>{talent.name}:</label>
                        <input
                          type="number"
                          className="review-points-input"
                          value={talent.points}
                          onChange={(e) => handleTalentPointsEdit(talent.name, parseInt(e.target.value) || 0)}
                          min={0}
                          max={6}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {characterData.abilities && characterData.abilities.length > 0 && (
                <>
                  <h3>Abilities</h3>
                  <div className="review-list">
                    {characterData.abilities.map((ability, idx) => {
                      const description = getAbilityDescription(ability);
                      return (
                        <div key={idx} className="review-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <strong>{ability}</strong>
                          {description && (
                            <div style={{ fontSize: '0.9em', color: '#2d3748', lineHeight: '1.5' }}>
                              {description}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Show editable derived stats if class, race, and attributes are set */}
              {characterData.class && characterData.race && characterData.attributes && characterData.attributes.length > 0 && (
                <EditableDerivedStatsDisplay
                  className={characterData.class}
                  level={parseInt(characterData.level) || 1}
                  raceName={characterData.race}
                  selectedPerks={characterData.racialPerks || []}
                  attributes={characterData.attributes}
                  manualOverrides={characterData.manualOverrides}
                  onOverrideChange={handleStatOverride}
                />
              )}

              {/* Show Acolyte Bless if character is an Acolyte */}
              {characterData.class === 'Acolyte' && (
                <div className="editable-derived-stats-display">
                  <h3>Acolyte Bless</h3>
                  <div className="editable-stats-grid">
                    <div className="editable-stat-item">
                      <div className="stat-header">
                        <label htmlFor="stat-bless" className="stat-label">
                          Bless Value:
                        </label>
                      </div>
                      <input
                        id="stat-bless"
                        type="number"
                        className="stat-input"
                        value={characterData.manualOverrides?.bless ?? calculateAcolyteBless(parseInt(characterData.level) || 1)}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            handleStatOverride('bless', undefined);
                          } else {
                            handleStatOverride('bless', parseInt(value) || 0);
                          }
                        }}
                        min={0}
                      />
                      <div className="stat-breakdown">
                        {characterData.manualOverrides?.bless !== undefined ? (
                          <span className="override-note">
                            Manual override (Auto: {calculateAcolyteBless(parseInt(characterData.level) || 1)})
                          </span>
                        ) : (
                          <span className="auto-calc">
                            Auto: Level {characterData.level} = {calculateAcolyteBless(parseInt(characterData.level) || 1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="stats-hint">
                    Bless grants Advantage. Auto-calculated: 1 at level 1, +1 every odd level (3, 5, 7, 9).
                  </p>
                </div>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ color: '#cbd5e1', margin: 0 }}>Athia Character Creator</h1>

        {/* Subtle dev mode indicator */}
        {isDevMode && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#fbbf24',
              opacity: 0.6,
              fontFamily: 'monospace',
            }}
            title="Dev mode active (Ctrl+Shift+D to toggle)"
          >
            [dev]
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="wizard-progress">
        <div
          className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''} ${canNavigateToStep(1) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(1)}
        >
          <div className="progress-circle">1</div>
          <div className="progress-label">Basic Info</div>
        </div>
        <div className="progress-line"></div>
        <div
          className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''} ${canNavigateToStep(2) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(2)}
        >
          <div className="progress-circle">2</div>
          <div className="progress-label">Perks</div>
        </div>
        <div className="progress-line"></div>
        <div
          className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''} ${canNavigateToStep(3) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(3)}
        >
          <div className="progress-circle">3</div>
          <div className="progress-label">Class</div>
        </div>
        <div className="progress-line"></div>
        <div
          className={`progress-step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''} ${canNavigateToStep(4) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(4)}
        >
          <div className="progress-circle">4</div>
          <div className="progress-label">Attributes</div>
        </div>
        <div className="progress-line"></div>
        <div
          className={`progress-step ${currentStep >= 5 ? 'active' : ''} ${currentStep > 5 ? 'completed' : ''} ${canNavigateToStep(5) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(5)}
        >
          <div className="progress-circle">5</div>
          <div className="progress-label">Talents</div>
        </div>
        <div className="progress-line"></div>
        <div
          className={`progress-step ${currentStep >= 6 ? 'active' : ''} ${currentStep > 6 ? 'completed' : ''} ${canNavigateToStep(6) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(6)}
        >
          <div className="progress-circle">6</div>
          <div className="progress-label">Abilities</div>
        </div>
        <div className="progress-line"></div>
        <div
          className={`progress-step ${currentStep >= 7 ? 'active' : ''} ${canNavigateToStep(7) ? 'clickable' : ''}`}
          onClick={() => handleStepClick(7)}
        >
          <div className="progress-circle">7</div>
          <div className="progress-label">Review</div>
        </div>
      </div>

      <div className={`creator-layout ${currentStep === 1 ? '' : 'full-width'}`}>
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

            {currentStep < 7 ? (
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

        {/* Right sidebar: Helper text area - only on step 1 */}
        {currentStep === 1 && (
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
        )}
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
