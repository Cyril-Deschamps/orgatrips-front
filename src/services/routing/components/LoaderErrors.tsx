import React, { FunctionComponent } from "react";
import axios from "axios";

interface Props {
  reload(): void;
  error: unknown;
}

const LoaderErrors: FunctionComponent<Props> = ({ reload, error }) => {
  if (axios.isAxiosError(error)) {
    return (
      <div>
        Une erreur est survenue ({error.message}){" "}
        <button onClick={reload}>Recharger</button>
      </div>
    );
  }
  return (
    <div>
      Une erreur est survenue <button onClick={reload}>Recharger</button>
    </div>
  );
};

export default LoaderErrors;
