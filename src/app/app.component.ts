import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

interface SideItem {
  title: string,
  icon: string,
  path: string,
  items: SideItem[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Working Hours';
  theme = false;

  mobileQuery!: MediaQueryList;

  fillerNav: SideItem[] = [

    {
      title: 'query data',
      icon: 'keyboard_arrow_right',
      path: 'query-data',
      items: []
    },
    {
      title: 'Import',
      icon: 'keyboard_arrow_right',
      path: 'import',
      items: []
    },



  ]

  login: boolean = true
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private $loader: NgxUiLoaderService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onLogout() {
    // this.$loader.start()
    // this.$local.removeAllLocalStore()
    // this.router.navigate(['/login']).then(() => location.reload())
  }
  // todo show user login name
  displayName() {
    let userLogin: any = localStorage.getItem('WH_GA_user')
    userLogin = userLogin ? JSON.parse(userLogin) : null
    if (userLogin) {
      let firstName = userLogin.firstName ? userLogin.firstName : ''
      let lastName = userLogin.lastName ? userLogin.lastName[0] : ''
      return `${firstName}-${lastName}`
    }
    return ''
  }

  toggleTheme() {

  }
}
