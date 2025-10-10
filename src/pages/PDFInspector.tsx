import { useState } from 'react';
import { testCoordinates, getPDFDimensions, testBubbleCoordinates } from '../utils/coordinateFinder';
import { InteractivePDFViewer } from '../components/InteractivePDFViewer';

type TestMode = 'text' | 'bubbles';
type ViewMode = 'interactive' | 'preview';

/**
 * Development tool to find coordinates for placing text and bubbles on the PDF
 */
function PDFInspector() {
  const [mode, setMode] = useState<TestMode>('text');

  // Text testing state
  const [testText, setTestText] = useState('Test Text');
  const [x, setX] = useState(100);
  const [y, setY] = useState(700);
  const [fontSize, setFontSize] = useState(12);

  // Bubble testing state
  const [bubbleX, setBubbleX] = useState(100);
  const [bubbleY, setBubbleY] = useState(600);
  const [bubbleRadius, setBubbleRadius] = useState(4);
  const [horizontalSpacing, setHorizontalSpacing] = useState(20);
  const [bubblesToFill, setBubblesToFill] = useState(3);

  // Common state
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('interactive');

  const handleGetDimensions = async () => {
    const dims = await getPDFDimensions('/src/assets/pdfs/sheet.pdf');
    setDimensions(dims);
  };

  const handleTest = async () => {
    let pdfBytes: Uint8Array;

    if (mode === 'text') {
      pdfBytes = await testCoordinates('/src/assets/pdfs/sheet.pdf', testText, x, y, fontSize);
    } else {
      pdfBytes = await testBubbleCoordinates('/src/assets/pdfs/sheet.pdf', bubbleX, bubbleY, bubbleRadius, horizontalSpacing, bubblesToFill);
    }

    // Create blob URL for preview
    const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Clean up previous URL if it exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(url);
    // Auto-switch to preview mode when preview button is clicked
    setViewMode('preview');
  };

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = 'coordinate_test.pdf';
      link.click();
    }
  };

  const handleCoordinateClick = (clickedX: number, clickedY: number) => {
    if (mode === 'text') {
      setX(clickedX);
      setY(clickedY);
    } else {
      setBubbleX(clickedX);
      setBubbleY(clickedY);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 style={{ color: '#06b6d4', marginBottom: '1rem' }}>PDF Coordinate Finder</h1>
      <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Use this tool to find the exact coordinates for placing text on the character sheet PDF.</p>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#f8fafc' }}>PDF Information</h3>
        <button
          onClick={handleGetDimensions}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
          }}
        >
          Get PDF Dimensions
        </button>
        {dimensions && (
          <div style={{ marginTop: '1rem', fontFamily: 'monospace', color: '#f8fafc' }}>
            <strong>Page Size:</strong> {dimensions.width} x {dimensions.height} pixels<br />
            <small style={{ color: '#94a3b8' }}>Note: (0,0) is at bottom-left corner</small>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#f8fafc' }}>Test Mode</h3>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setMode('text')}
            style={{
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              backgroundColor: mode === 'text' ? '#06b6d4' : '#334155',
              color: mode === 'text' ? '#0f172a' : '#f8fafc',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Text Coordinates
          </button>
          <button
            onClick={() => setMode('bubbles')}
            style={{
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              backgroundColor: mode === 'bubbles' ? '#06b6d4' : '#334155',
              color: mode === 'bubbles' ? '#0f172a' : '#f8fafc',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Talent Bubbles
          </button>
        </div>

        {mode === 'text' && (
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
              Test Text:
            </label>
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #334155',
                borderRadius: '4px',
                fontSize: '1rem',
                background: '#0f172a',
                color: '#f8fafc'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                X Position:
              </label>
              <input
                type="number"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #334155',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                Y Position:
              </label>
              <input
                type="number"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #334155',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                Font Size:
              </label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #334155',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>
          </div>
        </div>
        )}

        {mode === 'bubbles' && (
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                  X Position (First Bubble):
                </label>
                <input
                  type="number"
                  value={bubbleX}
                  onChange={(e) => setBubbleX(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    background: '#0f172a',
                    color: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                  Y Position:
                </label>
                <input
                  type="number"
                  value={bubbleY}
                  onChange={(e) => setBubbleY(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    background: '#0f172a',
                    color: '#f8fafc'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                  Bubble Radius:
                </label>
                <input
                  type="number"
                  value={bubbleRadius}
                  onChange={(e) => setBubbleRadius(Number(e.target.value))}
                  min="1"
                  step="0.5"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    background: '#0f172a',
                    color: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                  Horizontal Spacing:
                </label>
                <input
                  type="number"
                  value={horizontalSpacing}
                  onChange={(e) => setHorizontalSpacing(Number(e.target.value))}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    background: '#0f172a',
                    color: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#f8fafc' }}>
                  Bubbles to Fill:
                </label>
                <select
                  value={bubblesToFill}
                  onChange={(e) => setBubblesToFill(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    background: '#0f172a',
                    color: '#f8fafc'
                  }}
                >
                  <option value={0}>0 (None)</option>
                  <option value={1}>1 (Apprentice)</option>
                  <option value={2}>2 (Journeyman)</option>
                  <option value={3}>3 (Master)</option>
                </select>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: '#0f172a',
              borderRadius: '4px',
              color: '#94a3b8',
              fontSize: '0.9rem'
            }}>
              <strong style={{ color: '#f8fafc' }}>Tip:</strong> The bubbles show: A (Apprentice), J (Journeyman), M (Master).
              Filled bubbles appear in blue with red crosshairs at their centers.
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleTest}
            style={{
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              backgroundColor: '#06b6d4',
              color: '#0f172a',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            {mode === 'text' ? 'Preview Text PDF' : 'Preview Bubble PDF'}
          </button>
          {previewUrl && (
            <button
              onClick={handleDownload}
              style={{
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                backgroundColor: '#14b8a6',
                color: '#0f172a',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ color: '#f8fafc', margin: 0 }}>PDF Viewer</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('interactive')}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                backgroundColor: viewMode === 'interactive' ? '#06b6d4' : '#334155',
                color: viewMode === 'interactive' ? '#0f172a' : '#f8fafc',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              📍 Click to Find Coords
            </button>
            <button
              onClick={() => setViewMode('preview')}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                backgroundColor: viewMode === 'preview' ? '#06b6d4' : '#334155',
                color: viewMode === 'preview' ? '#0f172a' : '#f8fafc',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              👁️ Preview Test
            </button>
          </div>
        </div>

        {viewMode === 'interactive' ? (
          <InteractivePDFViewer
            pdfUrl="/src/assets/pdfs/sheet.pdf"
            onCoordinateClick={handleCoordinateClick}
          />
        ) : previewUrl ? (
          <>
            <p style={{ marginBottom: '1rem', color: '#cbd5e1' }}>
              {mode === 'text'
                ? <>Text appears in <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>blue</span> with <span style={{ color: '#ef4444', fontWeight: 'bold' }}>red crosshairs</span> at exact position</>
                : <>Bubbles appear in <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>blue</span> with <span style={{ color: '#ef4444', fontWeight: 'bold' }}>red crosshairs</span> at centers and labeled A/J/M</>
              }
            </p>
            <iframe
              src={previewUrl}
              style={{
                width: '100%',
                height: '600px',
                border: '2px solid #334155',
                borderRadius: '4px'
              }}
              title="PDF Preview"
            />
          </>
        ) : (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: '#94a3b8',
            background: '#0f172a',
            borderRadius: '4px',
            border: '2px dashed #334155'
          }}>
            Click "Preview Text PDF" or "Preview Bubble PDF" to see your test overlay
          </div>
        )}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
        borderRadius: '8px',
        border: 'none'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#0f172a', fontWeight: 'bold' }}>How to use:</h3>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '2', color: '#0f172a', fontSize: '1rem' }}>
          <li><strong>Get dimensions:</strong> Click "Get PDF Dimensions" to see page size</li>
          <li><strong>Choose mode:</strong> Select "Text Coordinates" or "Talent Bubbles"</li>
          {mode === 'text' ? (
            <>
              <li><strong>Enter test data:</strong> Type test text and adjust X, Y coordinates</li>
              <li><strong>Preview:</strong> Click "Preview Text PDF" to see it inline below</li>
              <li><strong>Check position:</strong> Text appears in blue with red crosshairs</li>
            </>
          ) : (
            <>
              <li><strong>Set bubble position:</strong> Adjust X, Y for the first bubble</li>
              <li><strong>Adjust appearance:</strong> Set radius, spacing, and fill count</li>
              <li><strong>Preview:</strong> Click "Preview Bubble PDF" to see bubbles inline below</li>
              <li><strong>Check position:</strong> Bubbles in blue, labeled A/J/M with crosshairs</li>
            </>
          )}
          <li><strong>Adjust:</strong> Change values and preview again until positioned correctly</li>
          <li><strong>Update code:</strong> Copy values to <code style={{ color: '#f8fafc', background: 'rgba(15, 23, 42, 0.5)', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>src/utils/pdfFiller.ts</code> in TALENT_BUBBLE_COORDINATES</li>
        </ol>
      </div>
    </div>
  );
}

export default PDFInspector;
