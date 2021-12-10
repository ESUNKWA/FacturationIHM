import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportfilesService {

  constructor() { }

  getDocumentDefinition(columnstitles: any = [], tableBody: any = []) {
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
          columns : [
            {
              layout: 'lightHorizontalLines', // optional
              table: { 
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
               // headerRows: 1,
                widths: [ '*', 'auto', 100, '*' ],
                border: true,

                body: [
                  columnstitles,
                  tableBody
                ]
              }
            }
          ]
        }
      ],


      info: {
        title: "recu" + '_facture',
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
          name: {
            fontSize: 16,
            bold: true,
            color: 'red',
            marginleft: '200'
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          dkem:{
            color: 'red',
            height: '200',

          },
          piedpage: {
            margin:[0, 350, 0, 0],
            alignment: 'center'
          },
          note:{
            margin: [0, 50, 0, 0]
          },
          facture: {
            bold: true,
                alignment: 'right',
          }
        }
    };
  }
}
