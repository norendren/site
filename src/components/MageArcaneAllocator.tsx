/**
 * MageArcaneAllocator - Interactive allocator for Mage Arcane Aptitude
 * Allows distribution of aptitude points across the 5 Arcane Arts
 * Formula: 5 base + 2 per level
 * Each art is modified by a specific attribute
 */

import { useState, useMemo } from 'react';
import {
  calculateMageAptitudePool,
  ARCANE_ARTS,
  ARCANE_ART_ATTRIBUTES,
  type ArcaneAptitudeAllocation,
  type ArcaneArt,
} from '../utils/classSpecialties';
import './ClassSpecialty.css';

interface MageArcaneAllocatorProps {
  level: number;
  allocations: ArcaneAptitudeAllocation[];
  onChange: (allocations: ArcaneAptitudeAllocation[]) => void;
}

export function MageArcaneAllocator({
  level,
  allocations,
  onChange,
}: MageArcaneAllocatorProps) {
  const totalPool = calculateMageAptitudePool(level);

  // Calculate points spent
  const pointsSpent = useMemo(() => {
    return allocations.reduce((sum, alloc) => sum + alloc.points, 0);
  }, [allocations]);

  const remainingPoints = totalPool - pointsSpent;

  // Get current allocation for an art
  const getAllocation = (art: ArcaneArt): number => {
    const alloc = allocations.find((a) => a.art === art);
    return alloc?.points || 0;
  };

  // Update allocation for an art
  const setAllocation = (art: ArcaneArt, points: number) => {
    // Ensure non-negative
    if (points < 0) points = 0;

    // Calculate what the new total would be
    const currentPoints = getAllocation(art);
    const newTotal = pointsSpent - currentPoints + points;

    // Don't allow over-allocation
    if (newTotal > totalPool) {
      return;
    }

    // Update allocations array
    const existingIndex = allocations.findIndex((a) => a.art === art);
    let newAllocations: ArcaneAptitudeAllocation[];

    if (points === 0) {
      // Remove allocation if 0
      newAllocations = allocations.filter((a) => a.art !== art);
    } else if (existingIndex >= 0) {
      // Update existing
      newAllocations = [...allocations];
      newAllocations[existingIndex] = { art, points };
    } else {
      // Add new
      newAllocations = [...allocations, { art, points }];
    }

    onChange(newAllocations);
  };

  return (
    <div className="class-specialty-container">
      <div className="specialty-header">
        <h3>Arcane Aptitude</h3>
        <p className="specialty-description">
          As a Mage, you channel the raw forces of reality through the five Arcane Arts.
          Allocate your Aptitude points to reflect your specialization and training.
        </p>
      </div>

      <div className="aptitude-pool-display">
        <div className="pool-stat">
          <span className="pool-label">Total Aptitude Pool:</span>
          <span className="pool-value">{totalPool}</span>
        </div>
        <div className="pool-stat">
          <span className="pool-label">Points Spent:</span>
          <span className="pool-value">{pointsSpent}</span>
        </div>
        <div className="pool-stat remaining">
          <span className="pool-label">Remaining:</span>
          <span className={`pool-value ${remainingPoints === 0 ? 'complete' : ''}`}>
            {remainingPoints}
          </span>
        </div>
      </div>

      <div className="arcane-arts-grid">
        {ARCANE_ARTS.map((art) => {
          const currentPoints = getAllocation(art);
          const attribute = ARCANE_ART_ATTRIBUTES[art];

          return (
            <div key={art} className="arcane-art-card">
              <div className="art-header">
                <h4 className="art-name">{art}</h4>
                <span className="art-attribute">({attribute})</span>
              </div>

              <div className="art-allocator">
                <button
                  type="button"
                  className="point-button minus"
                  onClick={() => setAllocation(art, currentPoints - 1)}
                  disabled={currentPoints === 0}
                  aria-label={`Decrease ${art}`}
                >
                  −
                </button>

                <div className="art-points">
                  <span className="points-value">{currentPoints}</span>
                  <span className="points-label">points</span>
                </div>

                <button
                  type="button"
                  className="point-button plus"
                  onClick={() => setAllocation(art, currentPoints + 1)}
                  disabled={remainingPoints === 0}
                  aria-label={`Increase ${art}`}
                >
                  +
                </button>
              </div>

              <div className="art-formula">
                <span className="formula-text">
                  Score = {currentPoints} (points) + {attribute} modifier + bonuses
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="specialty-info">
        <h4>Arcane Arts Reference</h4>
        <ul>
          <li><strong>Air (KNO)</strong> - Knowledge-based magic of wind and storms</li>
          <li><strong>Cosmos (INS)</strong> - Insight-based magic of stars and space</li>
          <li><strong>Earth (CON)</strong> - Constitution-based magic of stone and nature</li>
          <li><strong>Fire (VAL)</strong> - Valor-based magic of flame and destruction</li>
          <li><strong>Water (DEX)</strong> - Dexterity-based magic of ice and flow</li>
        </ul>
        <p className="help-text">
          Each art's final score includes your allocated points, the corresponding attribute modifier,
          and any bonuses from equipment or other sources.
        </p>
      </div>
    </div>
  );
}
