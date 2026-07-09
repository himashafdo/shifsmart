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
  const [labourShortage, setLabourShortage] = useState(() => {
    const saved = localStorage.getItem("shift_labour_shortage");
    return saved
      ? JSON.parse(saved)
      : {
          totalRequired: 120,
          totalConfirmed: 108,
          skilledRequired: 20,
          skilledConfirmed: 18,
          semiRequired: 60,
          semiConfirmed: 58,
          unskilledRequired: 40,
          unskilledConfirmed: 32,
          shift: "Day Shift",
          notes: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("shift_workers", JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem(
      "shift_labour_shortage",
      JSON.stringify(labourShortage),
    );
  }, [labourShortage]);
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
  const saveLabourShortage = (data) => setLabourShortage(data);

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
        labourShortage,
        saveLabourShortage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
