// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Component
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
// Service
import { <%= classify(name) %>Service } from '../../../../core/<%= dasherize(name) %>/_services/<%= dasherize(name) %>.service';

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
		RouterModule.forChild(routes)
	],
	declarations: [<%= classify(name) %>Component],
	providers: [<%= classify(name) %>Service]
})
export class <%= classify(name) %>Module {}
