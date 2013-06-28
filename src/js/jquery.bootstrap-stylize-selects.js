(function($){
    var options,
        namespace = 'stylizedSelect',
        defaults = {
            width: 'auto',
            maxHeight: 'auto',
            after: null
        };

    var protectedMethods = {
        bindHandlers: function(){
            var $container = $('.' + options.containerClass);

            $container.on('blur' + '.' + namespace, '.' + options.inputClass, function(){
                var $this = $(this);

                $this.prop('disabled', true);
                $this.parent().removeClass(options.focusedContainerClass);

                if(options.afterEdit !== null && typeof options.afterEdit === 'function'){
                    options.afterEdit($this.val());
                }
            });

            $container.on('click' + '.' + namespace, '.' + options.rightMenuClass, function(){
                var $this = $(this),
                    $input = $this.siblings('.' + options.inputClass);

                if(options.beforeEdit !== null && typeof options.beforeEdit === 'function'){
                    options.beforeEdit($input.val());
                }

                $input.prop('disabled', false).focus();
                $this.parent().addClass(options.focusedContainerClass);
            });
        }
    };

    var methods = {
        init : function( params ) {
            options = $.extend(defaults, params);

            this.each(function(){
                var $this = $(this),
                    $element = $this.clone(true),
                    data = $this.data(namespace);

                if (!data) {
                    $element.data(namespace, {
                        editable : true
                    });
                }
            });

            protectedMethods.bindHandlers();
            return this;
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