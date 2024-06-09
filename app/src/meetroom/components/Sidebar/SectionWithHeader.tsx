import { PropsWithChildren } from "react";
import { CloseButton } from "./CloseButton";
import "./sidebar.css";

type Props = PropsWithChildren<{
  title: string;
}>;

export const SectionWithHeader = (props: Props) => {
  const { title, children } = props;

  return (
    <section className="sidebar-content">
      <div className="side-header">
        <h3>{title}</h3>
        <CloseButton />
      </div>
      {children}
    </section>
  );
};
