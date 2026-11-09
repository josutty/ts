import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
if (!container) throw new Error('#root not found');
createRoot(container).render(
  <p>Setup is complete, but no pages are connected yet. Tell the orchestrator: "connect the finished pages".</p>,
);
