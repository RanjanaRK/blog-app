import UserProfile from "@/components/Profile/UserProfile";
import getAuthProfile from "@/hooks/user/getAuthProfile";

const page = async () => {
  const { data, error, isError } = await getAuthProfile();
  console.log(data);

  if (isError) {
    console.log(error);
  }

  if (!data) {
    return;
  }
  return (
    <>
      <div className="py-4 ">
        <UserProfile userData={data} />
      </div>
    </>
  );
};

export default page;

// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "sqlite"
//   url      = env("DATABASE_URL")
// }

// // model User {
// //   id         String   @default(uuid()) @unique                   // Unique user identifier
// //   first_name String                                       // Firstname of the user
// //   last_name  String?                                      // Lastname of the user
// //   email      String   @unique                             // User email (must be unique)
// //   password   String                                       // Hashed password for security
// //   token      String?                                      // Current JWT token (optional for token-based auth)
// //   createdAt  DateTime @default(now())                     // Timestamp for account creation
// //   updatedAt  DateTime @updatedAt                          // Automatically updated on record modification
// //   posts      Post[]
// //   comments   Comment[]
// // }

// // model Post {
// //    id         String   @default(uuid()) @unique
// //    title      String
// //    content    String
// //    image      String
// //    createdAt  DateTime @default(now())
// //    updatedAt  DateTime @updatedAt
// //    author     User     @relation(fields: [authorId], references: [id])
// //    authorId   String   // Relation scalar field (used for `@relation`)
// //    comments   Comment[]  // Relation: Post can have multiple comments
// //    categories CategoriesOnPosts[]

// //    @@id([title,authorId])
// // }

// // model Category {
// //   id    String   @id @default(uuid())
// //   name  String
// //   posts CategoriesOnPosts[]
// // }

// // model CategoriesOnPosts {
// //   post       Post           @relation(fields: [postId], references: [id])
// //   postId     String // relation scalar field (used in the `@relation` attribute above)
// //   category   Category       @relation(fields: [categoryId], references: [id])
// //   categoryId String // relation scalar field (used in the `@relation` attribute above)
// //   assignedAt DateTime       @default(now())
// //   assignedBy String

// //   @@id([postId, categoryId])
// // }

// // model Comment {
// //   id         String     @id @default(uuid())
// //   content    String
// //   post       Post       @relation(fields: [postId], references: [id])
// //   postId     String        // Foreign key for the Post table
// //   author     User       @relation(fields: [authorId], references: [id])
// //   authorId   String        // Foreign key for the User table
// //   createdAt  DateTime   @default(now())
// // }

// enum Role {
//   ADMIN
//   USER
// }

// model User {
//   id         String   @default(uuid()) @unique            // Unique user identifier
//   first_name String                                       // Firstname of the user
//   last_name  String?                                      // Lastname of the user
//   email      String   @unique                             // User email (must be unique)
//   password   String                                       // Hashed password for security
//   token      String?
//   role       Role     @default(USER)                              // Current JWT token (optional for token-based auth)
//   createdAt  DateTime @default(now())                     // Timestamp for account creation
//   updatedAt  DateTime @updatedAt                          // Automatically updated on record modification
//   bio         String?
//   avatarUrl   String?
//   posts       Post[]    @relation("userPosts")                                  // Relation: User can author multiple posts
//   comments    Comment[]    @relation("userComments")                               // Relation: User can write multiple comments
//   likes       Like[]            @relation("userLikes")                            // Relation: User can like multiple posts

// }

// model Post {
//   id          String       @id @default(uuid())
//   title       String
//   content     String
//   coverImage  String?
//   author      User         @relation( "userPosts", fields: [authorId], references: [id],onDelete: Cascade)
//   authorId    String                                     // Foreign key referencing the User table
//   comments    Comment[]                                  // Relation: Post can have multiple comments
//   likes       Like[]                                     // Relation: Post can have multiple likes
//   categoryId  String                       // Many-to-Many: Post can belong to multiple categories
//   categories  Category    @relation(fields: [categoryId], references: [id])
//   createdAt   DateTime     @default(now())
//   updatedAt   DateTime     @updatedAt
// }

// model Comment {
//   id          String       @id @default(uuid())
//   content     String
//   post        Post         @relation( fields: [postId], references: [id],onDelete: Cascade)
//   postId      String                                         // Foreign key referencing the Post table
//   author      User         @relation("userComments", fields: [authorId], references: [id] ,onDelete:Cascade )
//   authorId    String                                        // Foreign key referencing the User table
//   createdAt   DateTime     @default(now())
// }

// model Like {
//   id          String       @id @default(uuid())
//   post        Post         @relation(fields: [postId], references: [id],onDelete:Cascade)
//   postId      String                                    // Foreign key referencing the Post table
//   user        User         @relation( "userLikes", fields: [userId], references: [id],onDelete:Cascade)
//   userId      String                                   // Foreign key referencing the User table
//   createdAt   DateTime     @default(now())

//   @@unique([postId, userId]) // Ensure a user can like a post only once
// }

// model Category {
//   id          String       @id @default(uuid())
//   name        String
//   posts       Post[]                                  // Relation: Category can contain multiple posts
// }

// model FileAsset {
//   id       String @id @unique
//   fileName String
// }

// // ===============================================================================

// // explicit join table so we can cascade on Category or Post deletion
// // model CategoryPost {
// //   category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
// //   categoryId  String

// //   post        Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
// //   postId      String

// //   @@id([categoryId, postId])
// // }

// // model Category {
// //   id        String          @id @default(uuid())
// //   name      String

// //   // when you delete a Category → it clears its join rows
// //   postsIn   CategoryPost[]
// // }
