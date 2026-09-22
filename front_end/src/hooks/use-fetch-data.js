// import { useQuery } from "@tanstack/react-query";
  
// // Custom hook for fetching data
// const useFetchData = (key, fetchFunction,params,transformFn) => {
//   return useQuery({
//     queryKey: [key,params],
//     queryFn: () => fetchFunction(params),
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     cacheTime: 3600000, 
//     staleTime: 3600000, 
//     refetchInterval: 3600000,
//     select: transformFn ? transformFn : (data) => data,
//   });
// };

// export default useFetchData;
import { useQuery } from "@tanstack/react-query";

// Custom hook for fetching data
const useFetchData = (key, fetchFunction, params, transformFn) => {
  const query = useQuery({
    queryKey: [key, params],
    queryFn: () => fetchFunction(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: 3600000, 
    staleTime: 3600000, 
    refetchInterval: 3600000,
    select: transformFn ? transformFn : (data) => data,
  });

  return query; 
};

export default useFetchData;
