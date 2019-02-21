# cascade-dropdownlist

# Usage
```
<cascade-dropdownlist
    [options]="options"
    (modelChange)="onModelChange($event)">
</cascade-dropdownlist>
```

### @input 属性
##### options：
> 说明：数据源  
> 类型：Array<{ label: string, value: string, disabled?: boolean }>  
> ps: `disabled`为`true`时禁用当前项
##### model: 
> 说明：默认绑定值，数组，每一项是数据中每一层的 value  
> 类型：Array<string>
##### placeholder：
> 说明：输入框占位文本  
> 类型：string  默认 `请选择`
##### disable：
> 说明：是否禁用选择  
> 类型：boolean 默认 `false`
##### clearable：
> 说明：是否支持清空选项  
> 类型：boolean 默认 `false`
##### fullLevels：
> 说明：是否显示完整的选中值  
> 类型：boolean 默认 `true`
##### changeOnSelect：
> 说明：选择任意一级的选项立即得到反馈  
> 类型：boolean 默认 `false`
##### touchUi：
> 说明：是否为触摸模式  
> 类型：boolean 默认 `false`
### @output属性
modelChange：返回当前选中的value数组
### 实例方法
##### close 主动关闭级联下拉选择
