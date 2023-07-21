export const useLocalStorage = () => {
  const getLocalStorage = (name: string) => {
    const local = localStorage.getItem(name);
    if (local) {
      return JSON.parse(local);
    }
    return null;
  };
  const setLocalStorage = (name: string, item: Object) => {
    localStorage.setItem(name, JSON.stringify(item));
  };
  const removeLocalStorage = (name: string) => {
    return localStorage.removeItem(name);
  };
  return { getLocalStorage, setLocalStorage, removeLocalStorage };
};
