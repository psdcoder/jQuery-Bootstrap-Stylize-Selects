(function($){
    var options,
        namespace = 'stylizedSelect',
        defaults = {
            width: 'auto',
            maxShow: 'auto',
            click: null
        };

    var protectedMethods = {
        bindHandlers: function(){
//            var $container = $('.' + options.containerClass);

//            $container.on('blur' + '.' + namespace, '.' + options.inputClass, function(){
//                var $this = $(this);
//
//                $this.prop('disabled', true);
//                $this.parent().removeClass(options.focusedContainerClass);
//
//                if(options.afterEdit !== null && typeof options.afterEdit === 'function'){
//                    options.afterEdit($this.val());
//                }
//            });
//
//            $container.on('click' + '.' + namespace, '.' + options.rightMenuClass, function(){
//                var $this = $(this),
//                    $input = $this.siblings('.' + options.inputClass);
//
//                if(options.beforeEdit !== null && typeof options.beforeEdit === 'function'){
//                    options.beforeEdit($input.val());
//                }
//
//                $input.prop('disabled', false).focus();
//                $this.parent().addClass(options.focusedContainerClass);
//            });
        }
    };

    var methods = {
        init : function( params ) {
            options = $.extend(defaults, params);

            this.each(function(){
                var $this = $(this),
                    data = $this.data(namespace);

                if (!data) {
                    $this.data(namespace, {
                        initialized: true
                    });

                    var $childrens = $this.children();
                }
            });

//            <div class="btn-group stylized-select">
//                <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
//                    <span class="current-value">sky.fm</span>
//                    <span class="btn btn-warning caret-block"><span class="caret"></span></span>
//                </button>
//                <ul class="dropdown-menu items-warning">
//                    <li><a data-value="archer-soft.com">archer-soft.com</a></li>
//                    <li><a data-value="dimalinaWOW">dimalinaWOW</a></li>
//                    <li><a data-value="agayun">agayun</a></li>
//                    <li><a data-value="Google">Google</a></li>
//                    <li><a data-value="test">test</a></li>
//                    <li class="optgroup-header"><a data-value="sky.fm">sky.fm</a></li>
//                    <li><a data-value="archer-soft.com">archer-soft.com</a></li>
//                    <li><a data-value="dimalinaWOW">dimalinaWOW</a></li>
//                    <li><a data-value="agayun">agayun</a></li>
//                    <li><a data-value="Google">Google</a></li>
//                    <li><a data-value="test">test</a></li>
//                    <li><a data-value="APP">APP</a></li>
//                    <li class="disabled"><a data-value="APP/Computing">APP/Computing</a></li>
//                    <li><a data-value="App notiffication">App notiffication</a></li>
//                    <li><a data-value="Computing">Computing</a></li>
//                    <li><a data-value="demo2(at)dimalina.com">demo2(at)dimalina.com</a></li>
//                    <li><a data-value="Gadget">Gadget</a></li>
//                    <li><a data-value="some new label">some new label</a></li>
//                </ul>
//            </div>


            protectedMethods.bindHandlers();
            return this;
        },
        val: function(){

        },
        addItem: function(){

        },
        removeItem: function(){

        },
        hide: function(){

        },
        show: function(){

        },
        disable: function(){

        },
        enable: function(){

        },
        destroy : function( ) {
            return this.each(function(){
                var $this = $(this);
            })

        }
    };

    $.fn.stylizeSelects = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method with name "' +  method + '" don\'t exists' );
        }
    };
})(window.jQuery);