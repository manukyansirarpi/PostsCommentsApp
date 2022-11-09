import { PostI } from "./postsSlice"; 

export function fetchPosts() : Promise<PostI[]> { 
      return fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()); 
}   