// Angular Import
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// project import
import { NavigationItem, NavigationItems } from 'src/app/theme/layout/admin/navigation/navigation';

interface titleType {
  // eslint-disable-next-line
  url: any;
  title: string;
  breadcrumbs: unknown;
  type: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  // public props
  @Input() type!: string;

  navigations: NavigationItem[];
  breadcrumbList: Array<string> = [];
  navigationList!: titleType[];

  // constructor
  constructor(
    private route: Router,
    private titleService: Title
  ) {
    this.navigations = NavigationItems;
    this.setBreadcrumb();
  }

  // public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        this.navigationList = breadcrumbList;
        const title = breadcrumbList[breadcrumbList.length - 1]?.title || 'Welcome';
        this.titleService.setTitle(title + ' | To Artificial Intelligence');
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): titleType[] {
    for (const navItem of navItems) {
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        // eslint-disable-next-line
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
  }
}
