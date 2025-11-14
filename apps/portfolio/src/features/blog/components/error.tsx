type MarkdownErrorProps = {
  error: Error;
};

export function MarkdownError({ error }: MarkdownErrorProps) {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
}
