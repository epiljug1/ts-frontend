import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getCity } from "../service/city.service";

export const useGetCities = (search) => {
  const navigate = useNavigate();
  return useQuery(["cities", search], () => getCity(search), {
    enabled: !!search,
    onError: (err) => {
      if (err.response?.status === 401) {
        navigate("/signin");
      }
    },
  });
};
