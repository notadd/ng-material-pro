# NgMaterialPro

angular  material2 扩展组件

**[English](README.md)**

### Step 1: 安装配置 material

  [Getting Started Guide](https://material.angular.cn/guide/getting-started) with Angular Material
  
### Step 2: 安装 MaterialPro

```shell
  ng add @notadd/ng-material-pro
```

### Step 3: 导入组件模块

```TypeScript
  import { NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule } from '@notadd/ng-material-pro';
  
  @NgModule({
    ...
    imports: [ NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule ],
    ...
  })
  export class AppModule { }
```

## 贡献说明

我们欢迎 material2 使用者来参与这个插件的开发，作为一个贡献者，请您遵循以下原则：

- 代码提交规范，参考 [Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
- 始终从 develop checkout 一个新分支，命名规范为 feature/xxx，xxx 必须具有可读性，如：Icons => feature/icons
- 在 checkout 新分支前，先在本地 develop 分支拉取远程 develop 分支的最新代码
- 文件命名规则请参考项目目前的命名规则。

## 功能开发

请先查阅 Roadmap，确保你想贡献的功能没有正在被实现。然后在 **issue** 里提交一个贡献请求，注明想要贡献的功能。

## 发现 Bug ？

如果你在源码中发现bug，请你先在本仓库的 **issue** 提交一个bug问题。在你提交完bug问题后，我们很乐意接受你提交一个 **PR** 来帮助我们修复这个bug。

## QQ 交流群

321735506，请注明加群目的！

### Roadmap

- [ ] Icons+ ✔

**布局**

- [ ] 预设布局 

**动画**


**UI组件**

- [x] 提示框 (components/alerts) ✔
- [x] 轮播 （components/carousels）✔
- [ ] 页脚 （components/footer）✔

按钮：

- [x] 多级联动 ✔
- [ ] 评级 （components/ratings）
- [ ] 时间线 （components/timelines）
- [x] 穿梭框
- [ ] 可拖拽树视图 【滞后】
