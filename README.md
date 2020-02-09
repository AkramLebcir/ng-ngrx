# Getting Started With Schematics

This repository is a basic Schematic. Is a package build upon angular, whose objectif is to propose a better way of generating angular files.

### Usage

Use :

```bash
npm i ng-ngrx
```
to install the package

### Create Module App

```bash
ng g ng-ngrx:ng-module <module name>
```

out

```bash
core : 
    /<module name>/ :
        _services/
            <module name>.service.ts

views/ : 
    pages/ :
        apps/ :
            <module name>/ :
                <module name>.component.ts
                <module name>.component.html
                <module name>.component.scss
                <module name>.module.ts

```


### Generate ngrx files

```bash
ng g ng-ngrx:ng-rx <name> <module name>

```

out

```bash
core/ : 
    <module name>/ :
        _actions/
            <name>.actions.ts
        _datasource/
            <name>.datasource.ts
        _effects/
            <name>.effects.ts
        _models/
            <name>.model.ts
        _reducers/
            <name>.reducers.ts
        _selectors/
            <name>.selectors.ts
        _state/
            <name>.state.ts
```

That's it!
 