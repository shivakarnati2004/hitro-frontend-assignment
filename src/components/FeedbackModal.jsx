import React, { useState } from 'react';
import './FeedbackModal.css';

const FEEDBACK_KEY = 'hintro_feedback';

export default function FeedbackModal({ onClose }) {
  const [step, setStep] = useState(1); // 1: rating, 2: text, 3: thanks
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');

  function handleSubmit() {
    const feedback = {
      id: Date.now(),
      rating,
      text,
      date: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...existing, feedback]));
    setStep(3);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box feedback-modal" onClick={(e) => e.stopPropagation()}>
        {step === 1 && (
          <>
            <h2 className="modal-title">Share your feedback</h2>
            <p className="modal-text">How would you rate your experience with Hintro?</p>
            <div className="feedback-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  className={`star-btn ${s <= (hovered || rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(s)}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
              <button
                className="modal-btn logout"
                disabled={rating === 0}
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="modal-title">Tell us more</h2>
            <p className="modal-text">Any additional thoughts? (optional)</p>
            <textarea
              className="feedback-textarea"
              placeholder="Your feedback helps us improve..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setStep(1)}>Back</button>
              <button className="modal-btn logout" onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="feedback-thanks">
            <div className="feedback-thanks-icon">🎉</div>
            <h2 className="modal-title">Thanks for your feedback!</h2>
            <p className="modal-text">We appreciate you taking the time to share your thoughts.</p>
            <button className="modal-btn logout" style={{ width: '100%' }} onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
