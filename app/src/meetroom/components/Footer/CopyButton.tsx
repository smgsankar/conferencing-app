import { useEffect, useState } from "react";
import { CopyIcon } from "../../../icons/CopyIcon";
import { TickIcon } from "../../../icons/TickIcon";

export const CopyButton = () => {
  const [copied, setCopied] = useState(false);
  const [displayText, setDisplayText] = useState("Copy joining info");

  const onCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setDisplayText("Copied");
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  useEffect(() => {
    if (displayText === "Copy joining info") return;
    const textTimeout = setTimeout(() => {
      setDisplayText("Copy joining info");
    }, 1700);

    return () => {
      clearTimeout(textTimeout);
    };
  }, [displayText]);

  return (
    <button
      type="button"
      id="copy-meet-info-btn"
      className="meet-action"
      style={{
        width: copied ? 120 : 168,
        transition: "width 300ms ease-in",
      }}
      onClick={onCopy}
    >
      <span>{displayText}</span>
      <div style={{ position: "relative" }} onClick={onCopy}>
        <CopyIcon
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            transition: "stroke-dashoffset 300ms ease-in-out",
            strokeDasharray: 50,
            strokeDashoffset: copied ? -50 : 0,
          }}
        />
        <TickIcon
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            strokeDasharray: 50,
            strokeDashoffset: copied ? 0 : -50,
            transition: "stroke-dashoffset 300ms ease-in-out",
          }}
        />
      </div>
    </button>
  );
};
