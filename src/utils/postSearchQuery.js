export const getSearchQuery = (data) => {
  let query = "";
  const search = data?.search;
  const city = data?.city;
  if (search) {
    query = `?search=${search}`;
  }
  query ? (query += "&") : (query += "?");
  if (city) {
    query += `city=${city}`;
  }
  return query;
};
