import { useState } from 'react';

type VehicleVisualProps = {
  imageUrl?: string;
  imageAlt: string;
};

export function VehicleVisual({ imageUrl, imageAlt }: VehicleVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!imageUrl || imageFailed) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-xl bg-surface-muted px-4 text-center text-xs font-bold uppercase tracking-wide text-muted">
        PRODUCT IMAGE · REPLACEABLE
      </div>
    );
  }

  return (
    <div>
      <img
        className="h-48 w-full rounded-xl object-cover"
        src={imageUrl}
        alt={imageAlt}
        onError={(event) => {
          setImageFailed(true);
          event.currentTarget.classList.add('hidden');
          const fallback = document.createElement('span');
          fallback.className =
            'flex min-h-48 items-center justify-center rounded-xl bg-surface-muted px-4 text-center text-xs font-bold uppercase tracking-wide text-muted';
          fallback.textContent = 'PRODUCT IMAGE · REPLACEABLE';
          event.currentTarget.parentElement?.replaceChildren(fallback);
        }}
      />
    </div>
  );
}
