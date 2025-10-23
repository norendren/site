import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker from public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface InteractivePDFViewerProps {
  pdfUrl: string;
  pageNumber?: number; // Optional, defaults to 1
  onCoordinateClick: (x: number, y: number) => void;
}

export function InteractivePDFViewer({ pdfUrl, pageNumber = 1, onCoordinateClick }: InteractivePDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDimensions, setPdfDimensions] = useState<{ width: number; height: number } | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(1.5); // Default scale for better visibility
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPdf = async () => {
      if (!canvasRef.current) return;

      // Cancel any ongoing render
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      setLoading(true);
      setError(null);

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        const page = await pdf.getPage(pageNumber);

        if (!isMounted || !canvasRef.current) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Store the actual PDF dimensions (not scaled)
        const unscaledViewport = page.getViewport({ scale: 1 });
        setPdfDimensions({ width: unscaledViewport.width, height: unscaledViewport.height });

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // Store the render task so we can cancel it if needed
        renderTaskRef.current = page.render(renderContext as any);

        await renderTaskRef.current.promise;

        if (isMounted) {
          renderTaskRef.current = null;
          setLoading(false);
        }
      } catch (err: any) {
        if (err?.name === 'RenderingCancelledException') {
          // Ignore cancellation errors
          return;
        }
        console.error('Error loading PDF:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load PDF');
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfUrl, scale, pageNumber]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !pdfDimensions) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Get mouse position relative to canvas
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    // Convert to PDF coordinates
    // PDF coordinates have (0,0) at bottom-left, canvas has (0,0) at top-left
    const pdfX = Math.round((canvasX / canvas.width) * pdfDimensions.width);
    const pdfY = Math.round(pdfDimensions.height - (canvasY / canvas.height) * pdfDimensions.height);

    setMouseCoords({ x: pdfX, y: pdfY });
  };

  const handleMouseLeave = () => {
    setMouseCoords(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !pdfDimensions) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    const pdfX = Math.round((canvasX / canvas.width) * pdfDimensions.width);
    const pdfY = Math.round(pdfDimensions.height - (canvasY / canvas.height) * pdfDimensions.height);

    onCoordinateClick(pdfX, pdfY);
  };

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        background: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '4px',
        color: '#991b1b'
      }}>
        <strong>Error loading PDF:</strong> {error}
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Make sure the PDF file exists at {pdfUrl}
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ color: '#f8fafc', fontWeight: '500' }}>
          Zoom:
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            style={{ marginLeft: '0.5rem', width: '200px' }}
          />
          <span style={{ marginLeft: '0.5rem', color: '#94a3b8' }}>{Math.round(scale * 100)}%</span>
        </label>
        {loading && <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading PDF...</span>}
      </div>

      {mouseCoords && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '10px',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#06b6d4',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '2px solid #06b6d4',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          X: {mouseCoords.x}, Y: {mouseCoords.y}
        </div>
      )}

      <div
        style={{
          border: '2px solid #334155',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '800px',
          background: '#0f172a',
          cursor: 'crosshair',
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{ display: 'block' }}
        />
      </div>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(6, 182, 212, 0.1)',
          borderRadius: '4px',
          color: '#94a3b8',
          fontSize: '0.9rem',
          border: '1px solid rgba(6, 182, 212, 0.3)',
        }}
      >
        <strong style={{ color: '#06b6d4' }}>💡 Tip:</strong> Hover over the PDF to see coordinates at your cursor position. Click anywhere to auto-fill the coordinate fields!
      </div>
    </div>
  );
}
