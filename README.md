# [WIP] Hands on ionic

Starter project from someone who know nothing on ionic.

Main goal is to learn by using it. Start small then add complexity.

Official doc is pretty good, have a look at https://ionicframework.com/docs/

> Note, im writing this with ionic 3.20.0

- [x] [start an empty project](#Start-an-empty-project)
- [x] [understand the package](#Understand-the-package)
- [x] [add a new page](#Add-a-new-page)
- [x] [navigation](#Navigation-between-pages)
- [x] [add api call](#Add-API-call)
- [x] [add local storage](#Add-local-storage)
- [x] [add user interaction](#Add-user-interaction)
- [x] [add a repository that manage access to objects](#Add-a-repository)
- [x] [add a custom component](#Add-custom-component)
- [ ] [use the component only where you need it]()
- [ ] add internationalization
- [ ] add lazy loading 
- [ ] ... to be continued ...


## Start an empty project

1. Install ionic and cordova

```bash
(sudo ?) npm install -g ionic cordova
```

2. Go to a folder and init a project

```bash
cd path/to/folder
ionic start ponyApp blank
? Would you like to integrate your new app with Cordova to target native iOS and Android? (y/N) >> y
? Install the free Ionic Pro SDK and connect your app? >> n (unless you have it)
cd ponyApp
```


## Understand the package

Folder structure is

**PonyApp**
 |- **nodes_modules** *contains modules from node, like plugins*
 |- **resources** *contains os specific things (icon + splashscreen) generated by ionic in the subfolders using the root resources*
 |- **src** *the main sources of your app*
 |- **ionic.config.json** *is the project configuration file, how the ionic cli will work*
 |- **config.xml** *Handle app compilation and execution, version, config files for platforms*
 |- **package.json** *kind of build script for node packages, manage the dependencies (like ionic version for execution and plugins) and the dev dependencies (compil scripts)*
 
Then you can serve your app with `ionic serve` and it will open your browser.

> Another option if the ionic version of your app is different from the one globally installed is to use `npm run ionic:serve` as in **package.json** scripts


Going on the **src** folder, let's explore (be aware there is no guideline on how the folder should be structured):

**src**
 |- **index.html** *is the shell of the application*
 |- **app**  *kind of main module contains the entry point of the app*
 |- **pages** *contains all the screens of your app*
 |- **manifest.json** *is a config file for PWA*
 |- **service-worker.json** *is mostly used for PWA and to optimize loadings of assets*
 
 And lets focus a little on **app** folder
 
**app**
 |- **app.component.ts** *is your app, it is used at startup*
 |- **app.html** *contains the shell of the navigation for the app (container for pages)*
 |- **app.module.ts** *is the main module, means that items related to your app globally that need to be displayed or injected should be declared here to be usable elsewhere*


> All the code written within `src` will be transpiled in pure JS for browsers. We work high level, it's the compiler that gets its hands dirty.

If we take a look at **app.module.ts** what's inside ?
There is a `IonicModule.forRoot(MyApp)` line that declare our application. `MyApp` is in **app.component.ts**

And in **app.compontent.ts** there is:
`rootPage:any = HomePage;` that is the declaration of the page that will be started at launch time.
This `rootPage` is used in **app.html** `<ion-nav [root]="rootPage"></ion-nav>` 

That's it, we have the (light?) start loading lifecycle of our ionic app.


## Add a new page

Before, let's have a look at a page structure. 
Let's go into `src/pages/home`.

There are 3 files:
**home**
 |- **home.html** contains the view of the app, all data is binded here
 |- **home.scss** contains the style that is only used in our page, not global
 |- **home.ts** is the "controller" of our page, it binds the data for the view and manage it.

If fact, a page is just an angular component with ionic directives provided by injection. 

There we go, let's add a new page.

In order to add something, there is always a command with **ionic**.
Here, the one is `ionic generate page [pageName]`

So here we go

```bash
ionic generate page list
```

Will create a filder `src/pages/list`.

> There is another file added `details.module.ts`, so 4 in fact are in this folder, this is used for lazy loading, deep linking and more on the new version of ionic. We won't focus on it.


Let's use it as the main scren of our app.
1. Go into `src/app/app.component.ts`
2. Import it with `import { ListPage } from '../pages/list/list';`
3. Replace the HomePage `rootPage:any = ListPage;`
4. Enjoy the crash. 

What we forgot here, is that everything we use needs to be declared in `app.module.ts` so, let's do it.
1. Go into `src/app/app.module.ts`
2. Import it with `import { ListPage } from '../pages/list/list';`
3. Declare it, in the `declarations: [MyApp, ListPage]`
4. Entry it, in the `entryComponents` too

And it works !

## Add an existing compontent

A component is a view item. ionic provides a lot of them and you can found even more over the internet.

Here we have a list, ionic provides compontents for that. 

The one we're looking for is [`ion-list`](https://ionicframework.com/docs/components/#lists)

Let's add it into our `src/page/list/list.html` within the `ion-content` with is the "body" of our screen.

```htmlmixed=
<ion-header>

  <ion-navbar color="primary">
    <ion-title>THe Poney Heaven</ion-title>
  </ion-navbar>

</ion-header>


<ion-content>
  <ion-list>
  </ion-list>
</ion-content>
```

But our list is empty, we need to add rows with content, it is called `ion-item`. So add it

```htmlmixed=
<ion-content>
  <ion-list>
      <ion-item ion-item>
      </ion-item>
  </ion-list>
</ion-content>
```

Still, there is nothing, let's add a basic display. `ionic` provides a lot of possible displays that are compatible with platform designs.

```htmlmixed=
<ion-content>
  <ion-list>
    <ion-item ion-item>
      <ion-avatar item-start>
        <img src="{{ avatar_url }}">
      </ion-avatar>
      <h2>{{ name }}</h2>
    </ion-item>
  </ion-list>
</ion-content>
```

This is a simple layout to display an avatar and a text after. 
`{{ avatar_url }}` and `{{ name }}` are binded. 
But we have a list, so we surely have a list binded. So we need to iterate over the items to create as many as in our list.

This is done with angular.

Add `*ngFor="let item of items"` in the `<ion-item>` to bind the model of each row. 
And change the binded variables as, the model of each row will be `item`.

```htmlmixed=
<ion-content>
  <ion-list>
    <ion-item *ngFor="let item of items" ion-item>
      <ion-avatar item-start>
        <img src="{{ item.avatar_url }}">
      </ion-avatar>
      <h2>{{ item.name }}</h2>
    </ion-item>
  </ion-list>
</ion-content>
```

Here we are, we just need to bind this `items` in our **list.ts** to finalize !

`items` is a list of objects that contains a `name` and an `avatar_url`. Simple.

Open **list.ts**

```typescript=
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
  }
}
```

We need a member of `ListPage` called items, and we need to fill it with items. 

> We pass over the model here, let's be dirty and we'll be back on the model later.

```typescript=
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
    this.items = [
        {
            "name": "Tom",
            "avatar_url": "https://placekitten.com/300/300"
        },
        {
            "name": "Sylvestre",
            "avatar_url": "https://placekitten.com/300/300"
        }
    ];
  }
}
```

And open your browser, see the list items !

## Navigation between pages

Let's add another page, call it `details` and register it. 
As we do not want it to be the root. Just import it in `app.module.ts`

This page will be called when the user pick an item for the list. So we need to

1. Catch the click event on the list
2. Find the selected item from the list
3. Send the navigation to the details page
4. Send the choosen item to the details page

Here we go.

First, catch the event on the list, once again, **angular**. 
Open **list/list.html**

Then listen to **click** event by adding

```htmlmixed=
<ion-item *ngFor="let item of items" (click)="showItem(item)" ion-item>
```

This will listen to the **click** item and trigger the method `showItem` from `ListPage` (in **list.ts**) with `item` as a parameter.

So let's add `showItem` method in `ListPage`.

```typescript=
export class ListPage {

  ...

  showItem(item) {
    // Show the item
  }
}
```

Then we want to open the `DetailsPage`, so we need to
1. Import it to be aware it exists
2. Start it with the navigation

```typescript=
...
import { DetailsPage } from '../details/details';

...

export class ListPage {

  ...

  showItem(item) {
    this.navCtrl.push(DetailsPage);
  }
}

```

And now, we want to give the item as parameter to `DetailsPage`, so add it. As simple as that.

```typescript=
showItem(item) {
    this.navCtrl.push(DetailsPage, item);
}
```

And we're good.
Unless we don't know how to get the parameter in **DetailsPage**.

It is simple, just get it from the `navParams` that your `constructor` has as parameter.

```typescript=
constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
}
```

----
> !!IMHO!!, the best way to pass parameteres to another page is to ask it **how** we should pass them.
> Means that instead of passing item as parameter, we call a `static` method from `DetailsPage`
> For example, 
> In **details.ts**
> ```typescript=
> export class DetailsPage {
>   ...
>   static navigationParameters(item: any): any {
>     return {
>       item: item
>     }
>   }
> }
> ```
> And in **list.ts**
> ```typescript=
> showItem(item) {
>   this.navCtrl.push(
>     DetailsPage,
>     DetailsPage.navigationParameters(item));
>  }
> ```
> But it's up to you to do it like that or not.
---

## Add API call

Now that we have a great application, we would like to fill the data from an API.
I've made a [simple API](https://gist.github.com/quentin7b/778758560e12f797272638c9ad61cf38) to help that, with one endpoint. Fell free to do your own.

With **ionic** you can do http call with **angular**`Http` in `@angular/http`.

You can do it in your view, but this is a bad idea, best way to do that is to create a service that will do it and use the service in your views. 

### Create a service

> Note that you can do it with `ionic generate provider {providerName}`. This will generate all the files you need in a **providers** directory, update the files that have to be updated and it will work. 

> Here I've made it by hand, so it is not in **providers** but un **services**

So lets create a folder `src/services` where we'll put our services. 
And create a file **APIService.ts** that will contain our service.

```typescript=
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs/Observable";

@Injectable()
export class APIService {

    constructor(private http: Http) {

    }

    public allItems(): Observable<any[]> {
        // Fetch items over the internet
    }
}
``` 

Our service will be injected in our views so we need it to be `Injectable` and will do **http** requests. Thats the `imports`.

Then, we'll do the requests:

```typescript=
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

...

export class APIService {

    ...

    public allItems(): Observable<any[]> {
        var url = 'https://gist.githubusercontent.com/quentin7b/778758560e12f797272638c9ad61cf38/raw/bb6104b7d786dab972a08c0d1c4fe00446f7232e/all.json';
        return this.http.get(url).map(res => res.json());
    }
}
```

What we are doing here is using `this.http` to make a `get` request on the url.
As we obtain a response with json format, we transform it to return the parsed json with map operator. See [how angular rx works](https://angular.io/guide/rx-library).


### Use the service

Once your service is done, like everyting, delcare it in **app.module.ts** but in the `providers` part.

```typescript=
@NgModule({
    providers: [
        ....
        APIService,
        ....
    ]
})
```

Then you can use it in your views by injecting it. Go back to **list.ts**

```typescript=
import { APIService } from '../../services/APIService'

...

export class ListPage {

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private itemsAPI: APIService) {}
  
}
```

What we've done here is asking for `APIService` to be injected in our page as `itemsAPI`.

Now we can use it instead of the **fake data**

```typescript=
ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
    this.itemsAPI.listItems().subscribe(
      data => this.items = data,
      err => console.error('Oops in API', err),
      () => console.log('Item API responded')
    );
}
```

Now when the view is started, it call the `APIService#listItems()` method and put the result in `this.items`.

## Add local storage

Ok, now we have a simple case, let's complicate it with something local, like add a *flag* on an item. 
The API doesn't allow a method for that, and it is just for you, so do it with local storage.


### Plugin

Cordova/Ionic provide [`Storage` from `@ionic/storage`](https://ionicframework.com/docs/storage/) to do that!

Follow the instructions to install it.

### Service

Now what we want is another service, but here let's call it **StorageService.ts**

```typescript=
@Injectable()
export class StorageService {
 
    constructor(private storage: Storage) {
 
    }

    public isFav(item: any): Observable<boolean> {
        
    }
 
    public favItem(item: any, isFav: boolean): Observable<any> {
        
    }
}
```

Problem, `Storage#get` and `Storage#set` will return `Promise` and not `Observable`.
But we started using `Observable` in the other service and it is a common pattern. 

So we'll need to transform our `Promise` into `Observable`

```typescript=
import 'rxjs/add/observable/fromPromise';
import { Observable } from "rxjs/Observable";
```
```typescript=
public isFav(item: any): Observable<boolean> {
    return Observable.fromPromise(this.storage.get(item.name));
}
 
public favItem(item: any, isFav: boolean): Observable<any> {
    return Observable.fromPromise(this.storage.set(item.name, isFav));
}
```

And here we go, we can use it. 
But to do that, the user neets a way to fav and unfav items.

This is user interaction.

## Add user interaction

Let's go back into our **detail.ts** page.

We want to fav the item when some iteraction is done on the view.

So let's create a method like `toggleFav()` that will be triggered.

```typescript=
export class DetailsPage {

    isFav: boolean;

    toggleFavorite() {
    }

}
```

The `item` was given in parameter and we've added it as a property of our page.
In order to set it as a favorite, let's add a property.

Now how can we trigger the method.

Just add a button in the **details.html**

```htmlmixed=
<button ion-button clear icon-only (click)="toggleFavorite()">
    <ion-icon name="{{ isFav ? 'heart' : 'heart-outline' }}"></ion-icon>
</button>
```

As simple as that, when the button is `click`ed we trigger the call to `toggleFavorite` and there is an icon that change with the value of `isFav`.

Now what to do in `toogleFavorite`, let's use our `StorageService` to update the value.

```typescript=
toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.isFav;
    this.isFav = !oldFav
    this
      .storageService
      .favItem(this.item, isFav)
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.isFav = oldFav;
        }
      )
}
```

Here we are! When `toogleFavorite` is called, we change the value of `isFav`, update it in the storage, if there is a problem, we reset the value. 

> Note that we can initialize `isFav` the sameway at screen load. 

## Add a repository

So now, to sum up, we have

* An API that provides items
* A storage that provides additional data on items
* A list screen
* A detailed screen

Now there are some issues with this archi

* Screens must be aware of API and Storage services and to some business work
* List is not able to display fav info without doing storage request for each item (business again)

A way to fix it is to use a **repository**. 

A **repository** is a **service** that will do all the **data access business** for us (and by us I mean the pages). 

This **repository** will need access to `APIService` and to `StorageService` and will use them to provide a set of accesses to items.


So let's create `ItemService.ts` and inject it `APIService` and `StorageService`.

```typescript=
import { Injectable } from '@angular/core';

import { APIService } from './APIService';
import { StorageService } from './StorageService';

@Injectable()
export class PonyService {

    constructor(private api: APIService, private storage: StorageService) {

    }
    
}
```

We have to do 2 things with this service:

* List all the items (with the fav information)
* Change the fav information for an item

So 2 methods:

* `listItems(): Observable<any[]>`
* `favItem(item: any, isFav: boolean): Observable<void>`

Here we go. 

### `listItems()`

`listItems` will have to

* Fetch the items on the API
* For each of them, find if there is a fav or not
* Add this info to the item
* Return the list of new items

You'll need some rx operators to import
```typescript=
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/mergeMap';
```

And so

```typescript=
public listItems(): Observable<any[]> {
    return this.api
        .allItems() // Find all on the API
        .flatMap(x => x) // Iterate
        .flatMap(item => {
            // For each item, find the fav flag in storage
            // Add it to the item
            // Return the new item
            return this.storage
                .isFav(item)
                .map(isFav => {
                    item['isFav'] = isFav;
                    return item;
                })
            // This will replace the item by the one returned. 
            // The one with the isFav flag
        })
        .toArray() // Merge all items
}
```

### `favItem(item, isFav)`

Simpler, just update the fav

```typescript=
public favItem(item: any, isFav: boolean): Observable<void> {
    return this.storage.favItem(item, isFav)
}
```

### Use it

Once our service is done, we can use it to replace the use of our 2 old services.

Declare it everywhere you need and replace calls in  **list.ts**

```typescript=
ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
    this.itemsAPI.listItems().subscribe(
      data => this.items = data,
      err => console.error('Oops in API', err),
      () => console.log('Item API responded')
    );
}
```
is now
```typescript=
ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
    this.itemService.listItems().subscribe(
      data => this.items = data,
      err => console.error('Oops in API', err),
      () => console.log('Item API responded')
    );
}
```
No big deal, but in `this.items` we have the `isFav` information added!

And in **details.ts** the item is given in parameters, so we don't need to initialize `isFav` anymore.
In fact we don't need `isFav` anymore as it is part of our model.

```typescript=
toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.isFav;
    this.isFav = !oldFav
    this
      .storageService
      .favItem(this.item, isFav)
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.isFav = oldFav;
        }
      )
}
```
is now
```typescript=
toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.item['isFav'];
    this.item['isFav'] = !oldFav
    this
      .itemService
      .favItem(this.item, this.item['isFav'])
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.item['isFav'] = oldFav;
        }
      )
}
```

No more `isFav` property. No need to know it is in storage and not in api. 

Don't forget to change your **details.html**

from:
```htmlmixed=
<button ion-button clear icon-only (click)="toggleFavorite()">
    <ion-icon name="{{ isFav ? 'heart' : 'heart-outline' }}"></ion-icon>
</button>
```
to:
```htmlmixed=
<button ion-button clear icon-only (click)="toggleFavorite()">
    <ion-icon name="{{ item.isFav ? 'heart' : 'heart-outline' }}"></ion-icon>
</button>
```

## Add custom component

Here the pages items are simple.
Now lets imagine we want to add the fav information on the list.

We could do it this way:

```htmlmixed=
<ion-list>
    <ion-item *ngFor="let item of items" (click)="showItem(item)" ion-item>
      <ion-avatar item-start>
        <img src="{{ item.avatar_url }}">
      </ion-avatar>
      <h2>{{ item.name }}</h2>
      <ion-icon name="{{ item.isFav ? 'heart' : 'heart-outline' }}" item-end color="primary"></ion-icon>
    </ion-item>
</ion-list>
```

But it looks complicated. What if we could write

```htmlmixed=
<ion-list>
    <list-custom-item *ngFor="let item of items" [item]="item" (click)="showItem(item)">
    </list-custom-item>
</ion-list>
```

Well we can. (Don't look at `[item]="item"` we'll explain.)

For that, we need to create a component, and, wait, there is a command for that

```bash
ionic generate component listCustomItem
```

It will create a folder **compontents** inside **app** folder. 

This is the compontent we're going to use.

Have a look at **src/components/list-custom-item**

**list-custom-item**
 |- **list-custom-item.html**
 |- **list-custom-item.scss**
 |- **list-custom-item.ts**
 
It's just like **pages** and works the same way. 

More, a file **src/components/components.module.ts** has been added.
The idea is instead of adding all the compontents one by one, it add them in a module called components and we provide the module in our app.

It a kind of package of components.

So add it in **app.module.ts** in the `imports`

```typescript=
...
import { ComponentsModule } from '../components/components.module'

@NgModule({
...
    imports: [
        ...
        ComponentsModule
    ]
})
```

This way you can use your components in the app. 

More, to be able to use it in the ionic mode. We need to declare the fact that it is part of an ionic module.

So in **components.module.ts** import `IonicModule`

```typescript=
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ListCustomItemComponent } from './list-custom-item/list-custom-item';
@NgModule({
	declarations: [ListCustomItemComponent],
	imports: [IonicModule],
	exports: [ListCustomItemComponent]
})
export class ComponentsModule {}
```

Now lets build our compontent itslef. Back to **src/components/list-custom-item**

Fill the **list-custom-item.html** with the body of our row.

```typescript=
<ion-item ion-item>
  <ion-avatar item-start>
    <img src="{{ item.avatar_url }}">
  </ion-avatar>
  <h2>{{ item.name }}</h2>
  <ion-icon name="{{ item.isFav ? 'heart' : 'heart-outline' }}" item-end color="primary"></ion-icon>
</ion-item>
```

> Note we have removed the `click` and the `for` directive. Because it is the list that manage that. Not the component itself which is a JUST a row that displays data about an item.

So, now let's open the **list-custom-item.ts** there is nothing about an `item` property.

We need to declare the fact that we expect a property `item` from the one who uses us.
For that, we use the `@Input` keyword.

```typescript=
import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-custom-item',
  templateUrl: 'list-custom-item.html'
})
export class ListCustomItemComponent {

  @Input("item") item: any;
  
  constructor() {
    console.log('Hello ListCustomItemComponent Component');
  }

}

```

> Look at the selector, it used to know the html tag to use and the style we can add!

There we go. When our component will be invoked, with an `item` parameter, it will display our row.

We just have to update the **list.html** like we did above and it will rocks.