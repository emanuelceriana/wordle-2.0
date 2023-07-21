import styles from "./ToggleButton.module.scss";
import cn from "classnames";

interface ToggleButtonProps {
  disabled?: boolean;
  value: boolean;
  onToggle: () => void;
}

export const ToggleButton = ({
  disabled = false,
  value,
  onToggle,
}: ToggleButtonProps) => {
  return (
    <div className={styles.toggleButton}>
      <label className={styles["toggleButton__switch"]}>
        <input
          data-testid="hardModeToggleButton"
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={onToggle}
        />
        <span
          className={cn(styles.slider, styles.round, {
            [styles.disabled]: disabled,
          })}
        ></span>
      </label>
    </div>
  );
};
