export function PageHead({ title, action }) {
  return (
    <div className="page-head">
      <h1>{title}</h1>
      {action}
    </div>
  );
}
