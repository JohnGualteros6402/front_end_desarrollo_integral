import { DataSection, UserDetail } from './../models/excel.interface';
import { Injectable } from '@angular/core';
import { ImagePosition, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { DataExcel, UserTable } from '../models/excel.interface';
import { LOGO } from '../models/logo';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  private workbook = new Workbook();

  async downloadExcelUsers(dataExcel: DataExcel): Promise<void> {
    this.workbook = new Workbook();

    this.workbook.creator = 'Eskrive';

    await this.createUserTable(dataExcel.usersTable);
    await this.createUserDetail(dataExcel.usersDetail);

    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs.saveAs(blob, 'Users.xlsx');
    });
  }

  private async createUserTable(dataUsersTable: UserTable[]): Promise<void> {
    const sheet = this.workbook.addWorksheet('USERS');

    sheet.getColumn('B').width = 5;
    sheet.getColumn('C').width = 20;
    sheet.getColumn('D').width = 25;
    sheet.getColumn('E').width = 25;
    sheet.getColumn('F').width = 30;
    sheet.getColumn('G').width = 30;
    sheet.getColumn('H').width = 30;

    sheet.columns.forEach((column) => {
      column.alignment = { vertical: 'middle', wrapText: true };
    });

    const logoId = this.workbook.addImage({
      base64: LOGO,
      extension: 'png',
    });

    const position: ImagePosition = {
      tl: { col: 1, row: 1 },
      ext: { width: 350, height: 140 },
    };

    ///sheet.addImage(logoId, 'B2:B7');
    sheet.addImage(logoId, position);

    //AGREGAMOS UN TITULO
    const titleCell = sheet.getCell('E5');
    titleCell.value = `Sistema de\nciudadana`;
    titleCell.style.font = { bold: true, italic: true, size: 24 };

    //AGREGAMOS UN SUBTITULO
    const subTitleCell = sheet.getCell('F5');
    subTitleCell.value = `participación`;
    subTitleCell.alignment = { vertical: 'top', horizontal: 'left' };
    subTitleCell.style.font = { bold: true, italic: true, size: 24 };

    //CREAMOS LOS TITULOS PARA LA CABECERA

    const headerRow = sheet.getRow(8);
    // ESTAMOS JALANDO TODAS LAS COLUMNAS DE ESA FILA, "A","B","C"..etc
    headerRow.values = [
      '', // column A
      'Id', // column B
      'N° Documento', // column C
      'Nombre', // column D
      'Apellido', // column E
      'Dirección', // column F
      'Email', // column G
      'Telefono', // column H
    ];

    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.font = { bold: true, size: 14 };

    // INSERTAMOS LOS DATOS EN LAS RESPECTIVAS COLUMNAS
    const rowsToInsert = sheet.getRows(9, dataUsersTable.length)!;

    for (let index = 0; index < rowsToInsert.length; index++) {
      const itemData = dataUsersTable[index]; // obtenemos el item segun el index de la iteracion (recorrido)
      const row = rowsToInsert[index]; // obtenemos la primera fila segun el index de la iteracion (recorrido)

      //  los valores de itemData seran asignados a "row" (fila actual en la iteracion)

      row.values = [
        '', // column A
        itemData.iduser, // column B
        itemData.numberdocument, // column C
        itemData.name, // column D
        itemData.lastname, // column E
        itemData.address, // column F
        itemData.email, // column G
        itemData.numberphone, // column H
      ];

      row.height = 21;
    }
  }

  private async createUserDetail(dataUserDetail: UserDetail[]): Promise<void> {
    for (let index = 0; index < dataUserDetail.length; index++) {
      const item = dataUserDetail[index];
      //CREAMOS UNA HOJA
      const sheet = this.workbook.addWorksheet(
        `${index + 1} - ${item.name.toUpperCase()}` //1 - A Boom
      );

      // ESTABLECEMOS EL ANCHO DE LAS COLUMNAS Y UNOS CUANTOS ESTILOS
      ['B', 'C', 'D', 'E', 'F', 'H', 'I'].forEach((columnKey) => {
        sheet.getColumn(columnKey).width = 16;
        sheet.getColumn(columnKey).font = {
          bold: true,
          color: { argb: 'FFFFFF' },
        };
      });

      sheet.getColumn('B').width = 12;
      sheet.getColumn('C').width = 12;
      sheet.getColumn('G').width = 11;
      sheet.getColumn('H').width = 20;
      sheet.getColumn('I').width = 27;

      sheet.getRow(14).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      // PINTAMOS LAS CELDAS SEGUN NUESTRA LA PLANTILLA
      this.paintCellsUserDetail(sheet);

      // AGREGAR IMAGEN DEL HEROE Y AGREGAMOS SU NOMBRE DEBAJO DE LA IMAGEN
      const idImage = await this.getIdImage(item.urlImage);
      sheet.addImage(idImage, 'B2:C13');

      sheet.mergeCells('B14:C14');
      const nameUser = sheet.getCell('B14');
      nameUser.value = item.name; // ACA AGREGAMOS EL NOMBRE DEL HEROE
      nameUser.font = {
        ...nameUser.font,
        size: 20,
        color: { argb: 'ffa43a' },
      };

      // CREAMOS LA SECCIÓN "Powerstats" Y  "Appearance"
      this.applyStyleTitleSection(sheet, [
        { value: 'Informacion Usuario', cell: 'E3' },
      ]);

      const keysSectionPowerstats: DataSection[] = [
        {
          keyColumnTitle: 'E',
          keyColumnValue: 'F',
          values: [
            { key: 'Id:', value: item.iduser },
            { key: 'Nombre:', value: item.name },
            { key: 'Direccion:', value: item.address },
            { key: 'N° Celular:', value: item.numberphone },
            { key: 'F. Nacimiento:', value: item.datebirth },
            { key: 'Sexo:', value: item.sex },
            { key: 'Nivel Academico:', value: item.academiclevel },
            { key: 'Régimen:', value: item.affiliationregime },
            { key: 'Rol:', value: item.role },
          ],
        },
        {
          keyColumnTitle: 'H',
          keyColumnValue: 'I',
          values: [
            { key: 'N° Documento:', value: item.numberdocument },
            { key: 'Apellido:', value: item.lastname },
            { key: 'Email:', value: item.email },
            { key: 'N° Fijo:', value: item.landline },
            { key: 'Municipio:', value: item.municipality },
            { key: 'Estrato:', value: item.stratum },
            { key: 'Discapacidad:', value: item.disabilitycondition },
            { key: 'Etnia:', value: item.ethnicity },
            { key: 'Acceso a la Tecnologia:', value: item.technologicalaccess },
          ],
        },
      ];

      this.applyStyleDataSection(sheet, keysSectionPowerstats);
    }
  }

  private paintCellsUserDetail(sheet: Worksheet) {
    for (let index = 0; index < 14; index++) {
      [
        `A${index + 1}`,
        `B${index + 1}`,
        `C${index + 1}`,
        `D${index + 1}`,
        `E${index + 1}`,
        `F${index + 1}`,
        `G${index + 1}`,
        `H${index + 1}`,
        `I${index + 1}`,
        `J${index + 1}`,
      ].forEach((key) => {
        sheet.getCell(key).fill = {
          // pintar celda
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '000000' },
        };
      });
    }
  }

  private applyStyleTitleSection(
    sheet: Worksheet,
    cells: { value: string; cell: string }[]
  ) {
    // PRIMERO HACERMOS UN MERGE DE LAS CELDAS
    sheet.mergeCells('E3:I3');

    cells.forEach((item) => {
      const sectionTitle = sheet.getCell(item.cell);
      sectionTitle.value = item.value;
      sectionTitle.style = {
        font: { size: 14, bold: true, italic: true, color: { argb: 'FFFFFF' } },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'D35400' },
        },
        alignment: { horizontal: 'center' },
      };
    });
  }

  private applyStyleDataSection(sheet: Worksheet, dataSection: DataSection[]) {
    dataSection.forEach((item) => {
      let rowNumber = 5;

      item.values.forEach((value) => {
        // CREO LA DESCRIPCIÓN
        const cellTilte = sheet.getCell(`${item.keyColumnTitle}${rowNumber}`); // E6
        cellTilte.value = value.key; //Intelligence

        cellTilte.font.color = { argb: '2E86C1' };

        //CREO EL VALOR DE LA DESCRIPCION
        const cellValue = sheet.getCell(`${item.keyColumnValue}${rowNumber}`); //F6
        cellValue.value = value.value as string; //COGE EL VALOR DE item.powerstats.intelligence
        cellValue.font.bold = false;
        rowNumber++;
      });
    });
  }

  private async getIdImage(url: string): Promise<number> {
    const response = await fetch(url);
    const image = this.workbook.addImage({
      buffer: await response.arrayBuffer(),
      extension: 'jpeg',
    });

    return image;
  }
}
