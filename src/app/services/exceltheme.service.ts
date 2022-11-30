import { ThemeExcel, ThemeTable } from '../models/excel.interface';
import { Injectable } from '@angular/core';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { LOGO } from '../models/logo';

@Injectable({
  providedIn: 'root',
})
export class ExcelThemeService {
  constructor() {}

  private workbook = new Workbook();

  async downloadExcelThemes(dataExcel: ThemeExcel): Promise<void> {
    this.workbook = new Workbook();

    this.workbook.creator = 'Eskrive';

    await this.createThemesTable(dataExcel.themeTable);

    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'Themes.xlsx');
    });
  }

  private async createThemesTable(
    dataThemesTable: ThemeTable[]
  ): Promise<void> {
    const sheet = this.workbook.addWorksheet('THEMES');
    sheet.getColumn('B').width = 5;
    sheet.getColumn('C').width = 40;
    sheet.getColumn('D').width = 10;

    sheet.columns.forEach((column) => {
      column.alignment = { vertical: 'middle', wrapText: true };
    });

    const logoId = this.workbook.addImage({
      base64: LOGO,
      extension: 'png',
    });

    const position: ImagePosition = {
      tl: { col: 1, row: 1 },
      ext: { width: 350, height: 110 },
    };

    sheet.addImage(logoId, position);

    const headerRow = sheet.getRow(8);

    headerRow.values = ['', 'Id', 'Tema', 'Estado'];

    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.font = { bold: true, size: 14 };

    const rowsToInsert = sheet.getRows(9, dataThemesTable.length)!;

    for (let index = 0; index < rowsToInsert.length; index++) {
      const itemData = dataThemesTable[index];
      const row = rowsToInsert[index];

      row.values = ['', itemData.idsurvey, itemData.theme, itemData.status];

      row.height = 21;
    }
  }
}
