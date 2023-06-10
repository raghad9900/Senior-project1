import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseI18n from 'mongoose-i18n-localize';
import * as mongooseAutopopulate from 'mongoose-autopopulate';
import * as enums from 'src/common/json/enums.json';

// import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
export const loadedAtPlugin = (schema) => {
  schema.plugin(mongoosePaginate);
  // schema.plugin(aggregatePaginate);
  schema.plugin(mongooseI18n, {
    locales: ['ar', 'en'],
  });
  schema.plugin(mongooseAutopopulate);
  return schema;
};

export const ObjectId = mongoose.Schema.Types.ObjectId;
export const ObjectIdType = mongoose.Types.ObjectId;
export const Enums = enums;
// tslint:disable-next-line:no-var-requires
export const Float = require('mongoose-float').loadType(mongoose, 4);
export const Float2 = mongoose.Types.Decimal128;
// tslint:disable-next-line:no-var-requires
export const FloatBigNumber = require('mongoose-float').loadType(mongoose, 18);


