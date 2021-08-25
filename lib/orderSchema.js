import * as Yup from "yup";

export const orderSchema = Yup.object().shape({
  deliveryPeriod: Yup.number().required("Required"),
  deliveryLocation: Yup.string().min(4).max(64).required("Required"),
  payAmount: Yup.number().required("Required"),
});
