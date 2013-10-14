popup
=====

A mini zepto popup plugin focuses on mobile/webkit browsers. Sure, you can call it popup component.

基于Zepto的mini弹窗插件

###features
 * custom the popup's position(left-top top-center center right-top etc. support nine positions)
 * custom popup and shade appearence animations
 * custom popup content and also a default template
 * only 150s lines

###特性
 * 自定义弹窗位置（左上 中上 右上 居中 左下 左中等9个位置）
 * 自定义弹窗和遮罩层出现的动画
 * 自定义弹窗内容并提供一套默认模板
 * 只有150多行

###demo
[http://stupig.me/lab/popup/](http://stupig.me/lab/popup/)

###usage
```javascript
    $.popUp({opts})
```
###example
```javascript
      /*-----------
       * 简单使用
       -----------*/
       var $pop = $.popUp();

       /*------------
        * 自定义动画属性
        ------------*/
       var $pop = $.popUp({

           // 自定义弹窗的背景色
           aniProperties: {
               popUp: {
                   background: 'red'
               }
           }
       });

       /*------------
        * 自定义弹窗内容0
        ------------*/
        var $pop = $.popUp({
           tmpl: {
               close: false,
               title: 'oh~ nobody nobody but title'
           }
        });

       /*------------
        * 自定义弹窗内容1
        ------------*/
       var $pop = $.popUp({
           shade: false,   // 不显示遮罩层
           position: 'left-center',    // 位置为“左中”
           tmpl: 'hahahaha <h1>shit</h1> ugly'
       });

       /*------------
        * 自定义动画函数
        ------------*/
       var $pop = $.popUp({
           autoPop: true,  // 自动打开
           position: 'bottom-center',  // 位置为“下中”
           // 自定义动画函数
           animation: {
               popUp: function($popUp) {
                   var $popContent = $popUp.find('.pop-content');
                   $popUp.css({'z-index': 2});

                   setTimeout(function() {
                       // $popContent.css('bottom', 0)
                       $popContent.css('-webkit-transform', 'translateY(0)')
                   }, 0);

               },
               shade: function($shade) {
                   $shade.css({display: 'block', 'opacity': .8});
               }
           },
           // 自定义弹窗消失方法
           destory: function($popUp) {
               $popUp.find('.pop-content').attr('style', '');
           }
       });
```

###options
- **position**

__{String} 默认为'center'__

'left-top' 左上 'top-center' 上中 'right-top' 右上 'right-center' 右中 'right-bottom' 右下 'bottom-center' 下中 'left-bottom' 左下 'left-center' 左中 'center' 居中

- **animation**

 __{Object || Boolean || Function } 默认为 { popUp: { duration: 300, easing: 'ease-in'}, shade: { duration: 300, easing: 'ease-in' } } __

false时为不采用动画; 若为Object时, 比较popUp或shade，popUp或shade为Function时，在弹窗时回调该函数，并分别传入参数$popUp对象和$shade对象；若popUp与shade也为对象时，popUp和shade的参数与Zepto的animate方法的参数一致，参考 http://zeptojs.com/#animate

<ul>
    <li>**duration**</li>


    <li>__{String || Number} 默认400，动画持续时间__</li>


    <li>'fast'为200ms，'slow'为 600ms</li>


    <li>**easing**</li>


    <li>__{String} 默认'linear'，动画缓动效果__</li>


    <li>'ease' 'linear' 'ease-in' 'ease-out' 'ease-in-out' 'cubic-bezier(...)'</li>


    <li>**complete**</li>


    <li>__{Function} 默认undefined 动画完成回调函数__</li>


    <li>**aniProperties**</li>


    <li>__ {Object} 默认为 { popUp: { opacity: .8 }, shade: { opacity: .8 } } 分别定义弹窗popUp与shade遮罩层在动画时的目标样式__</li>
</ul>

- **isScrollMove**

__{Boolean} 默认false 是否禁用掉scroll，在弹出的时候__

- **tmpl**

 __{Object || String} 默认{close: true, title: 'test title', body: 'it works'} 如果是字符串，则直接作为弹窗内容，如果是对象__

    - **close**

    __{Boolean} 默认为true 显示关闭按钮__

    - **title**

    __ {String || Boolean} 默认为'test title' 弹窗标题__

    - **body**

    __{String || Boolean} 默认为'it works' 弹窗内容__

- **zIndex**

__ {Number} 默认为2 设置弹窗z-index 最小为2__

- **autoPop**

__{Boolean} 默认为false 是否自动打开__

- **shade**

__{Boolean} 默认为true 显示遮罩层__

- **destory**

__{Boolean || Function} 默认为false 弹窗消失时的回调函数，参数为$popUp与$shade__
