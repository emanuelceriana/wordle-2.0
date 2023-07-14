import styles from "./ToggleButton.module.scss";
import cn from "classnames";

interface ToggleButtonProps {
  disabled: boolean;
}

export const ToggleButton = ({ disabled }: ToggleButtonProps) => {
  return (
    <div className={styles.toggleButton}>
      <label className={styles["toggleButton__switch"]}>
        <input type="checkbox" disabled={disabled} />
        <span
          className={cn(styles.slider, styles.round, {
            [styles.disabled]: disabled,
          })}
        ></span>
      </label>
    </div>
  );
};
