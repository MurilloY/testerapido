import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdmService } from '../../services/adm.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nav-adm',
  templateUrl: './nav-adm.component.html',
  styleUrls: ['./nav-adm.component.scss']
})
export class NavAdmComponent implements OnInit {

  @ViewChild('snav') public drawer!: MatDrawer;

  configuracoes: any = [];
  cadastros: any = [];
  relatorios: any = [];
  portaria: any = [];

  category_fixes: any[] = []
  
  defaultUrl = "";

  sub_menus_opened: any = []

  showMenu: boolean = true;


  menu = []


  notificationsList: any = [];
  totalNotifications: number = 0;

  photo?: string = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  macAutorizado = false



  collapsedNav?: boolean;
  mobileQuery: MediaQueryList;
  isExpanded = true
  private _mobileQueryListener: () => void;

  constructor(
    private titleService: Title,
    private router: Router,
    private dialog: MatDialog,
    media: MediaMatcher,
    private admService: AdmService,
    changeDetectorRef: ChangeDetectorRef) {
    


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);


    this.category_fixes = [
      {
        id: 0,
        name: "Home",
        icon: "dashboard",
        hasSubmenu: 0,
        link: '/adm/home',
        submenus : []
      },
      {
        id: 0,
        name: "Clínicas",
        icon: "local_hospital",
        hasSubmenu: 0,
        link: '/adm/clinics',
        submenus : []
      },
      {
        id: 0,
        name: "Profissionais",
        icon: "medical_information",
        hasSubmenu: 0,
        link: '/adm/professionals',
        submenus : []
      },
      {
        id: 0,
        name: "Categorias",
        icon: "category",
        hasSubmenu: 0,
        link: '/adm/categories',
        submenus : []
      },
      {
        id: 0,
        name: "Especialidades",
        icon: "history_edu",
        hasSubmenu: 0,
        link: '/adm/specialties',
        submenus : []
      },
      {
        id: 0,
        name: "Tipos de registro",
        icon: "content_paste",
        hasSubmenu: 0,
        link: '/adm/register_type',
        submenus : []
      },
      {
        id: 0,
        name: "Administradores",
        icon: "admin_panel_settings",
        hasSubmenu: 0,
        link: '/adm/adms',
        submenus : []
      },
      {
        id: 0,
        name: "Perguntas",
        icon: "question_answer",
        hasSubmenu: 0,
        link: '/adm/questions',
        submenus : []
      },
      {
        id: 0,
        name: "Leads",
        icon: "list_alt",
        hasSubmenu: 0,
        link: '/adm/leads',
        submenus : []
      },
      {
        id: 0,
        name: "WhatsApp",
        icon: "message",
        hasSubmenu: 0,
        link: '/adm/whatsapp',
        submenus : []
      }
    ]
    
  }

  openSubmenu(page: any) {

    if (this.sub_menus_opened.includes(page.name)) {

      this.sub_menus_opened = this.sub_menus_opened.filter(function (e: any) { return e !== page.name });

    } else {
      if (!this.collapsedNav) {
        this.sub_menus_opened.push(page.name);
      }
    }
  }



  isClicked(page_name: any) {
    if (this.sub_menus_opened.includes(page_name)) {
      return true;
    } else {
      return false;
    }
  }

  openNotifications() {


  }
  totalNotificationsText = ""

  ngOnInit(): void {

    document.body.classList.add('login-page');

    let url = this.router.url;
    let split = url.split("/");

  }


  perfil() {

  }

  goToNext(route:string) {

    let url = this.router.url;
    let split = url.split("/");
    let gourl;
    if(route == null) {
       gourl =  split[0] + "/" + split[1] + "/" + split[2] + "/" + split[3];
    }else {
      gourl =  split[0] + "/" + split[1] + "/" + split[2] + "/" + split[3] + "/" + route;
    }

    return gourl;

  }


  logOut() {

    let title = "Desconectar";
    let message = "Deseja realmente se desconectar ?";


    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.admService.logout();
        

      }

    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);

  }

}