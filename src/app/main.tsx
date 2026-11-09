import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function Placeholder() {
  return (
    <p>
      Setup is complete, but no pages are connected yet. Tell the orchestrator: &quot;connect the finished pages&quot;.
    </p>
  );
}

const container = document.getElementById('root');
if (!container) throw new Error('#root not found');
createRoot(container).render(
  <StrictMode>
    <Placeholder />
  </StrictMode>,
);
