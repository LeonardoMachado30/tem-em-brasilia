"use client";
import { ReactNode, createContext, useState, useEffect } from "react";

type Alert = {
  message: string | null;
  type?: "sucess" | "error" | "warning" | "info" | null;
};

type Context = {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
} | null;

const AlertContext = createContext<Context>(null);

function Alert({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert>({
    message: null,
    type: null,
  });

  useEffect(() => {
    const isAlert =
      alert.message !== null && alert.message !== "" ? true : false;

    if (isAlert) {
      console.log("remove message");

      const id = removeMessage();

      return () => clearTimeout(id);
    }
  }, [alert]);

  function removeMessage() {
    return setTimeout(
      () =>
        setAlert({
          message: null,
          type: null,
        }),
      5000
    );
  }

  return (
    <>
      <AlertContext.Provider value={{ alert, setAlert }}>
        {alert.message !== "" && alert.message !== null && (
          <div className="fixed top-4 right-4 p-8 rounded-lg shadow-lg shadow-emerald-700 bg-white scale-in-ver-top">
            {alert.message}
          </div>
        )}

        {children}
      </AlertContext.Provider>
    </>
  );
}

export { Alert, AlertContext };
