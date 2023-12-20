import { ReactNode } from "react";

type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  children: ReactNode;
};

function ButtonPrimary({ type, onClick, children }: ButtonProps) {
  return (
    <button
      className="p-2 bg-black text-white max-w-[120px]"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export { ButtonPrimary };
