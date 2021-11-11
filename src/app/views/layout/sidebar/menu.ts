import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

  {
    label: 'Tableau de bords',
    icon: 'home',
    link: '/privilege/dashboard'
  },

  {
    label: 'Stocks produits',
    isTitle: true
  },
  {
    label: 'Produits',
    icon: 'folder',
    subItems: [
      {
        label: 'Catégories',
        link: '/privilege/categories',
      },
      {
        label: 'Produits',
        link: '/privilege/produits'
      }
    ]
  },


  {
    label: 'Partenanaire',
    isTitle: true
  },

  {
    label: 'Partenanaire',
    icon: 'user-plus',
    link: '/privilege/partenaires',
  },



  {
    label: 'Ventes et commandes',
    isTitle: true
  },
  {
    label: 'Facturations',
    icon: 'file-minus',
    subItems: [
      {
        label: 'Ventes',
        link: '/privilege/ventes',
      },
      {
        label: 'Commandes',
        link: '/privilege/commandes'
      }
    ]
  },
{
    label: 'Détails',
    isTitle: true
  },
  {
    label: 'Bilan financiers',
    icon: 'activity',
    subItems: [
      {
        label: 'Détails des ventes',
        link: '/apps/email/inbox',
      },
      {
        label: 'Bilan périodique',
        link: '/apps/email/read'
      }
    ]
  },

  {
    label: 'Utilisateurs',
    isTitle: true
  },
  {
    label: 'Utilisateurs',
    icon: 'users',
    subItems: [
      {
        label: 'Profils',
        link: '/privilege/profils',
      },
      {
        label: 'Utilisateurs',
        link: '/privilege/utilisateurs',
      },
    ]
  },

];
