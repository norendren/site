import { useState } from 'react';
import { testCoordinates, getPDFDimensions } from '../utils/coordinateFinder';
import { downloadPDF } from '../utils/pdfFiller';

/**
 * Development tool to find coordinates for placing text on the PDF
 */
function PDFInspector() {
  const [testText, setTestText] = useState('Test Text');
  const [x, setX] = useState(100);
  const [y, setY] = useState(700);
  const [fontSize, setFontSize] = useState(12);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGetDimensions = async () => {
    const dims = await getPDFDimensions('/src/assets/pdfs/sheet.pdf');
    setDimensions(dims);
  };

  const handleTest = async () => {
    const pdfBytes = await testCoordinates('/src/assets/pdfs/sheet.pdf', testText, x, y, fontSize);

    // Create blob URL for preview
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Clean up previous URL if it exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(url);
  };

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = 'coordinate_test.pdf';
      link.click();
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
        <h3 style={{ marginBottom: '1rem', color: '#f8fafc' }}>Test Coordinates</h3>

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
            Preview Test PDF
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

      {previewUrl && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#1e293b',
          borderRadius: '8px',
          border: '1px solid #334155'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#f8fafc' }}>PDF Preview</h3>
          <p style={{ marginBottom: '1rem', color: '#cbd5e1' }}>
            Text appears in <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>blue</span> with <span style={{ color: '#ef4444', fontWeight: 'bold' }}>red crosshairs</span> at exact position
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
        </div>
      )}

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
          <li><strong>Enter test data:</strong> Type test text and adjust X, Y coordinates</li>
          <li><strong>Preview:</strong> Click "Preview Test PDF" to see it inline below</li>
          <li><strong>Check position:</strong> Text appears in blue with red crosshairs</li>
          <li><strong>Adjust:</strong> Change coordinates and preview again until positioned correctly</li>
          <li><strong>Update code:</strong> Modify coordinates in <code style={{ color: '#f8fafc', background: 'rgba(15, 23, 42, 0.5)', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>src/utils/pdfFiller.ts</code></li>
        </ol>
      </div>
    </div>
  );
}

export default PDFInspector;
