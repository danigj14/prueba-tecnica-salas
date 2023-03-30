export function Modal({ children }: React.PropsWithChildren) {
  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-screen bg-black bg-opacity-25 flex justify-center items-center">
      {children}
    </div>
  );
}
