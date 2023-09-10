import Joi from "joi";

export const schema = Joi.object({
  amount: Joi.number().required(),
  destinationWalletID: Joi.string().length(12).required(),
  pin: Joi.number().min(1000).max(9999).required(),
  otp: Joi.number().required(),
});
