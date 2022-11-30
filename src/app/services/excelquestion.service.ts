import { DataSectionResponse } from './../models/excel.interface';
import {
  DataSection,
  QuestionDetail,
  QuestionExcel,
  QuestionTable,
} from '../models/excel.interface';
import { Injectable } from '@angular/core';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { LOGO } from '../models/logo';

@Injectable({
  providedIn: 'root',
})
export class ExcelQuestionService {
  constructor() {}

  private workbook = new Workbook();

  async downloadExcelQuestions(dataExcel: QuestionExcel): Promise<void> {
    this.workbook = new Workbook();

    this.workbook.creator = 'Eskrive';

    await this.createQuestionTable(dataExcel.questionTable);
    await this.createResponseDetail(dataExcel.questionDetail);

    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'Questions.xlsx');
    });
  }

  private async createQuestionTable(
    dataQuestionsTable: QuestionTable[]
  ): Promise<void> {
    const sheet = this.workbook.addWorksheet('QUESTIONS');
    sheet.getColumn('B').width = 5;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 50;
    sheet.getColumn('E').width = 20;
    sheet.getColumn('F').width = 20;
    sheet.getColumn('G').width = 11;

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

    headerRow.values = [
      '',
      'Id',
      'Tema',
      'Pregunta',
      'Fecha de Apertura',
      'Fecha de Cierre',
      'Estado',
    ];

    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.font = { bold: true, size: 14 };

    const rowsToInsert = sheet.getRows(9, dataQuestionsTable.length)!;

    for (let index = 0; index < rowsToInsert.length; index++) {
      const itemData = dataQuestionsTable[index];
      const row = rowsToInsert[index];

      row.values = [
        '',
        itemData.question.idquestion,
        itemData.question.survey.theme,
        itemData.question.statement,
        itemData.question.openingdate,
        itemData.question.closingdate,
        itemData.question.state,
      ];

      row.height = 35;
    }
  }

  private async createResponseDetail(
    dataQuestionDetail: QuestionDetail[]
  ): Promise<void> {
    for (let index = 0; index < dataQuestionDetail.length; index++) {
      const item = dataQuestionDetail[index];

      const sheet = this.workbook.addWorksheet(`${index + 1} - QUESTION`);

      ['B', 'C', 'D', 'E', 'F', 'H', 'I'].forEach((columnKey) => {
        sheet.getColumn(columnKey).width = 16;
        sheet.getColumn(columnKey).font = {
          bold: true,
          color: { argb: '000000' },
        };
      });

      sheet.getColumn('B').width = 12;
      sheet.getColumn('C').width = 12;
      sheet.getColumn('G').width = 11;
      sheet.getColumn('H').width = 20;
      sheet.getColumn('I').width = 27;

      sheet.mergeCells('B3:H3');
      const nameUser = sheet.getCell('B3');
      nameUser.value = item.question.statement;
      nameUser.font = {
        ...nameUser.font,
        size: 20,
        color: { argb: 'ffa43a' },
      };

      const keysSectionPowerstats: DataSection[] = [
        {
          keyColumnTitle: 'B',
          keyColumnValue: 'B',
          values: [{ key: 'Id:', value: item.idresponse }],
        },
        {
          keyColumnTitle: 'C',
          keyColumnValue: 'C',
          values: [{ key: 'Tema:', value: item.question.survey.theme }],
        },
        {
          keyColumnTitle: 'D',
          keyColumnValue: 'D',
          values: [
            {
              key: 'Usuario:',
              value: item.user.name + ' ' + item.user.lastname,
            },
          ],
        },
        {
          keyColumnTitle: 'E',
          keyColumnValue: 'E',
          values: [{ key: 'Respuesta:', value: item.question.statement }],
        },
        {
          keyColumnTitle: 'F',
          keyColumnValue: 'F',
          values: [{ key: 'F. Respuesta:', value: item.dateresponse }],
        },
      ];

      this.applyStyleDataSection(sheet, keysSectionPowerstats);
    }
  }

  private applyStyleDataSection(sheet: Worksheet, dataSection: DataSection[]) {
    dataSection.forEach((item) => {
      let rowNumber = 5;

      item.values.forEach((value) => {
        // CREO LA DESCRIPCIÓN
        const cellTilte = sheet.getCell(`${item.keyColumnTitle}${rowNumber}`); // E6
        cellTilte.value = value.key; //Intelligence

        cellTilte.font.color = { argb: 'FF5733' };

        //CREO EL VALOR DE LA DESCRIPCION
        const cellValue = sheet.getCell(
          `${item.keyColumnValue}${rowNumber + 1}`
        ); //F6
        cellValue.value = value.value as string; //COGE EL VALOR DE item.powerstats.intelligence
        cellValue.font.bold = false;
      });
    });
  }
}
