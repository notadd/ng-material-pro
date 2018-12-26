# NgMaterial2

Angular material2 Extension Components ..


It will be like : https://vuetifyjs.com/zh-Hans/components/alerts

**[中文说明](README_zh.md)**

### Step 1: Install and configure Angular Material
  [Getting Started Guide](https://material.angular.io/guide/getting-started) with Angular Material
### Step 2: Install Notadd NgMaterial2
```shell
  ng add @notadd/ng-material2
```

### Step 3: Import the component modules
```TypeScript
  import { NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule } from '@notadd/ng-material2';
  
  @NgModule({
    ...
    imports: [ NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule ],
    ...
  })
  export class AppModule { }
```

## Contribution Description

We welcome material2 users to participate in the development of this plugin, and as a contributor, please follow the following guidelines: -Code submission specification, refer to [Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
-Always from develop checkout a new branch, the naming specification for feature/xxx,xxx must be readable, such as: Icons => feature/icons
-Pull the latest code for the remote develop branch in the local develop branch before the new branch of checkout

-Refer to the project's current naming rules for file naming rules.

## function Development Check Roadmap first to make sure that the features you want to contribute are not being implemented.

Then submit a contribution request in**issue**indicating the features you want to contribute.

## Find Bugs? If you find a bug in the source code, please submit a bug question in the**issue**of this warehouse first.

After you have submitted the bug question, we are happy to accept that you submit a**pr**to help us fix the bug.

## QQ Communication Group

321735506, please specify the purpose of the group!

### Roadmap

- [ ] Icons+✔

**Layout**

- [ ] Preset layout**ANIMATION**

**ui Component **

-[ ] Prompt box (components/alerts)
-[ ] Rotation (components/carousels)

-[ ] Footer (Components/footer)

Button:
-[ ] Item group (item-groups)
-[ ] multi-level linkage ✔
-[ ] multi-Window (components/windows)-[] hover (components/hover)
-[ ] upload "file upload, image upload, avatar upload"
-[ ] Parallax (Components/parallax)
-[ ] Rating (components/ratings)
-[ ] Timeline (components/timelines) -[] Drag and drop tree view "lag"

