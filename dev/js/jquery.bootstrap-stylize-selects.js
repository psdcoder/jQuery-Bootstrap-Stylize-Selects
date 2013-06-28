(function($){
    var options,
        defaults = {
            width: 'auto',
            maxShow: 'auto',
            style: null,
            size: null,
            click: null
        },
        namespace = 'stylizedSelect',
        mainClass = 'stylized-select',
        tabIndex = 0;

    var protectedMethods = {
        buildDropdown: function(elements){
            var dropdown = document.createElement('ul'),
                additionalDropdownClass = !(options.style === null) ? ' items-' + options.style : '';

            dropdown.className = 'dropdown-menu' + additionalDropdownClass;

            var $elementsLength = elements.length;

            for (var i = 0; i < $elementsLength; i++) {
                if (elements[i].nodeName.toLowerCase() === 'optgroup') {
                    var optgroup = elements[i].children,
                        optgroupDisabled = elements[i].disabled,
                        optgroupLength = optgroup.length;

                    var header = document.createElement('li'),
                        headerInnerA = document.createElement('a'),
                        divider = document.createElement('li');

                    header.className = 'optgroup-header';
                    headerInnerA .innerText = elements[i].label;

                    header.appendChild(headerInnerA);
                    dropdown.appendChild(header);

                    for (var j = 0; j < optgroupLength; j++) {
                        dropdown.appendChild(this.buildOneOption(optgroup[j], optgroupDisabled));
                    }

                    divider.className = 'divider';
                    dropdown.appendChild(divider);
                } else {
                    dropdown.appendChild(this.buildOneOption(elements[i]));
                }
            }

            tabIndex = 0;
            return dropdown;
        },
        buildOneOption: function(option, disabled){
            var li = document.createElement('li'),
                innerA = document.createElement('a');

            if (option.disabled || disabled) {
                li.className = 'disabled';
            }

            innerA.setAttribute('data-value', option.value);
            innerA.innerText = option.innerText;
            innerA.tabIndex = ++tabIndex;

            li.appendChild(innerA);

            return li;
        },
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

                    var mainContainer = document.createElement('div'),
                        dropdownToggle = document.createElement('button'),
                        currentValue = document.createElement('span'),
                        dropdownToggleButton = document.createElement('span'),
                        dropdownToggleButtonAdditionalClass = !(options.style === null) ? ' btn-' + options.style : '',
                        dropdownToggleAdditionalClass = '',
                        mainContainerAdditionalClass = '';

                    //check all additional styles
                    switch (options.width) {
                        case 'auto':
                            break;
                        case 'block':
                            mainContainerAdditionalClass = ' btn-group-block';
                            break;
                        default:
                            mainContainer.style.width = options.width;
                    }
                    dropdownToggleAdditionalClass += !(options.size === null) ? ' btn-' + options.size : '';
                    dropdownToggleAdditionalClass += this.disabled ? ' disabled' : '';

                    //set all attributes
                    mainContainer.className = 'btn-group ' + mainContainerAdditionalClass + ' ' + mainClass;

                    dropdownToggle.className = 'btn dropdown-toggle' + dropdownToggleAdditionalClass;
                    dropdownToggle.setAttribute('data-toggle', 'dropdown');

                    currentValue.className = 'current-value';
                    currentValue.innerText = $('option[value="' +$this.val() + '"]', $this).text();

                    dropdownToggleButton.className = 'btn caret-block' + dropdownToggleButtonAdditionalClass;
                    dropdownToggleButton.innerHTML = '<span class="caret"></span>';

                    //construct all
                    dropdownToggle.appendChild(currentValue);
                    dropdownToggle.appendChild(dropdownToggleButton);

                    mainContainer.appendChild(dropdownToggle);
                    mainContainer.appendChild(protectedMethods.buildDropdown($this.children()));

                    $this.hide();
                    $this.after($(mainContainer));
                }
            });

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