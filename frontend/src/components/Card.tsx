import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="max-w-5xl mx-auto mt-3 mb-3">
      <div className="flex flex-col rounded shadow-3xl p-8 gap-5 bg-white">
        {children}
      </div>
    </div>
  )
};

export default Card;