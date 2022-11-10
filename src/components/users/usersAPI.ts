import { UserI } from "./usersSlice";

export function fetchUsers(): Promise<UserI[]> {
  return fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());
}
  