type Props = {
  open: boolean;
  from: string;
  to: string;
  children: React.ReactNode;
};
function AnimateComponent({
  open = true,
  from = "-top-96",
  to = "top-0",
  children,
}: Props) {
  return (
    <div
      className={`
          transition-all animate-[wiggle_1s_ease-in-out] relative ${
            open ? from : to
          }
            
            `}
    >
      {children}
    </div>
  );
}

export default AnimateComponent;
