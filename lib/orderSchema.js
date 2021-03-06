import * as Yup from "yup";

export const orderSchema = Yup.object().shape({
  deliveryPeriod: Yup.number().required("Required"),
  deliveryLocation: Yup.string().min(4).max(64).required("Required"),
  exactBool: Yup.string().oneOf(["True", "false"]).required("Required"),
});
