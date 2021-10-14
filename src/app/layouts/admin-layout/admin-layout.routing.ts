import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TableComponent} from '../../pages/table/table.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';
import {ProductAdminComponent} from "../../pages/products/product-admin/product-admin.component";
import {ReportAdminComponent} from "../../pages/reports/report-admin/report-admin.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'products',      component: ProductAdminComponent },
  { path: 'reports',      component: ReportAdminComponent },
];
