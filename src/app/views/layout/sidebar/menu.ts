import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [

  {
    label: 'Tableau de bords',
    icon: 'home',
    link: '/dashboard'
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
        link: '/apps/email/inbox',
      },
      {
        label: 'Produits',
        link: '/apps/email/read'
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
    link: '/apps/chat',
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
        link: '/apps/email/inbox',
      },
      {
        label: 'Commandes',
        link: '/apps/email/read'
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
        link: '/profils',
      },
      {
        label: 'Utilisateurs',
        link: '/utilisateurs',
      },
    ]
  },

];
