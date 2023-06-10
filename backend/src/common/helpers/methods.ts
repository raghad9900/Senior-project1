import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

export const uploadImage = async (image) => {
  let type = image.substring(
    image.indexOf(';base64,') - 3,
    image.indexOf(';base64,'),
  );
  if (type == 'peg') {
    type = 'jpeg';
  }
  if (['jpg', 'png', 'gif', 'jpeg', 'pdf'].includes(type)) {
    const matches = image.substring(image.indexOf('base64,') + 7);
    const file = Date.now() + 'ERP' + Date.now() + '.' + type;

    await fs.writeFileSync('uploads/' + file, matches, 'base64');
    return await file;
  } else {
    throw new HttpException(
      'The image is not suitable for upload',
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
};

export const uploadFiles = async (list) => {
  const listFiles = [];
  for (const item of list) {
    const base64 = item.indexOf(';base64,') > 0;
    let file = '';
    if (base64) {
      file = await uploadImage(item);
    } else {
      file = item;
    }
    listFiles.push(file);
  }
  return await listFiles;
};
