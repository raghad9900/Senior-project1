import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "./common/base/baseService.service";
export class BackupService extends BaseService {
  constructor(
    @InjectModel("backup")
    public readonly backupModel: Model<any>) {
    super(backupModel);
  }
  async findAllBackup() {
    console.log(await this.backupModel);
  }
}
