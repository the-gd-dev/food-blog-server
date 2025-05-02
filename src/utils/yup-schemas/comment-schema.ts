import * as yup from "yup";

export const commentSchema = yup.object({
  postId: yup.string().required("Post Id is required"),
  text: yup.string().required("Comment is required"),
  image: yup.string().url().optional(),
});
