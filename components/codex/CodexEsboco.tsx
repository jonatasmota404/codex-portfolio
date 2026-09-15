type CodexEsbocoProps = {
  tamanho?: number;
  children: React.ReactNode;
};

export function CodexEsboco({ tamanho = 150, children }: CodexEsbocoProps) {
  return (
    <svg
      viewBox="0 0 150 150"
      className="float-none md:float-left mb-4 md:mr-6 mx-auto md:mx-0 block md:[shape-outside:circle(50%)]"
      style={{ width: tamanho, height: tamanho }}
    >
      {children}
    </svg>
  );
}