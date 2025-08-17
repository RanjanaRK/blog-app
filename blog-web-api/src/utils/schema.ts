import { Static, Type } from "@fastify/type-provider-typebox";

export const getAllUsersSchema = {
  response: {
    "2xx": Type.Object({
      result: Type.Array(
        Type.Object({
          id: Type.String(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: "email" }),
          role: Type.String(),
          createdAt: Type.String({ format: "date-time" }),
          updatedAt: Type.String({ format: "date-time" }),
          bio: Type.String(),
          avatarUrl: Type.String(),
        })
      ),
    }),
  },
};

export const CategoriesResponseSchema = Type.Object({
  result: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
    })
  ),
});
export const CommentsResponseSchema = Type.Object({
  result: Type.Array(
    Type.Object({
      id: Type.String({ format: "uuid" }),
      content: Type.String(),
      createdAt: Type.String({ format: "date-time" }),
      postId: Type.String({ format: "uuid" }),
      authorId: Type.String({ format: "uuid" }),
      author: Type.Object({
        first_name: Type.String(),
        last_name: Type.String(),
      }),
    })
  ),
});

export const getAllPostSchema = {
  response: {
    "2xx": Type.Object({
      result: Type.Array(
        Type.Object({
          id: Type.String(),
          title: Type.String(),
          content: Type.String(),
          coverImage: Type.String(),
          createdAt: Type.String({ format: "date-time" }),
          updatedAt: Type.String({ format: "date-time" }),
          author: Type.Object({
            id: Type.String(),
            first_name: Type.String(),
            last_name: Type.String(),
            email: Type.String({ format: "email" }),
            createdAt: Type.String({ format: "date-time" }),
            updatedAt: Type.String({ format: "date-time" }),
            bio: Type.String(),
            avatarUrl: Type.String(),
          }),
          likes: Type.Array(
            Type.Object({
              id: Type.String(),
              createdAt: Type.String({ format: "date-time" }),
            })
          ),
          comments: Type.Array(
            Type.Object({
              id: Type.String(),
              content: Type.String(),
            })
          ),

          categories: Type.Object({
            id: Type.String(),
            name: Type.String(),
          }),
        })
      ),
    }),
  },
};

export const PostSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  content: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  coverImage: Type.String(),
});

export type Post = Static<typeof PostSchema>;

export const CommentSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  content: Type.String(),
  // createdAt: Type.String({ format: "date-time" }),
  // updatedAt: Type.String({ format: "date-time" }),
  // Optionally, include fields like associated post ID or user ID
  // postId: Type.String({ format: 'uuid' }),
  // userId: Type.String({ format: 'uuid' }),
});

// Infer the TypeScript type from CommentSchema (optional)
// export type Comment = Static<typeof CommentSchema>;

const AuthorSchema = Type.Object({
  id: Type.String(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: "email" }),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  bio: Type.String(),
  avatarUrl: Type.String(),
});

const LikeSchema = Type.Object({
  id: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
});

const CategorySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

export const SinglePostSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  content: Type.String(),
  coverImage: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  author: AuthorSchema,
  likes: Type.Array(LikeSchema),
  comments: Type.Array(
    Type.Object({
      id: Type.String(),
      content: Type.String(),
    })
  ),
  categories: CategorySchema, // If this should be an array, change to Type.Array(CategorySchema)
});

export const getPostByIdSchema = {
  params: Type.Object({
    postId: Type.String(), // Add format if needed
  }),
  response: {
    200: Type.Object({
      result: SinglePostSchema,
    }),
    404: Type.Object({
      error: Type.String(),
      message: Type.String(),
    }),
    500: Type.Object({
      error: Type.String(),
      message: Type.Any(),
    }),
  },
};

// export const getAllPostSchema = {
//   response: {
//     "2xx": Type.Object({
//       result: Type.Array(SinglePostSchema),
//     }),
//   },
// };
