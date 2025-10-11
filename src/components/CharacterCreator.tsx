import { useState, useMemo } from 'react';
import { fillCharacterSheet, downloadPDF } from '../utils/pdfFiller';
import type { BasicCharacterData, TalentAllocation } from '../utils/pdfFiller';
import { CLASSES, RACES, HOUSES, FAITHS } from '../utils/athiaConstants';
import {
  ACOLYTE_PROGRESSION,
  MAGE_PROGRESSION,
  ROGUE_PROGRESSION,
  WARRIOR_PROGRESSION
} from '../utils/classReference';
import { TalentAllocator } from './TalentAllocator';
import { ClassInfoPreview } from './ClassInfoPreview';
import { ClassInfoPanel } from './ClassInfoPanel';
import './CharacterCreator.css';

export function CharacterCreator() {
  const [characterData, setCharacterData] = useState<BasicCharacterData>({
    characterName: '',
    class: '',
    level: '1',
    race: '',
    house: '',
    faith: '',
    age: '',
    talents: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClassInfoOpen, setIsClassInfoOpen] = useState(false);

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
        '/src/assets/pdfs/sheet.pdf',
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

  return (
    <div className="character-creator">
      <h1 style={{ color: '#cbd5e1'}}>Athia Character Creator</h1>

      <div className="creator-layout">
        <form className="character-form" onSubmit={(e) => e.preventDefault()}>
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

        {/* Talent Point Allocation */}
        {characterData.class && characterData.level && (
          <div className="form-section">
            <TalentAllocator
              totalTalentPoints={totalTalentPoints}
              allocatedTalents={characterData.talents || []}
              onTalentsChange={handleTalentsChange}
            />
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          type="button"
          className="generate-button"
          onClick={handleGenerateCharacter}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Character Sheet'}
        </button>
      </form>

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

      <div className="help-text">
        <p>
          <strong>Note:</strong> This is a basic character sheet generator.
          Fill in the basic information above and click "Generate Character Sheet"
          to download a PDF with your character details.
        </p>
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
