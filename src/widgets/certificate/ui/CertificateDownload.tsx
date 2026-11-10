import { useState } from 'react';
import { useGenerateCertificateMutation } from '@features/download-certificate';
import { getErrorMessage } from '@shared/api';

export type CertificateResult = {
  id: string;
  driverName: string;
  vehicle: string;
  score: number;
  date: string;
};

export type CertificateDownloadProps = {
  result: CertificateResult;
};

function printCertificate() {
  window.print();
}

export function CertificateDownload({ result }: CertificateDownloadProps) {
  const [generateCertificate, { error, isLoading }] = useGenerateCertificateMutation();
  const [isCertificateVisible, setCertificateVisible] = useState(false);

  const downloadCertificate = async () => {
    try {
      await generateCertificate({ resultId: result.id }).unwrap();
      setCertificateVisible(true);
      printCertificate();
    } catch {
      // The normalized mutation error is rendered below.
      setCertificateVisible(true);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(result.date));

  return (
    <section className="space-y-4">
      <button
        type="button"
        className="rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        disabled={isLoading}
        onClick={() => void downloadCertificate()}
      >
        ↓ Download Certificate
      </button>

      {error ? (
        <div role="alert" className="space-y-2 rounded-lg border border-danger p-4 text-danger">
          <p>Something went wrong: {getErrorMessage(error)}</p>
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2 font-semibold text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => void downloadCertificate()}
          >
            Retry
          </button>
        </div>
      ) : null}

      {isCertificateVisible ? (
        <article
          aria-label="Sample certificate"
          className="print-certificate aspect-[1/1.414] max-w-2xl space-y-5 rounded-xl border border-border bg-surface p-8 text-fg"
          role="document"
        >
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary">Sample certificate</p>
            <p className="text-sm font-semibold text-muted">Nonofficial</p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Driver</dt>
              <dd className="font-semibold">{result.driverName}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Vehicle</dt>
              <dd className="font-semibold">{result.vehicle}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Score</dt>
              <dd className="font-semibold">{result.score}/100</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Date</dt>
              <dd className="font-semibold">{formattedDate}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="rounded-lg border border-border px-4 py-3 font-semibold text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={printCertificate}
          >
            ↓ Download
          </button>
        </article>
      ) : null}
    </section>
  );
}
