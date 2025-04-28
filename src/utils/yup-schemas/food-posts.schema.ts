import * as yup from "yup";

export const createFoodPostSchema = yup.object({
  title: yup.string().required("Food post title is required."),
  description: yup
    .string()
    .max(300)
    .required("Food post description is required."),
  foodCategory: yup.string().required("Food post category is required."),
  foodPreference: yup.string().required("Food post preference is required."),
});
