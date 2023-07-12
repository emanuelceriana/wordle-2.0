import "./ToggleButton.css";
import cn from "classnames";

interface ToggleButtonProps {
  disabled: boolean;
}

export const ToggleButton = ({ disabled }: ToggleButtonProps) => {
  return (
    <div className="toggleButton">
      <label className="switch">
        <input type="checkbox" disabled={disabled} />
        <span className={cn("slider", "round", { disabled: disabled })}></span>
      </label>
    </div>
  );
};
