interface CertificationItemProps {
  title: string;
  issuer: string;
  date: string;
  logoUrl?: string; // e.g. https://v0.app/placeholder.svg
  logoAlt?: string;
}

export function CertificationItem({
  title,
  issuer,
  date,
  logoUrl,
  logoAlt,
}: CertificationItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      {logoUrl && (
        <img
          src={logoUrl}
          alt={logoAlt || issuer}
          className="h-10 w-10 mt-1 object-contain rounded-md border bg-background p-1"
        />
      )}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
          <span className="text-sm text-muted-foreground font-mono whitespace-nowrap bg-muted px-2 py-1 rounded w-fit sm:w-auto mt-1 sm:mt-0">
            {date}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{issuer}</p>
      </div>
    </div>
  );
}
