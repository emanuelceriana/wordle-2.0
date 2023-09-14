import { act, fireEvent } from "@testing-library/react";
import { SettingsMenu } from "./SettingsMenu";
import { renderWithContext } from "../../test-utils";

interface MockValueContext {
  isSettingsMenuOpen: boolean;
  userSettings: any;
  setUserSettings: () => void;
  setIsSettingsMenuOpen: () => void;
  restartGame: () => void;
}

describe("<SettingsMenu />", () => {
  const restartGameMock = jest.fn();
  const setUserSettingsMock = jest.fn();
  const setIsSettingsMenuOpenMock = jest.fn();

  let mockValueContext: MockValueContext = {
    isSettingsMenuOpen: true,
    userSettings: { isHardModeActive: true },
    setUserSettings: setUserSettingsMock,
    setIsSettingsMenuOpen: setIsSettingsMenuOpenMock,
    restartGame: restartGameMock,
  };

  //   it("should render without errors", () => {
  //     const { asFragment } = renderWithContext(
  //       <SettingsMenu />,
  //       mockValueContext
  //     );
  //     expect(asFragment()).toMatchSnapshot();
  //   });

  it("should be closed if isSettingsMenuOpen is false", () => {
    mockValueContext.isSettingsMenuOpen = false;

    const { queryByTestId } = renderWithContext(
      <SettingsMenu />,
      mockValueContext
    );

    const settingsMenu = queryByTestId("settingsMenu");

    expect(settingsMenu).toBe(null);
  });
  it("should be open if isSettingsMenuOpen is true", () => {
    mockValueContext.isSettingsMenuOpen = true;

    const { getByTestId } = renderWithContext(
      <SettingsMenu />,
      mockValueContext
    );

    const settingsMenu = getByTestId("settingsMenu");

    expect(settingsMenu).toBeDefined();
  });
  it("should call restartGame when Restart Game button is clicked", () => {
    const { getByText } = renderWithContext(<SettingsMenu />, mockValueContext);

    const restartGameButton = getByText("Restart Game");

    act(() => {
      fireEvent.click(restartGameButton);
    });

    expect(mockValueContext.restartGame).toHaveBeenCalledTimes(1);
  });
  it("should modify userSettings hard mode option when toggle button is clicked", () => {
    const { getByTestId } = renderWithContext(
      <SettingsMenu />,
      mockValueContext
    );

    const setUserSettings = getByTestId("hardModeToggleButton");

    act(() => {
      fireEvent.click(setUserSettings);
    });

    expect(mockValueContext.setUserSettings).toHaveBeenCalledWith({
      isHardModeActive: false,
    });
  });

  it("should call onCloseRequest when close button is clicked", () => {
    const { queryAllByRole } = renderWithContext(
      <SettingsMenu />,
      mockValueContext
    );

    const closeButton = queryAllByRole("button")[0];

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(mockValueContext.setIsSettingsMenuOpen).toHaveBeenCalledWith(false);
  });
});
