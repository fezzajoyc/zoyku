import jsonFormatter from "./json-formatter";
import jsonMinifier from "./json-minifier";
import jsonValidator from "./json-validator";
import xmlFormatter from "./xml-formatter";
import xmlValidator from "./xml-validator";
import htmlFormatter from "./html-formatter";
import htmlMinifier from "./html-minifier";
import cssMinifier from "./css-minifier";
import javascriptMinifier from "./javascript-minifier";
import sqlFormatter from "./sql-formatter";
import base64Encoder from "./base64-encoder";
import base64Decoder from "./base64-decoder";
import urlEncoder from "./url-encoder";
import urlDecoder from "./url-decoder";
import jwtDecoder from "./jwt-decoder";
import uuidGenerator from "./uuid-generator";
import hashGenerator from "./hash-generator";
import md5Generator from "./md5-generator";
import sha256Generator from "./sha256-generator";
import sha1Generator from "./sha1-generator";
import sha384Generator from "./sha384-generator";
import sha512Generator from "./sha512-generator";
import hmacGenerator from "./hmac-generator";
import regexTester from "./regex-tester";
import jsonToCsv from "./json-to-csv";
import csvToJson from "./csv-to-json";
import csvTableEditor from "./csv-table-editor";
import fileTypeDetector from "./file-type-detector";
import uuidValidatorConverter from "./uuid-validator-converter";
import byteEncodingConverter from "./byte-encoding-converter";
import csvToExcel from "./csv-to-excel";
import excelToCsv from "./excel-to-csv";
import markdownPreviewer from "./markdown-previewer";
import htmlEscape from "./html-escape";
import urlParser from "./url-parser";
import httpStatusCodes from "./http-status-codes";
import base64Image from "./base64-image";
import htmlToMarkdown from "./html-to-markdown";
import xmlToJson from "./xml-to-json";
import jsonToXml from "./json-to-xml";
import placeholderImageGenerator from "./placeholder-image-generator";
import cronExplainer from "./cron-explainer";
import jsonViewer from "./json-viewer";
import chmodCalculator from "./chmod-calculator";
import ulidGenerator from "./ulid-generator";
import userAgentParser from "./user-agent-parser";

export const DEV_TOOLS = [
  jsonViewer,
  chmodCalculator,
  ulidGenerator,
  userAgentParser,
  jsonFormatter,
  jsonMinifier,
  jsonValidator,
  xmlFormatter,
  xmlValidator,
  htmlFormatter,
  htmlMinifier,
  cssMinifier,
  javascriptMinifier,
  sqlFormatter,
  base64Encoder,
  base64Decoder,
  urlEncoder,
  urlDecoder,
  jwtDecoder,
  uuidGenerator,
  hashGenerator,
  md5Generator,
  sha256Generator,
  sha1Generator,
  sha384Generator,
  sha512Generator,
  hmacGenerator,
  regexTester,
  jsonToCsv,
  csvToJson,
  csvTableEditor,
  fileTypeDetector,
  uuidValidatorConverter,
  byteEncodingConverter,
  csvToExcel,
  excelToCsv,
  markdownPreviewer,
  htmlEscape,
  urlParser,
  httpStatusCodes,
  base64Image,
  htmlToMarkdown,
  xmlToJson,
  jsonToXml,
  placeholderImageGenerator,
  cronExplainer,
  jsonToTypescript,
  jsonDiff,
  jsonPathQuery,
  jsonYamlConverter,
  crc16Modbus,
  sm3Hash,
  gbkDecoder,
  tomlConverter,
  rsaKeyGenerator,
  dockerComposeConverter,
  geohashConverter,
  ipv6ExpandCompress,
  jsonCodeGenTool,
  sslCertificateInspector,
  chartGenerator,
];

import jsonToTypescript from "./json-to-typescript";
import jsonDiff from "./json-diff";
import jsonPathQuery from "./json-path-query";
import jsonYamlConverter from "./json-yaml-converter";
import crc16Modbus from "./crc16-modbus";
import sm3Hash from "./sm3-hash";
import gbkDecoder from "./gbk-decoder";
import tomlConverter from "./toml-converter";
import rsaKeyGenerator from "./rsa-key-generator";
import dockerComposeConverter from "./docker-compose-converter";
import geohashConverter from "./geohash-converter";
import ipv6ExpandCompress from "./ipv6-expand-compress";
import jsonCodeGenTool from "./json-code-generator";
import sslCertificateInspector from "./ssl-certificate-inspector";
import chartGenerator from "./chart-generator";
