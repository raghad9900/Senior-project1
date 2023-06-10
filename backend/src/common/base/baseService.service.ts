import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { uploadFiles, uploadImage } from '../helpers/methods';

@Injectable()
export class BaseService {
  Model;
  Numbering;
  static PaginateDefaultOptions = {
    sort: { _id: -1 },
    populate: [],
    lean: false,
    leanWithId: true,
    offset: 0,
    page: 1,
    limit: 10,
  };
  static PaginateDefaultResponse = {
    docs: [],
    totalDocs: 0,
    limit: BaseService.PaginateDefaultOptions.limit,
    hasPrevPage: false,
    hasNextPage: false,
    page: BaseService.PaginateDefaultOptions.page,
    totalPages: 0,
    offset: BaseService.PaginateDefaultOptions.offset,
    prevPage: null,
    nextPage: null,
  };

  constructor(mo, numbering?) {
    this.Model = mo;
    this.Numbering = numbering ? numbering : undefined;
  }

  pushPaginate(pipeline: any, options = BaseService.PaginateDefaultOptions) {
    // return pipeline;
    if (options.page) {
      options.offset = (options.page - 1) * options.limit;
    } else if (options.offset) {
      options.page = 1 + Math.floor(options.offset / options.limit);
    } else {
      options.page = BaseService.PaginateDefaultOptions.page;
      options.offset = BaseService.PaginateDefaultOptions.offset;
    }
    if (options.sort) {
      pipeline.push({ $sort: options.sort });
    }
    let { page, limit } = options;
    let offset = BaseService.PaginateDefaultOptions.offset;
    if (page == null) {
      page = BaseService.PaginateDefaultOptions.page;
    }
    if (limit == null) {
      limit = BaseService.PaginateDefaultOptions.limit;
    }
    // tslint:disable-next-line: radix
    limit = parseInt(limit.toString());
    // tslint:disable-next-line: radix
    page = parseInt(page.toString());
    if (limit === 0) {
      limit = 1;
    }
    offset = (page - 1) * limit;
    pipeline = pipeline.concat([
      {
        $group: {
          _id: null,
          docs: { $push: "$$ROOT" },
          totalDocs: { $sum: 1 },
        },
      },
      {
        $addFields: {
          docs: {
            $slice: ["$docs", offset, limit],
          },
          limit,
          page,
          totalPages: { $ceil: { $divide: ["$totalDocs", limit] } },
        },
      },
      // { $unset: '_id' },
    ]);
    return pipeline;
  }
  async aggregatePaginate(pipeline, options) {
    pipeline = this.pushPaginate(pipeline, options);
    const result = await this.aggregate(pipeline);
    return result && result.length > 0
      ? result[0]
      : BaseService.PaginateDefaultResponse;
  }
  async aggregate(pipeline) {
    // const myAggregate = this.Model.aggregate(pipeline);
    return await this.Model.aggregate(pipeline);
  }
  async findAll(query, options) {
    const queryBody = query || {};

    for (const key in query) {
      if (query[key] !== "" && query[key] != null) {
        if (
          key === "name.ar" ||
          key === "name.en" ||
          key === "code" ||
          key === "name" ||
          key === "phoneNumber" ||
          key == "phone" ||
          key == "mobileNumber"||
          key == "userName"
        ) {
          queryBody[key] = new RegExp(query[key], "i");
        } else {
          queryBody[key] = query[key];
        }
      } else {
        delete queryBody[key];
      }
    }
    options.sort = {
      _id: options.sort === "asc" ? 1 : -1,
    };
    return await this.Model.paginate(query, options);
  }

  async find(query) {
    let sort = "asc";
    if (query.sort) {
      sort = query.sort;
      delete query.sort;
    }
    return await this.Model.find(query).sort({ _id: sort === "asc" ? 1 : -1 });
  }

  async create(body) {
    try {
      if (body.image) {
        body.image =
          body.image === "delete" ? null : await uploadImage(body.image);
      }

      if (body.files && body.files.length > 0) {
        body.files = await uploadFiles(body.files);
      }
      return await this.Model.create(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async createFiles(body, ScreenName = "") {
    // body.code = await SystemNumbering(
    // 	this.Model,
    // 	this.Numbering,
    // 	// body.code,
    // 	ScreenName,
    // );
    return await this.create(body);
  }

  async findById(id) {
    try {
      return await this.Model.findById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async findOne(query) {
    try {
      return await this.Model.findOne(query);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async updateById(id, body) {
    try {
      if (body.image) {
        body.image =
          body.image === "delete" ? null : await uploadImage(body.image);
      }
      const result = await this.Model.updateOne({ _id: id }, body);
      if (result) {
        return await this.Model.findById(id);
      } else {
        return result;
      }
      // return await this.Model.updateOne({ _id: id }, body)
      // old CODE ^
      // modified to return the updated object
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async update(conditions, body) {
    try {
      if (body.image) {
        body.image =
          body.image === "delete" ? null : await uploadImage(body.image);
      }
      return await this.Model.updateOne(conditions, body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }


  async updateAll(conditions, body) {
    try {
    
      return await this.Model.update(conditions, body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async delete(id, body) {
    try {
      let xx = await this.Model.findOne({ _id: id });

      if (xx.counter > 0) {
        throw new HttpException(
          { ar: "هذا البيان مستخدم من قبل", en: "this Item Used Before" },
          HttpStatus.METHOD_NOT_ALLOWED
        );
      } else {
        return await this.Model.deleteOne({ _id: id }, body);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async deleteOne(conditions) {
    try {
      return await this.Model.deleteOne(conditions);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }



  async count(query) {
    try {
      return await this.Model.countDocuments(query);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

}
