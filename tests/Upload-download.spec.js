
const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {


    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange); // Get the cell
    cell.value = replaceText; // Update the cell value  
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber;
                }
            }
        });
    });
    return output;
}


test('Upload Download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updateValue = '600';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloarPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloarPromise;
    writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:\\Users\\VXChauhan\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\VXChauhan\\Downloads\\download.xlsx");
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

});