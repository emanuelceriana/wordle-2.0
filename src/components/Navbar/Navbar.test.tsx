import { renderWithContext, withContext } from "../../test-utils";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Navbar } from "./Navbar";

interface MockValueContext {
  userSettings: {
    isSoundFxActive: boolean;
  };
  setUserSettings: jest.Mock<any, any>;
  setIsHelpMenuOpen: jest.Mock<any, any>;
  setIsSettingsMenuOpen: jest.Mock<any, any>;
}

describe("<Nabvar />", () => {
  const mockValueContext: MockValueContext = {
    userSettings: {
      isSoundFxActive: true,
    },
    setUserSettings: jest.fn(),
    setIsHelpMenuOpen: jest.fn(),
    setIsSettingsMenuOpen: jest.fn(),
  };

  const volumeHighClass = "fa-volume-high";
  const volumeMuted = "fa-volume-xmark";

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(<Navbar />, mockValueContext);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should open Help menu", () => {
    const { getByTestId } = renderWithContext(<Navbar />, mockValueContext);
    fireEvent.click(getByTestId("openHelpMenuButton"));
    expect(mockValueContext.setIsHelpMenuOpen).toHaveBeenCalled();
  });
  it("should open Settings menu", () => {
    const { getByTestId } = renderWithContext(<Navbar />, mockValueContext);
    fireEvent.click(getByTestId("openSettingsMenuButton"));
    expect(mockValueContext.setIsSettingsMenuOpen).toHaveBeenCalled();
  });
  it("should display correct icon when soundFx is Active/Deactive", () => {
    let userSettings = {
      isSoundFxActive: true,
    };

    const setUserSettings = (settings: { isSoundFxActive: boolean }) => {
      userSettings = settings;
    };

    const { getByTestId, rerender } = render(
      withContext(<Navbar />, {
        userSettings,
        setUserSettings,
      })
    );

    const soundFxIconClassesBeforeClick = getByTestId("soundFxControlButton")
      .firstElementChild?.classList;

    expect(soundFxIconClassesBeforeClick).toContain(volumeHighClass);
    fireEvent.click(getByTestId("soundFxControlButton"));

    act(() => {
      rerender(
        withContext(<Navbar />, {
          userSettings,
          setUserSettings,
        })
      );
    });

    const soundFxIconClassesAfterClick = getByTestId("soundFxControlButton")
      .firstElementChild?.classList;

    expect(soundFxIconClassesAfterClick).toContain(volumeMuted);
  });
  it("should active or deactive soundFxControl", () => {
    const { getByTestId } = renderWithContext(<Navbar />, mockValueContext);
    fireEvent.click(getByTestId("soundFxControlButton"));
    expect(mockValueContext.setUserSettings).toHaveBeenCalledWith({
      isSoundFxActive: !mockValueContext.userSettings.isSoundFxActive,
    });
  });
});
