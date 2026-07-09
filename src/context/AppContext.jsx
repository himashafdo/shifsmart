import { createContext, useContext, useState, useEffect } from "react";
import { WORKERS } from "../data";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem("shift_authed") === "true",
  );

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem("shift_workers");
    return saved ? JSON.parse(saved) : WORKERS;
  });

  const [shiftRequests, setShiftRequests] = useState(() => {
    const saved = localStorage.getItem("shift_requests");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("shift_workers", JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem("shift_requests", JSON.stringify(shiftRequests));
  }, [shiftRequests]);

  const login = () => {
    setIsAuthed(true);
    sessionStorage.setItem("shift_authed", "true");
  };
  const logout = () => {
    setIsAuthed(false);
    sessionStorage.removeItem("shift_authed");
  };

  const addWorker = (w) =>
    setWorkers((prev) => [
      ...prev,
      { ...w, id: `W${String(prev.length + 1).padStart(3, "0")}` },
    ]);
  const deleteWorker = (id) =>
    setWorkers((prev) => prev.filter((w) => w.id !== id));

  const updateWorker = (id, updated) =>
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updated } : w)),
    );
  const addShiftRequest = (r) =>
    setShiftRequests((prev) => [
      { ...r, id: `SR-${1000 + prev.length + 1}`, status: "Pending" },
      ...prev,
    ]);

  return (
    <AppContext.Provider
      value={{
        isAuthed,
        login,
        logout,
        workers,
        addWorker,
        deleteWorker,
        updateWorker,
        shiftRequests,
        addShiftRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
