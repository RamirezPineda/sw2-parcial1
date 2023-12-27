import { ReactNode } from "react";

import Subtitle from "../typografy/Subtitle";

interface Props {
  title: string;
  children: ReactNode;
  topMargin?: string;
}

function TitleCard({ title, children, topMargin }: Props) {
  return (
    <div
      className={
        "card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle styleClass={"inline-bloc"}>{title}</Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;
