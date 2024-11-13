import { useState } from 'react';
import './ControlHints.css';

function HintButton({ doOpen }: { doOpen: () => void }) {
  return (
    <button className="control-hints-open-button" onClick={doOpen}>
      ⓘ
    </button>
  );
}

function HintContents({ doClose }: { doClose: () => void }) {
  return (
    <div className="control-hints-content">
      <button className="control-hints-close-button" onClick={doClose}>
        ×
      </button>
      <dl>
        <dt>Orbit:</dt>
        <dd>Left Mouse + Drag</dd>
        <dd>Touch + Drag</dd>
        <dt>Zoom:</dt>
        <dd>Mouse Scroll Wheel</dd>
        <dt>Pan:</dt>
        <dd>Right Mouse + Drag</dd>
        <dd>Two Finger Touch + Drag</dd>
        <dd>Shift/Meta/Ctrl/Alt + Left Mouse + Drag</dd>
      </dl>
    </div>
  );
}

export function ControlHints() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div id="control-hints">
      {isOpen ? (
        <HintContents
          doClose={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <HintButton
          doOpen={() => {
            setIsOpen(true);
          }}
        />
      )}
    </div>
  );
}
