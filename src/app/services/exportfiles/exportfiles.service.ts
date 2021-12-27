import { style } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportfilesService {
date = new Date();

  constructor() { }

  getDocumentDefinition(tableBody: any = [], title) {
    return {

      pageSize: 'A4',
      /* Entête et pieds de page */
    /*   header: {
        columns: [

          {
            text:'simple text',
            style:'dkem',

          }

        ]
      }, */

      /* footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      }, */
      /* Corps du PDF */
      content: [
        {
          columns: [
            [
              {
                text: title,
                
              }
            ]
          ],
          style: 'title'
        },
       
        {
          columns : [
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
               // widths: [ '*', '*', 100, '*' ],
                //widths: [ '*', 'auto', 100, '*' ],
                widths: [ '*', '*', '*'],
        
                body: tableBody
              },
              style: 'table'
            },
            
          ]
        }
      ],


      info: {
        title: "doc" + this.date,
        author: "VentePro",
        subject: 'infoPartenaire',
        keywords: 'infoPartenaire, ONLINE infoPartenaire',
      },
      /* Style du PDf */
        styles: {
          header: {
            fontSize: 12,
            /*bold: true,*/
            margin: [0, 20, 0, 10],
            decoration: 'underline',
            color: 'blue',
            alignment: 'left',
          },
          tableHeader: {
            bold: true,
          },
          piedpage: {
            margin:[0, 350, 0, 0],
            alignment: 'center'
          },
          title: {
            bold: true,
            alignment: 'left',
            fontSize: '18'
          },
          table: {
            margin: [0, 15, 0, 15],
            widths: [ '*', 'auto', 100, '*' ],
          }
        }
    };
  }
}
