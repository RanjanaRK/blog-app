import { z } from "zod";
import {
  blogSchema,
  categorySchema,
  commentSchema,
  editProfileFormSchema,
  loginFormSchema,
  registerFormSchema,
} from "./zodSchema";

export type RegisterFormType = z.infer<typeof registerFormSchema>;
export type LoginFormType = z.infer<typeof loginFormSchema>;
export type EditProfileFormSchemaType = z.infer<typeof editProfileFormSchema>;
export type BlogSchemaType = z.infer<typeof blogSchema>;
export type CategorySchemaType = z.infer<typeof categorySchema>;
export type CommentSchemaType = z.infer<typeof commentSchema>;

export type DefautType<T> = {
  data: T;
};

// export interface BlogSchemaType {
//   title: string;
//   content: string;
//   coverImage?: File;
//   categories: string;
// }

export type RegisterResponse = {
  message: string;
};

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    first_name: string;
    email: string;
    role: "USER" | "ADMIN";
    token: string | null; // or string if it's always set
    // Other fields if needed
  };
}

export type BlogResonse = {
  message: string;
};
export type categoryResponse = {
  message: string;
};
export type commentResponse = {
  message: string;
};
export type BlogDeleteResponse = {
  message: string;
};
export type commentDeleteResponse = {
  message: string;
};
export type categoryDeleteResponse = {
  message: string;
};
export type responseType = {
  message: string;
};

export type PostType = {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    bio: string;
    avatarUrl: string;
  };
  likes: {
    id: string;
    createdAt: string;
  }[];
  comments: {
    id: string;
    content: string;
  }[];
  categoryId: string;
  categories: {
    id: string;
    name: string;
  };
};

export type AuthUser = {
  id: string;
  first_name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type Categories = {
  id: string;
  name: string;
};
export type Comments = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  authorId: string;
  author: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  bio: string;
  role: string;
  posts: PostType[];
};
