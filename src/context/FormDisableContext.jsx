import { createContext, useContext } from "react";

const FormDisableContext = createContext(false);

export const useFormDisabled = () => useContext(FormDisableContext);

export function FormDisableProvider({ disabled, children }) {
  return (
    <FormDisableContext.Provider value={disabled}>
      {children}
    </FormDisableContext.Provider>
  );
}
