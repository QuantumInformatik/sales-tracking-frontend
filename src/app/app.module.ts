import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ProductAdminComponent} from "./pages/products/product-admin/product-admin.component";
import {ProductEditComponent} from "./pages/products/product-edit/product-edit.component";
import {ProductListComponent} from "./pages/products/product-list/product-list.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationService} from "primeng/api";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductAdminComponent,
    ProductEditComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
  ],
  providers: [
    FormBuilder,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
