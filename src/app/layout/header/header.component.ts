import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

interface Menu {
  title?: string;
  link: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // router subscription to keep track of router Observable
  private routerEvent$?: Subscription;
  // menu list (move to seperate file, if length > 3)
  public menus: Menu[] = [
    {
      title: 'Books',
      link: 'books',
      active: true,
    },
    {
      title: 'Categories',
      link: 'categories',
      active: false,
    },
  ];

  constructor(private router: Router) {}


  // on reload or navigation using browser history(back/forward button) highlight active menu
  private onReload(pathname: string) {
    const url = pathname.split('/');
    url.shift();
    if (url[0]) {
      this.navigate({ link: url[0] });
    }
  }

  // highlight active menu
  public navigate(menu: Menu) {
    this.menus.map((currMenu) => {
      if (currMenu.link === menu.link) {
        currMenu.active = true;
      } else {
        currMenu.active = false;
      }
    });
    this.router.navigate([menu.link]);
  }

  // router Event to keep track of browser history navigation
  private routerEvent() {
    this.routerEvent$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onReload(event.url);
      }
    });
  }
  // default init function
  private onInit() {
    this.onReload(window.location.pathname);
    this.routerEvent();
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnDestroy() {
    this.routerEvent$?.unsubscribe();
  }
}
