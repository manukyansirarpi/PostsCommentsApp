import { PostI } from "../components/posts/postsSlice";
import { UserI } from "../components/users/usersSlice";

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Search posts by username, user id or text body
export const searchPosts = (posts: PostI[], users: UserI[], query: string ): PostI[] => {

    const searchedUserIds = users.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).map(u=>u.id);
    const result = posts.filter(post => { 
        if(!isNaN(parseInt(query))) {
            return String(post.userId).includes(query) 
        } else {
            return post.title.toLowerCase().includes(query.toLowerCase()) 
                || post.body.toLowerCase().includes(query.toLowerCase()) 
                || searchedUserIds.includes(post.userId)
        }
    });
    return result;
}

export const getUserById = (users: UserI[], id: number): UserI => {
    return users.filter(u => u.id === id)[0];
}