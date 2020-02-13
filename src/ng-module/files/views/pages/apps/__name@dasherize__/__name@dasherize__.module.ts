// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Translate Module
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Core => Services
import { <%= classify(name) %>sService } from '../../../../core/<%= dasherize(name) %>';
// Core => Utils
import { HttpUtilsService,
	TypesUtilsService,
	InterceptService,
	LayoutUtilsService
} from '../../../../core/_base/crud';
import { environment } from '../../../../../environments/environment';
// Component
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';


const routes: Routes = [
	{
		path: '',
		component: <%= classify(name) %>Component,
		// children: []
	}
];

@NgModule({
	imports: [
		CommonModule,
		TranslateModule.forChild(),
		RouterModule.forChild(routes),
		// StoreModule.forFeature('', ),
		// EffectsModule.forFeature([]),
	],
	declarations: [<%= classify(name) %>Component],
	providers: [
		<%= classify(name) %>sService,
		HttpUtilsService,
		TypesUtilsService,
		InterceptService,
		LayoutUtilsService,
	]
})
export class <%= classify(name) %>Module {}
