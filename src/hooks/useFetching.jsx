import { useEffect, useState } from "react";

const useFetching = (service, paramEndPoint) => {
  const [state, setState] = useState({
    data: null,
    isLoading: null,
    hasError: null,
  });

  const dataFetch = async () => {
    setState({
      data: null,
      isLoading: null,
      hasError: null,
    });
    setState({ ...state, isLoading: true });

    switch (paramEndPoint) {
      case undefined:
        try {
          const res = await service();
          res.status === 200 &&
            setState({
              ...state,
              data: res.data,
              isLoading: false,
              hasError: false,
            });
        } catch (error) {
          setState({
            ...state,
            data: null,
            isLoading: false,
            hasError: error,
          });
        }

        break;

      default:
        try {
          const res = await service(paramEndPoint);
          res.status === 200 &&
            setState({
              ...state,
              data: res.data,
              isLoading: false,
              hasError: false,
            });
        } catch (error) {
          setState({
            ...state,
            data: null,
            isLoading: false,
            hasError: error,
          });
        }
        break;
    }
  };

  /** vbamos a resetar el customHook para que cuando reciba un nuevo servicio se vuelva a resetar el estado y sus elementos  */
  useEffect(() => {
    dataFetch();
  }, [service]);

  // los customHook lo que suelen devolver son variables de estados y funciones para poder gestionar o utilizar el customHook

  return {
    dataFetch,
    state,
    isLoading: state.isLoading,
    hasError: state.hasError,
    data: state.data,
  };
};

export default useFetching;
