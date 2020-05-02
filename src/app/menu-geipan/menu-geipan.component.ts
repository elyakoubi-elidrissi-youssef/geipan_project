import {Component, OnInit, HostListener} from '@angular/core';

declare var require: any;
declare var $: any;
const axios = require('axios');
const Swal = require('sweetalert2');

@Component({
  selector: 'app-menu-geipan',
  templateUrl: './menu-geipan.component.html',
  styleUrls: ['./menu-geipan.component.scss']
})
export class MenuGeipanComponent implements OnInit {
  public cases = [];
  public page_index = 1;
  public page_size = 10;
  public total = 0;
  public pages = 0;
  public stopes = [];
  public deleted_stopes = [];
  public page_popup = false;
  public filter = {
    zone: '',
    classe_cas: 'tous',
    texte_resume: '',
    date_debut: '',
    date_fin: '',
  };

  constructor() {
  }

  ngOnInit(): void {
    let _this = this;
    axios.post('http://localhost:4201/api/cases?page=' + this.page_index + '&pagesize=' + this.page_size, this.filter).then(({data}) => {
      _this.cases = data.data;
      _this.total = data.length;
      _this.pages = Math.floor(_this.total / _this.page_size);
    });


  }

  ngAfterViewInit() {
    $('.foo').maphilight();
  }

  AlertMap(title): void {
    this.filter.zone = title;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
//In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    let indice = this.stopes.findIndex((x) => {
      return x >= pos;
    });
    if (indice !== -1) {
      this.deleted_stopes = this.deleted_stopes.concat(this.stopes.splice(indice, 1));
      this.page_index--;
    }

    indice = this.deleted_stopes.findIndex((x) => {
      return x <= pos;
    });
    if (indice !== -1) {
      this.stopes = this.stopes.concat(this.deleted_stopes.splice(indice, 1));
      this.page_index++;
    }

// pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      console.log('END');
      if (this.pages > this.page_index) {
        this.page_index++;
        this.Reloadcases(true);
        this.stopes.push(max);
      }
      //document.documentElement.scrollTop=0;
    }
  }

  ReloadFilter(): void {
    this.filter = {
      zone: '',
      classe_cas: 'tous',
      texte_resume: '',
      date_debut: '',
      date_fin: '',
    };
  }

  Reloadcases(append = false): void {
    let _this = this;
    console.log(this.filter);

    axios.post('http://localhost:4201/api/cases?page=' + this.page_index + '&pagesize=' + this.page_size, this.filter).then(({data}) => {
      if (!append) {
        _this.stopes = [];
        _this.deleted_stopes = [];
        _this.cases = data.data;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else {
        _this.cases = _this.cases.concat(data.data);
      }

      _this.total = data.length;
      _this.pages = Math.floor(_this.total / _this.page_size);
    });
  }

  detailTemoin(temoin): void {
    console.log(temoin);
    let text = '';
    text += '<pre style=\'text-align:left;font-size: 14px;white-space: pre-wrap; \'>';
    text += '------------- Témoin ------------- <br/>';
    text += 'Date de l\'observation: ' + temoin.obs_chrono + '  <br/>';text += 'Numéro de pièce: <br/>';
    text += 'Age: ' + temoin.tem_age + '  <br/>';
    text += 'Profession: ' + temoin.tem_xp_activite_type + '<br/>';
    text += 'Sexe: ' + temoin.tem_genre  + '<br/>';
    text += 'Réaction: <br/>';
    text += 'Crédibilité: <br/>';
    text += '------------- Conditions ------------- <br/>';
    text += 'Environnement: ' +  temoin.obs_1_env_sol_type +  '  <br/>';
    text += 'Conditions météo: ' + temoin.obs_conditions_meteo +  '  <br/>';
    text += 'Heure de l\'observation:  ' +  temoin.obs_heure +  '  <br/>';
    text += 'Cadre de référence: ' + temoin.obs_1_cadre_reference_type +  '  <br/>';
    text += 'Distance entre phénomène et témoin:<br/>';
    text += 'Début de l\'observation: <br/>';
    text += 'Fin de l\'observation: <br/>';
    text += '------------- Localisation ------------- <br/>';
    text += 'Angle du site: <br/>';
    text += 'Direction d\'observation: <br/>';
    text += 'Cap: ' + temoin.obs_1_cap +  '  <br/>';
    text += 'Trajectoire: ' +  temoin.obs_1_trajectoire_types + ' <br/>';
    text += 'Nature de l\'observation: ' +  temoin.obs_1_PAN_nature_type +  ' <br/>';
    text += 'Caractéristique de l\'observation: ' +  temoin.obs_1_caracteristiques_types +  ' <br/>';
    text += 'Forme globale: '  + temoin.obs_1_forme_types + '  <br/>';
    text += 'Couleur: ' + temoin.obs_1_couleur_types +  ' <br/>';
    text += 'Taille apparente: '  + temoin.obs_1_taille_apparente_type +  ' <br/>';
    text += 'Vitesse apparente: ' +  temoin.obs_1_vitesse_types + '  <br/>';
    text += 'Bruit:  ' +  temoin.obs_1_bruit_nature_types + ' <br/>';
    text += 'Effet sur l\'environnement: <br/>';
    text += 'Nombre: ' + temoin.obs_nb +  ' <br/>';
    text += '</pre>';
    Swal.fire({
      title: 'Temoinage ' + temoin.id_temoignage + ': ' + temoin.tem_nom_dossier,
      html: text,
    });

  }

}
