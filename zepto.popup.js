/**
 * @name: zepto.popUp
 * @description: 基于Zepto或jQuery的弹窗插件，支持webkit内核手机高级浏览器
 * @usage: $.popUp({opts}) => $popUpElement
 * @options:
 *      position: {String} 默认为'center' 'left-top' 左上 'top-center' 上中 'right-top' 右上 'right-center' 右中 'right-bottom' 右下 'bottom-center' 下中 'left-bottom' 左下 'left-center' 左中 'center' 居中
 *      animation: {Object || Boolean || Function } 默认为 { popUp: { duration: 300, easing: 'ease-in'}, shade: { duration: 300, easing: 'ease-in' } } false时为不采用动画; 若为Object时, 比较popUp或shade，popUp或shade为Function时，在弹窗时回调该函数，并分别传入参数$popUp对象和$shade对象；若popUp与shade也为对象时，popUp和shade的参数与Zepto的animate方法的参数一致，参考 http://zeptojs.com/#animate
 *
 *          duration: {String || Number} 默认400，动画持续时间，'fast'为200ms，'slow'为 600ms
 *          easing: {String} 默认'linear'，动画缓动效果 'ease' 'linear' 'ease-in' 'ease-out' 'ease-in-out' 'cubic-bezier(...)'
 *          complete: {Function} 默认undefined 动画完成回调函数
 *      aniProperties: {Object} 默认为 { popUp: { opacity: .8 }, shade: { opacity: .8 } } 分别定义弹窗popUp与shade遮罩层在动画时的目标样式
 *      isScrollMove: {Boolean} 默认false 是否禁用掉scroll，在弹出的时候
 *      tmpl: {Object || String} 默认{close: true, title: 'test title', body: 'it works'} 如果是字符串，则直接作为弹窗内容，如果是对象
 *          close: {Boolean} 默认为true 显示关闭按钮
 *          title: {String || Boolean} 默认为'test title' 弹窗标题
 *          body: {String || Boolean} 默认为'it works' 弹窗内容
 *      zIndex: {Number} 默认为2 设置弹窗z-index 最小为2
 *      autoPop: {Boolean} 默认为false 是否自动打开
 *      shade: {Boolean} 默认为true 显示遮罩层
 *      destory: {Boolean || Function} 默认为false 弹窗消失时的回调函数，参数为$popUp与$shade
 * @method:
 *      pop: 弹出
 *      destory: 消失
 *
 * @example:
 *      /*-----------
 *       * 简单使用
 *       *-----------/
 *       var $pop = $.popUp();
 *
 *       /*------------
 *        * 自定义动画属性
 *        *------------/
 *       var $pop = $.popUp({
 *
 *           // 自定义弹窗的背景色
 *           aniProperties: {
 *               popUp: {
 *                   background: 'red'
 *               }
 *           }
 *       });
 *
 *       /*------------
 *        * 自定义弹窗内容0
 *        *------------/
 *        var $pop = $.popUp({
 *           tmpl: {
 *               close: false,
 *               title: 'oh~ nobody nobody but title'
 *           }
 *        });
 *
 *       /*------------
 *        * 自定义弹窗内容1
 *        *------------/
 *       var $pop = $.popUp({
 *           shade: false,   // 不显示遮罩层
 *           position: 'left-center',    // 位置为“左中”
 *           tmpl: 'hahahaha <h1>shit</h1> ugly'
 *       });
 *
 *       /*------------
 *        * 自定义动画函数
 *        *------------/
 *       var $pop = $.popUp({
 *           autoPop: true,  // 自动打开
 *           position: 'bottom-center',  // 位置为“下中”
 *           // 自定义动画函数
 *           animation: {
 *               popUp: function($popUp) {
 *                   var $popContent = $popUp.find('.pop-content');
 *                   $popUp.css({'z-index': 2});
 *
 *                   setTimeout(function() {
 *                       // $popContent.css('bottom', 0)
 *                       $popContent.css('-webkit-transform', 'translateY(0)')
 *                   }, 0);
 *
 *               },
 *               shade: function($shade) {
 *                   $shade.css({display: 'block', 'opacity': .8});
 *               }
 *           },
 *           // 自定义弹窗消失方法
 *           destory: function($popUp) {
 *               $popUp.find('.pop-content').attr('style', '');
 *           }
 *       });
 *
 * @return $popUp 构建的弹窗对象
 */
;(function($, win, doc, undefined) {
    function popUp(opts) {
        var tmpl = {
                close: true,
                title: 'test title',
                body: 'it works'
            },
            animation = {
                popUp: {
                    duration: 300,
                    easing: 'ease-in'
                },
                shade: {
                    duration: 300,
                    easing: 'ease-in'
                }
            },
            aniProperties = {
                popUp: {
                    opacity: .8
                },
                shade: {
                    opacity: .8
                }
            },
            settings = $.extend({
                position: 'center',
                animation: animation,
                aniProperties: aniProperties,
                isScrollMove: false,
                tmpl: tmpl,
                zIndex: 2,
                autoPop: false,
                shade: true,
                destory: false
            }, opts),
            defaultCSS = '.shade { opacity: 0; position: absolute; top: 0; left: 0; bottom: 0; right: 0; height: 100%; z-index: 1; background: rgba(0, 0, 0, .8) center center no-repeat; display: none; -webkit-user-select: none; -webkit-user-drag: none; } .pop-wrapper { opacity: 0; position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: -webkit-box; display: -ms-box; display: -moz-box; display: -o-box; z-index: 0; display: none; } .pop-content { background: #F7F7F6; border: 1px solid rgba(0, 0, 0, 0.25); border-radius: 3px; position: relative; z-index: 999; -webkit-user-select: none; -webkit-user-drag: none; } .pop-close { font-size: 1.2em; border-radius: 1em; color: #000; position:absolute; right: -0.5em; top:-0.5em; background: #F7F7F6; width:1.2em; line-height:1.2em; text-align:center; } .pop-close:hover { color: red; } .pop-doc { padding: 8px 8px 12px; text-align:center; } .pop-title { height: 50px; line-height: 50px; font-size: 16px; text-align: center; background: #348DA7; color: #fff; font-weight: 700; -webkit-border-radius: 3px 3px 0 0; }',
            $shade = $('#shade'),
            $body = $(doc.body).prepend('<style>' + generateStyle(defaultCSS, settings) + '</style>'),
            $popUp,
            template = '';

        if (settings.shade && !$shade.length)
            $shade = $('<div id="shade" class="shade" style=""></div>').appendTo($body);

        if ($.isPlainObject(settings.tmpl)) {
            template += '<div class="pop-content">';
            if (settings.tmpl.close)
                template += '<div class="pop-close">✖</div>';
            if (settings.tmpl.title)
                template += '<div class="pop-title">' + settings.tmpl.title + '</div>';
            if (settings.tmpl.body)
                template += '<div class="pop-doc">' + settings.tmpl.body + '</div>'
            template += '</div>';
        } else {
            template = '<div class="pop-content">' + settings.tmpl + '</div>';
        }

        $popUp = $('<div class="pop-wrapper">' + template + '</div>').appendTo($body);

        $.extend($popUp, {
            pop: function() {
                if (settings.animation) {
                    if ($.isFunction(settings.animation.popUp)) {
                        settings.animation.popUp($popUp);
                    } else {
                        $popUp.css({display: '-webkit-box', 'z-index': settings.zIndex || 2})
                            .animate( $.extend(aniProperties.popUp, settings.aniProperties.popUp), $.extend(animation.popUp, settings.animation.popUp) );
                    }

                    if ($.isFunction(settings.animation.shade) && settings.shade) {
                        settings.animation.shade($shade);
                    } else {
                        $shade.css({display: 'block'})
                            .animate( $.extend(aniProperties.shade, settings.aniProperties.shade), $.extend(animation.shade, settings.animation.shade));
                    }

                    if (!settings.isScrollMove)
                        $(win).on('scroll,touchmove', eventHandler);
                } else {
                    settings.shade && $shade.show();
                    $popUp.css({display: '-webkit-box', 'z-index': settings.zIndex || 2, opacity: .8});
                }


            },
            destroy: function() {
                $shade.attr('style', '');
                $popUp.attr('style', '');
                if (!settings.isScrollMove)
                    $(win).off('scroll,touchmove', eventHandler);

                if (settings.destory && $.isFunction(settings.destory))
                    settings.destory($popUp, $shade);
            }
        });

        $popUp.on('click', function(e) {
            if (!$(e.target).closest('.pop-content').length
                || e.target.className == 'pop-close') {
                $popUp.destroy();
            }
        });

        settings.autoPop && $popUp.pop();

        return $popUp;
    }

    function eventHandler(e) {
        e.preventDefault;
    }

    function generateStyle(src, opts) {
        src += '.pop-wrapper {';

        switch(opts.position) {
            case 'left-top':
                src += prefixStyle('box-align: start;') + '} .pop-content{ margin-right: auto; }';
                break;
            case 'top-center':
                src += prefixStyle('box-align: start;') + '} .pop-content{ margin-right: auto; margin-left: auto; }';
                break;
            case 'right-top':
                src += prefixStyle('box-align: start;') + '} .pop-content{ margin-left: auto; }';
                break;
            case 'right-center':
                src += prefixStyle('box-align: center;') + '} .pop-content{ margin-left: auto; }';
                break;
            case 'right-bottom':
                src += prefixStyle('box-align: end;') + '} .pop-content{ margin-left: auto; }';
                break;
            case 'bottom-center':
                src += prefixStyle('box-align: end;') + '} .pop-content{ margin-right: auto; margin-left: auto; }';
                break;
            case 'left-bottom':
                src += prefixStyle('box-align: end;') + '} .pop-content{ margin-right: auto; }';
                break;
            case 'left-center':
                src += prefixStyle('box-align: center;') + '} .pop-content{ margin-right: auto; }';
                break;
            default:
                src += prefixStyle('box-align: center;') + '} .pop-content{ margin-left: auto; margin-right: auto;}';
                break;
        }

        return src;
    }

    function prefixStyle(ori) {
        return '-webkit-' + ori + '-ms-' + ori + '-moz-' + ori + '-o-' + ori;
    }

    $.extend($, {
        popUp: popUp
    });
})(Zepto || jQuery, window, document);

