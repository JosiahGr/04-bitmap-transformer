'use strict';

const fs = require('fs');
const readWrite = require('../lib/read-write');

const mockImage = `${__dirname}/../assets/mockFlip.bmp`;
const mockArray = [];
const compareToArray = [];
const houseImage = `${__dirname}/../assets/house.bmp`;

beforeAll((done) => {
  return fs.readFile(houseImage, (err, buffer) => {
    mockArray.push(buffer);
    done();
  });
});

describe('this is testing our file reader', () => {
  test('should display our image from the file system', () => {
    return readWrite.read(houseImage, (data) => {
      compareToArray.push(data);
      if (mockArray.length === compareToArray.length) {
        expect(mockArray).toEqual(compareToArray);
      }
    });
  });
  test('should err out for non-existent first file', () => {
    return readWrite.read(mockImage, (err) => {
      expect(err).toHaveProperty('errno');
    });
  });
});

describe('this is testing our file writer', () => {
  test('should create a new file successfully!', () => {
    const newFilePath = `${__dirname}/../assets/test.bmp`;
    return readWrite.write(newFilePath, mockArray[0], () => {
      expect(fs.existsSync(newFilePath)).toEqual(true);
    });
  });
});