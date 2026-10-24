export default function BoldSilencie({ children }: { children: string }) {
  const parts = children.split(/(Silencie)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === "Silencie" ? <strong key={index}>{part}</strong> : part
      )}
    </>
  );
}
