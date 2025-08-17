// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import getAllCategory from "@/hooks/category/getAllCategory";
// import createBlog from "@/hooks/post/createBlog";
// import { authAtom } from "@/lib/atoms/authAtom";
// import { BlogSchemaType, CategorySchemaType } from "@/lib/types";
// import { blogSchema } from "@/lib/zodSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAtom } from "jotai";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { useFilePicker } from "use-file-picker";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import TiptapEditor from "./TipTapBox";

// export interface FilePickerError {
//   fileSizeTooSmall?: boolean;
//   fileSizeTooLarge?: boolean;
// }

// const CreateBlogForm: React.FC = () => {
//   const router = useRouter();
//   const [selectedImage, setSelectedImage] = useState(false);
//   const [categories, setCategories] = useState<CategorySchemaType[] | null>([]);
//   const [auth, setAuth] = useAtom(authAtom);

//   const bForm = useForm<BlogSchemaType>({
//     defaultValues: {
//       content: "",
//       title: "",
//       categories: "",
//     },
//     resolver: zodResolver(blogSchema),
//     mode: "all",
//   });

//   const { isSubmitting, isValid } = bForm.formState;

//   const { openFilePicker, filesContent, plainFiles, clear, errors, loading } =
//     useFilePicker({
//       multiple: false,
//       accept: "image/*",
//       readAs: "DataURL",
//       onFilesSuccessfullySelected: () => {
//         setSelectedImage(true);
//       },
//       onClear: () => {
//         setSelectedImage(false);
//       },
//     });

//   const clearImg = () => {
//     clear();
//     bForm.reset();
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const { data } = await getAllCategory();
//       console.log(data);

//       setCategories(data);
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (filesContent && filesContent.length > 0) {
//       console.log("File selected: ", plainFiles[0]);

//       bForm.setValue("coverImage", plainFiles[0]);
//     }
//   }, [plainFiles, bForm]);

//   // useEffect(() => {
//   //   if (filesContent && filesContent.length > 0) {
//   //     console.log("File selected: ", filesContent[0]);
//   //     bForm.setValue("coverImage", filesContent[0].content);
//   //   }
//   // }, [filesContent, bForm]);

//   const blogFormFn = async (bData: BlogSchemaType) => {
//     const formData = new FormData();

//     // Append text field values directly
//     formData.append("title", bData.title);
//     formData.append("content", bData.content);
//     formData.append("categories", JSON.stringify([bData.categories]));

//     if (bData.coverImage) {
//       formData.append("coverImage", bData.coverImage);
//     }

//     console.log("Login response:", auth);

//     if (auth && auth.id && auth.role === "ADMIN") {
//       formData.append("authorId", auth.id);
//     } else {
//       throw new Error("User is not authenticated or authorId is missing");
//     }

//     console.log(auth?.id);

//     try {
//       const { message, success } = await createBlog(formData);
//       console.log(message);
//       console.log(success);
//       // Optionally clear the form or give user feedback
//     } catch (err) {
//       console.error("Failed to create post", err);
//     }
//   };

//   const authhandle = () => {
//     console.log(auth);
//   };

//   return (
//     <>
//       <button onClick={authhandle}>click here</button>
//       <Form {...bForm}>
//         <form
//           onSubmit={bForm.handleSubmit(blogFormFn)}
//           className=" max-w-3xl mx-auto shadow rounded py-6"
//         >
//           <Card className="">
//             <CardHeader className="px-4 py-2">
//               <CardTitle className="text-center text-xl font-semibold">
//                 Create Your Blog Post
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4 pb-0">
//               <FormField
//                 control={bForm.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter blog title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={bForm.control}
//                 name="content"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Content</FormLabel>
//                     <FormControl>
//                       <Controller
//                         control={bForm.control}
//                         name="content"
//                         render={({ field: { onChange, value } }) => (
//                           <TiptapEditor
//                             initialValue={value}
//                             onChange={onChange}
//                           />
//                         )}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={bForm.control}
//                 name="coverImage"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Cover Image</FormLabel>
//                     <FormControl>
//                       <div className="space-y-2">
//                         <button
//                           type="button"
//                           onClick={() => openFilePicker()}
//                           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                         >
//                           {loading ? "Loading..." : "Select Cover Image"}
//                         </button>

//                         {filesContent.map((file, index) => {
//                           return (
//                             <div key={index}>
//                               <img
//                                 alt={file.name}
//                                 src={file.content}
//                                 width={300}
//                                 className="rounded-xl"
//                               />
//                             </div>
//                           );
//                         })}

//                         {errors.length > 0 && (
//                           <div className="text-red-500 text-sm">
//                             {/* {errors[0]?.fileSizeTooSmall
//                             ? "File is too small."
//                             : "Error uploading file."} */}
//                             error
//                           </div>
//                         )}
//                       </div>
//                     </FormControl>
//                     <FormDescription>
//                       Select a cover image for your blog post.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Categories Field */}

//               <FormField
//                 control={bForm.control}
//                 name="categories"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Category</FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={(value) => field.onChange(value)}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select a category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories?.map((cat) => (
//                             <SelectItem key={cat.id} value={cat.id}>
//                               {cat.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormDescription>
//                       Choose the category that best fits your post.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="justify-end flex">
//                 <Button type="submit" className="">
//                   Create Blog
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </form>
//       </Form>
//     </>
//   );
// };

// export default CreateBlogForm;

"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getAllCategory from "@/hooks/category/getAllCategory";
import createBlog from "@/hooks/post/createBlog";
import { authAtom } from "@/lib/atoms/authAtom";
import { useAtom } from "jotai";
import { redirect, useRouter } from "next/navigation";
import { useFilePicker } from "use-file-picker";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TiptapEditor from "./TipTapBox";
import { blogSchema } from "@/lib/zodSchema"; // our Zod schema
import { BlogSchemaType, CategorySchemaType } from "@/lib/types"; // our type (derived using z.infer<typeof blogSchema>)
import { toast } from "react-toastify";

/*
  Expected Zod Schema (adjust as needed):

  import { z } from "zod";

  export const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    categories: z.string().min(1, "Category is required"),
    coverImage: z.instanceof(File).optional(), // allow a File object or undefined
  });
*/

const CreateBlogForm: React.FC = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(false);
  const [categories, setCategories] = useState<CategorySchemaType[] | null>([]);
  const [auth] = useAtom(authAtom);

  const bForm = useForm<BlogSchemaType>({
    defaultValues: {
      title: "",
      content: "",
      categories: "",
      // Do not set coverImage here; it will be populated after file selection.
    },
    resolver: zodResolver(blogSchema),
    mode: "all",
  });

  const { openFilePicker, filesContent, plainFiles, clear, errors, loading } =
    useFilePicker({
      multiple: false,
      accept: "image/*",
      // Use DataURL here for preview purposes.
      readAs: "DataURL",
      onFilesSuccessfullySelected: () => setSelectedImage(true),
      onClear: () => setSelectedImage(false),
    });

  // When a file is chosen, grab the raw File from plainFiles and set in the form.
  useEffect(() => {
    if (plainFiles && plainFiles.length > 0) {
      console.log("File selected:", plainFiles[0]);
      bForm.setValue("coverImage", plainFiles[0]);
    }
  }, [plainFiles, bForm]);

  // Fetch available categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getAllCategory();
      console.log("Categories:", data);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Form submission function
  const blogFormFn = async (bData: BlogSchemaType) => {
    const formData = new FormData();

    // Append simple text fields
    formData.append("title", bData.title);
    formData.append("content", bData.content);
    // We sent a JSON stringified array from the client (change to suit your API).
    formData.append("categories", JSON.stringify([bData.categories]));

    // Append the file if available from plainFiles which is set on coverImage field.
    if (bData.coverImage) {
      formData.append("coverImage", bData.coverImage);
    }

    // Check authentication and add authorId if exists
    if (auth && auth.id && auth.role === "ADMIN") {
      console.log(auth);

      formData.append("authorId", auth.id);
    } else {
      throw new Error("User is not authenticated or authorId is missing");
    }

    try {
      const { message, success } = await createBlog(formData);
      console.log("Response:", message, success);

      if (success) {
        toast.success(message);
        bForm.reset();
        clear();
        redirect("/admin/profile");
      }
      if (!success) {
        toast.success(message);
      }

      // You might navigate or clear form here if needed.
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  return (
    <>
      <Form {...bForm}>
        <form
          onSubmit={bForm.handleSubmit(blogFormFn)}
          className="max-w-3xl mx-auto shadow rounded py-6"
        >
          <Card>
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Create Your Blog Post
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0">
              {/* Title field */}
              <FormField
                control={bForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content field with a custom Tiptap editor */}
              <FormField
                control={bForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Controller
                        control={bForm.control}
                        name="content"
                        render={({ field: { onChange, value } }) => (
                          <TiptapEditor
                            initialValue={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cover Image field */}
              <FormField
                control={bForm.control}
                name="coverImage"
                render={() => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => openFilePicker()}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          {loading ? "Loading..." : "Select Cover Image"}
                        </button>
                        {/* Preview using filesContent (Data URL version) */}
                        {filesContent.map((file, index) => (
                          <div key={index}>
                            <img
                              alt={file.name}
                              src={file.content}
                              width={300}
                              className="rounded-xl"
                            />
                          </div>
                        ))}
                        {errors.length > 0 && (
                          <div className="text-red-500 text-sm">
                            Error uploading file.
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select a cover image for your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category select field */}
              <FormField
                control={bForm.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Choose the category that best fits your post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="justify-end flex">
                <Button type="submit">Create Blog</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default CreateBlogForm;
