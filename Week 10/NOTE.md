
# 1. 排版 | 根据浏览器属性进行排版

- 主次排版方式 可以省略很多的判断逻辑(if-else)

|name| Main Axis | Cross axis|
|----| --------- | ----------|
|flex-direction:row | width x left right| height y top bottom|
| flex-direction:column | height y top bottom |width x left right|

主要是完成对CSS属性（flexDirection wrap 的具体属性width height top bottom）的抽象(main cross上相关的属性)