import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

/* PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  images = ['assets/home/4.jpg', 'assets/home/2.jpg', 'assets/home/5.jpg'];

  resume: any = {};

  constructor( private router: Router ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit(): void {
    this.resume.name = 'Vente-Pro';
    this.resume.adresse = 'Abidjan, Angré mahou';
    this.resume.phone = '05 46 53 34 10';
    this.resume.email = 'dkem@gmail.com';
    this.resume.num = '2021-0025';

  }


  linklogin(){
    const link = ['/auth/login']
    this.router.navigate(link);
  }


  //PDF
  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download('factune_'+this.resume.num); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
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
                text: 'Intitulé: Produits facturésdgffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
              }
            ]
          ],
          style: 'entete'
        },
        {
          text: 'Facture N° : ' + this.resume.num,
          bold: true,
          fontSize: 20,
          alignment: 'right',
          margin: [0, 0, 0, 20]
        },

        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name',
            },
            {
              text: this.resume.adresse
            },
            {
              text:this.resume.email,
            },
            {
              text: this.resume.phone,
            }
            ],
          ],

        },
        {
          columns: [
            [
              {
                text: 'M. KOFFI Kouamé',
                style: 'nomclient'
              },
              {
                text: '05 47 585',
                style: 'phoneclient'
              },
              {
                text: 'Ville',
                style: 'ville'
              }
            ]
          ],
          alignment: 'right'
        },
        {
          text: 'Intitulé: Produits facturés',
          style: 'header'
        },
        {
          columns : [
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ '*', 'auto', 100, '*' ],
                border: true,

                body: [
                  [ 'Désignation', 'Quantité', 'Prix unitaire', 'Prix total' ],
                  [ 'Chargeur airaimo', '1', '2000', '2000' ],
                  [ 'Matelas 1 places', '1', '15000', '15000' ],
                  [ 'Ecouteurs', '1', '2000', '2000' ],
                  [ '','','',{ text: '19000', bold: true } ]
                ]
              }
            }
          ]
        },
        {
          columns: [
            [
              {
                text: 'Intitulé: Produits facturésdgffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
              }
            ]
          ],
          style: 'foot'
        }
      ],


      info: {
        title: "recu" + '_facture',
        author: "VentePro",
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
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
          foot: {
            color: 'red',
            margin:[0, 400, 0, 0]
          },
          entete:{

          }
        }
    };
  }


}
