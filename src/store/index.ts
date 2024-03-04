import { create } from "zustand";

interface IUseBackGroundStore {
  backGround: boolean;
  setBackGround: (o: boolean) => void;
}

export const useBackGroundStore = create<IUseBackGroundStore>((set) => ({
  backGround: true,
  setBackGround: (o: boolean) => set(() => ({ backGround: o })),
}));

// import { User } from "../interface";
// import { persist } from "zustand/middleware";

// export const useMyStore = create<{
//   users: User[];
//   setUsers: (o) => void;
// }>()(
//   persist(
//     (set) => ({
//       users: [],
//       setUsers: (o) => {
//         set((state) => ({
//           users: [...state.users, o],
//         }));
//       },
//     }),
//     { name: "users", version: 1 },
//   ),
// );
