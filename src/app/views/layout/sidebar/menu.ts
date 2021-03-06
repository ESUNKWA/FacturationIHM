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
    label: 'Ventes et commandes',
    isTitle: true
  },
  {
    label: 'Facturation',
    icon: 'file-minus',
    subItems: [
      {
        label: 'Ventes',
        link: '/privilege/ventes',
      },
      {
        label: 'Commandes',
        link: '/privilege/commandes'
      },
      {
        label: 'Voir les livraisons',
        link: '/privilege/livraisons'
      },
      {
        label: 'Liste de clients',
        link: '/privilege/clients'
      }
    ]
  },
{
    label: 'Détails',
    isTitle: true
  },
  {
    label: 'Consultation',
    icon: 'activity',
    subItems: [
      {
        label: 'Détails des ventes',
        link: '/privilege/details-ventes',
      },
      {
        label: 'Détails des achats',
        link: '/privilege/achat',
      },
      {
        label: 'Etats des reglements partiels',
        link: '/apps/email/read'
      }
    ]
  },

  {
    label: 'Gestion et administration',
    isTitle: true
  },
  {
    label: 'Administration',
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
      {
        label: 'Partenanaire',
        link: '/privilege/partenaires',
      }
    ]
  },

];
