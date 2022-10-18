const XLSX = require("xlsx");

/**
 * @function excelRead
 * @param {Buffer} excelFile excel file from buffer
 * @param {string[]} modelCols columns of table (model)
 * @param {string} sheetname
 * @returns {{}[]} worksheet rows
 */
module.exports = function excelRead(excelFile, modelCols, sheetname) {
  const wsProps = excelValidate(excelFile, modelCols, sheetname);
  const wsRows = [];

  if (!wsProps) {
    return null;
  }

  // get table rows
  for (let i = wsProps.startRow + 1; i <= wsProps.endRow; i++) {
    wsRows[i - wsProps.startRow - 1] = {};
    for (let j = wsProps.startCol; j <= wsProps.endCol; j++) {
      wsRows[i - wsProps.startRow - 1][wsProps.headers[j - wsProps.startCol]] = wsProps.ws[`${XLSX.utils.encode_col(j)}${XLSX.utils.encode_row(i)}`]["v"];
    }
  }

  return wsRows;
};

// check if excel file uploaded is in right format
function excelValidate(excelFile, modelCols, sheetname) {
  let wb;

  try {
    wb = XLSX.read(excelFile, { sheetStubs: true });
  } catch {
    return false;
  }

  if (!wb.Sheets[sheetname]) {
    return false;
  }

  const ws = wb.Sheets[sheetname];
  const startCol = XLSX.utils.decode_range(ws["!ref"])["s"]["c"];
  const endCol = XLSX.utils.decode_range(ws["!ref"])["e"]["c"];
  const startRow = XLSX.utils.decode_range(ws["!ref"])["s"]["r"];
  const endRow = XLSX.utils.decode_range(ws["!ref"])["e"]["r"];
  const headers = [];

  // check column count
  if ((endCol - startCol + 1) !== modelCols.length) {
    return false;
  }

  // get table header
  for (let i = startCol; i <= endCol; i++) {
    headers[i - startCol] = ws[`${XLSX.utils.encode_col(i)}${XLSX.utils.encode_row(startRow)}`]["v"];
  }

  // check column name
  if (headers.join() !== modelCols.join()) {
    return false;
  }

  return {
    ws,
    startCol,
    endCol,
    startRow,
    endRow,
    headers
  };
}
