import axios from "axios";

const api = axios.create({
  baseURL: "https://api.teleport.org/api/cities",
});

export const getCity = async (search) => {
  const { data } = await api.get(`/?search=${search}`);
  return data.count
    ? data._embedded["city:search-results"].map((item) => ({
        value: item.matching_full_name,
        label: item.matching_full_name,
      }))
    : [];
};
