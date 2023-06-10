import { ObjectId } from '../helpers/mongoose';

export const LangReq = {
  ar: {
    type: String,
    required: true,
  },
  en: {
    type: String,
    required: true,
  },
};

export const Lang = {
  ar: {
    type: String,
  },
  en: {
    type: String,
  },
};
