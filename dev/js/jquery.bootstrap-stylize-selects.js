(function ($) {
    var options,
        defaults = {
            width: 'auto', // 'auto' - means displays as inline-block || 'block' - displays as block element || '100px' - size
            dropdownMaxHeight: 'auto', // 'auto' || '200px' - size
            style: null, // 'info' || 'primary' || 'warning' || 'danger' || 'success' || 'inverse'
            notStyleList: false, // stylize also dropdown items or not
            size: null, // 'large', 'small', 'mini'
            onClick: null
        },
        namespace = 'stylizedSelect',
        mainClass = 'stylized-select',
        $currentSelect = null,
        $currentDropdown = null;

    var protectedMethods = {
        buildDropdown: function (elements) {
            var dropdown = document.createElement('ul'),
                additionalDropdownClass = (options.style !== null && !options.notStyleList) ? ' items-' + options.style : '';

            dropdown.className = 'dropdown-menu' + additionalDropdownClass;

            if (options.dropdownMaxHeight !== 'auto') {
                dropdown.style.maxHeight = options.dropdownMaxHeight;
            }

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
                    headerInnerA.innerText = elements[i].label;

                    header.appendChild(headerInnerA);
                    dropdown.appendChild(header);

                    for (var j = 0; j < optgroupLength; j++) {
                        dropdown.appendChild(this.buildOneOption(optgroup[j], optgroupDisabled));
                    }

                    if ((i + 1) < $elementsLength && elements[i + 1].nodeName.toLowerCase() !== 'optgroup') {
                        divider.className = 'divider';
                        dropdown.appendChild(divider);
                    }
                } else {
                    dropdown.appendChild(this.buildOneOption(elements[i]));
                }
            }

            return dropdown;
        },
        buildOneOption: function (option, disabled) {
            var li = document.createElement('li'),
                innerA = document.createElement('a');

            if (option.disabled || disabled) {
                li.className = 'disabled';
            }

            if (option.className !== '' && option.className !== undefined) {
                li.className = (li.className !== '' ? li.className + ' ' : '') + option.className;
            }

            innerA.setAttribute('data-value', option.value);
            innerA.innerText = option.innerText;
            innerA.tabIndex = (option.disabled || disabled) ? -1 : 0;

            li.appendChild(innerA);

            return li;
        },
        buildOneClearOption: function (optionData) {
            var option = document.createElement('option');

            if (optionData.innerText) {
               option.innerText = optionData.innerText;
            }

            if (optionData.disabled) {
                option.disabled = true;
            }

            if (optionData.className) {
                option.className = optionData.className;
            }

            if (optionData.value) {
                option.value = optionData.value;
            }

            return option;
        },
        bindHandlers: function () {
            var $newSelect = $('.' + mainClass),
                $dropdown = $('.dropdown-menu', $newSelect);

            $dropdown.on('click' + '.' + namespace, 'a', function (e) {
                var $this = $(this),
                    $parent = $this.parent(),
                    $parentNewSelect = $parent.parents('.' + mainClass);

                if (!$parent.hasClass('disabled') && !$parent.hasClass('optgroup-header')) {
                    $('.current-value', $parentNewSelect).text($this.text());

                    $parentNewSelect.prev('select').val($this.data('value'));
                } else {
                    e.stopPropagation();
                }

                if (typeof options.onClick) {
                    options.onClick.call($this[0], e);
                }
            });

            //for select items from keyboard
            $dropdown.on('keyup' + '.' + namespace, 'a', function(e) {
                var code = e.which;
                if (code === 13) {
                    $(this).trigger('click');
                }
            });
        },
        getItemByValue: function(context, value) {
            if (!$.isArray(value)) {
                return $('a[data-value="' + value + '"]', $currentDropdown)[0];
            } else {
                var tempArray = [],
                    valuesLength = value.length;

                for (var i = 0; i < valuesLength; i++) {
                    tempArray.push($('a[data-value="' + value[i] + '"]', $currentDropdown)[0]);
                }
                return tempArray;
            }
        },
        checkOnSelected: function(value) {
            if ($currentSelect.val() === value) {
                var $option = $('option:first', $currentSelect);
                $option.prop('selected', true);
                $('.current-value', $currentDropdown).text($('a[data-value="' + $option.attr('value') + '"]', $currentDropdown).text());
            }
        },
        setCurrentDropdown: function() {
            $currentSelect = $(this);
            $currentDropdown = $(this.next('.' + mainClass)[0]);
        }
    };

    var methods = {
        init: function (params) {
            options = $.extend(defaults, params);

            this.each(function () {
                var $this = $(this),
                    data = $this.data(namespace);

                if (!data) {
                    $this.data(namespace, {
                        initialized: true
                    });

                    var mainContainer = document.createElement('div'),
                        dropdownToggle = document.createElement('button'),
                        currentValue = document.createElement('span'),
                        dropdownToggleButton = document.createElement('div'),
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
                    currentValue.innerText = $('option[value="' + $this.val() + '"]', $this).text();

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
        val: function (value) {
            if (value ===  undefined || typeof value !== 'string') {
                return this.val();
            } else {
                var $a  = $(protectedMethods.getItemByValue(this, value));

                if ($a.length > 0) {
                    this.val(value);
                    $('.current-value', $currentDropdown).text($a.text());
                }
            }
        },
        add: function (option, after) {
            if ($.isPlainObject(option)) {
                option = [option];
            }

            if ($.isArray(option)) {
                var bufferLIs = document.createDocumentFragment(),
                    bufferOptions = document.createDocumentFragment();

                $.each(option, function(i, e) {
                    bufferLIs.appendChild(protectedMethods.buildOneOption(e));
                    bufferOptions.appendChild(protectedMethods.buildOneClearOption(e));
                });

                if (after && typeof after === 'string') {
                    var afterItemDropdown = $('a[data-value="' + after + '"]', $currentDropdown).parent('li')[0],
                        afterParentDropdown = afterItemDropdown.parentNode,
                        afterItemSelect = $('option[value="' + after + '"]', $currentSelect)[0],
                        afterParentSelect = afterItemSelect.parentNode;

                    afterParentDropdown.insertBefore(bufferLIs, afterItemDropdown.nextSibling);
                    afterParentSelect.insertBefore(bufferOptions, afterItemSelect.nextSibling);
                } else {
                    $('.dropdown-menu', $currentDropdown)[0].appendChild(bufferLIs);
                    $currentSelect[0].appendChild(bufferOptions);
                }
            } else {
                $.error('You must pass object or objects array');
            }
        },
        remove: function (value) {
            if (typeof value == 'string') {
                value = [value];
            }

            if ($.isArray(value)) {
                var a  = protectedMethods.getItemByValue(this, value);

                $.each(a, function(i, e) {
                    var $a = $(e),
                        value = $a.data('value');

                    if ($currentSelect.val() === value) {
                        $('option[value="' + value + '"]', $currentSelect).remove();

                        $('.current-value', $currentDropdown).text($('a[data-value="' + $currentSelect.val() + '"]', $currentDropdown).text());
                        $a.remove();
                    } else {
                        $('option[value="' + value + '"]', $currentSelect).remove();
                        $a.remove();
                    }
                });
            } else {
                $.error('You must pass value(s) which must be hided');
            }
        },
        hide: function (value) {
            if (typeof value == 'string') {
                value = [value];
            }

            if ($.isArray(value)) {
                var a  = protectedMethods.getItemByValue(this, value);

                $.each(a, function(i, e) {
                    var $a = $(e);

                    $a.attr('tabIndex', -1);
                    $a.parent('li').hide();

                    protectedMethods.checkOnSelected($a.data('value'));
                });
            } else {
                $.error('You must pass value(s) which must be hided');
            }
        },
        show: function (value) {
            if (typeof value == 'string') {
                value = [value];
            }

            if ($.isArray(value)) {
                var a  = protectedMethods.getItemByValue(this, value);

                $.each(a, function(i, e) {
                    var $a = $(e);

                    $a.attr('tabIndex', 0);
                    $a.parent('li').show();
                });
            } else {
                $.error('You must pass value(s) which must be showed');
            }
        },
        disable: function (value) {
            if (typeof value == 'string') {
                value = [value];
            }

            if ($.isArray(value)) {
                var a  = protectedMethods.getItemByValue(this, value);

                $.each(a, function(i, e) {
                    var $a = $(e);

                    $a.attr('tabIndex', -1);
                    $a.parent('li').addClass('disabled');

                    protectedMethods.checkOnSelected($a.data('value'));
                });

                $.each(value, function(i , e) {
                   $('option[value="' + e + '"]', $currentSelect).prop('disabled', true);
                });
            } else {
                $.error('You must pass value(s) which must be disabled');
            }
        },
        enable: function (value) {
            if (typeof value == 'string') {
                value = [value];
            }

            if ($.isArray(value)) {
                var a  = protectedMethods.getItemByValue(this, value);

                $.each(a, function(i, e) {
                    var $a = $(e);

                    $a.attr('tabIndex', 0);
                    $a.parent('li').removeClass('disabled');
                });

                $.each(value, function(i , e) {
                    $('option[value="' + e + '"]', $currentSelect).prop('disabled', false);
                });
            } else {
                $.error('You must pass value(s) which must be enabled');
            }
        },
        destroy: function () {
            return this.each(function () {
                var $this = $(this);

                $this.next('.' + mainClass).remove();
                $this.data(namespace, null);
                $this.show();
            })

        }
    };

    $.fn.stylizeSelects = function (method) {
        if (methods[method]) {
            protectedMethods.setCurrentDropdown.call(this);
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method with name "' + method + '" don\'t exists');
        }
    };
})(window.jQuery);