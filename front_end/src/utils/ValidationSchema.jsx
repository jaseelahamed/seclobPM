import * as Yup from "yup";


export const CategorySchema = Yup.object({
    name: Yup.string().required("Category name is required"),
 
});
export const SubCategoryValidationSchema = Yup.object().shape({
    name: Yup.string().required("Subcategory name is required"),
    categoryId: Yup.string().required("Please select a category"),
});
  
 export const ProductValidationSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  variants: Yup.array()
    .of(
      Yup.object().shape({
        ram: Yup.string().required("RAM is required"),
        price: Yup.number().positive("Price must be positive").required("Price is required"),
        qty: Yup.number().min(0, "Quantity can't be negative").required("Quantity is required")
      })
    )
    .min(1, "At least one variant is required"),
  images: Yup.array()
    .of(Yup.string())
    .min(1, "Please upload at least 1 image")
});