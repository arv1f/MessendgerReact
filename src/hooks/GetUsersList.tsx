import { useQuery } from "@tanstack/react-query";
import { User } from "../interface";
const useGetUsersList = () => {
  return useQuery<User[]>({
    queryKey: ["contacts"],
    queryFn: () =>
      //fetch("..//..//../public/names.json").then((res) => res.json()),
      fetch("../public/names.json").then((res) =>
        res.json().then((data) => data.id),
      ),
  });
};
export default useGetUsersList;
