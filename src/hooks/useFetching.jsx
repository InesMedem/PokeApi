import { useEffect, useState } from "react";

const useFetching = (service) => {
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
    try {
      const res = await service();
      res.status == 200 &&
        setState({
          ...state,
          data: res.data,
          hasError: false,
          isLoading: false,
        });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        hasError: error,
      });
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
