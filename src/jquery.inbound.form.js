// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "inboundform",
			defaults = {
        token: "62bb61431348e22850828a5829c4373faafe29c1",
        secret: "51a266c2844ccd5cac83d88de88d82d05358aa51",
        modal: false,
        fields: {
          select: ['PR','SC','SP','RS'],
          radio: ['Iniciante','Intermediário','Avançado','Ninja'],
        }
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
        if (this.settings != this._defaults) {
          this.buiderform( this.settings.fields, this.settings.token, this.settings.secret  );
        } else {
          this.buiderform( this._defaults.fields, this._defaults.token, this._defaults.secret  );
        }
			},
      buiderform: function( fields, token, secret ) {
        //
        var options ='';
        for (var item in fields.select) {
          options += '<option value="'+fields.select[ item ]+'">'+fields.select[ item ]+'</option>';
        }
        var radios = ''
        for (var item in fields.radio) {
          radios +=
            '<label class="radio-inline" for="level-'+ item +'"> ' +
              '<input name="level" id="level-'+ item +'" value="" type="radio">' +
              +fields.radio[ item ]+
            '</label>' ;
        }
        console.log( fields.radio );
        console.log( options + radios );
        var initform = '<form class="form-horizontal">' +
          '<fieldset>' +
            '<legend>Inbound Form</legend>' +
            '<div class="form-group">' +
              '<label class="col-md-4 control-label" for="name">Name</label> ' +
              '<div class="col-md-4"> ' +
              '<input id="name" name="name" placeholder="Name" class="form-control input-md" required="" type="text"> ' +
              '<span class="help-block">Please, insert your name</span> ' +
              '</div> ' +
            '</div>' +
            '<div class="form-group"> ' +
              '<label class="col-md-4 control-label" for="email">E-mail</label> ' +
              '<div class="col-md-4"> ' +
                '<input id="email" name="email" placeholder="E-mail" class="form-control input-md" required="" type="text">' +
                '<span class="help-block">Please, insert your e-mail</span> ' +
              '</div> ' +
            '</div>';

        var selectfield =
          '<div class="form-group">' +
            '<label class="col-md-4 control-label" for="state">State</label> ' +
            '<div class="col-md-4"> ' +
              '<select id="state" name="state" class="form-control"> '
                 ;
        selectfield = selectfield+options;
        selectfield +=
              '</select>' +
            '</div>' +
          '</div>';

        var radiofield =
          '<div class="form-group"> ' +
            '<label class="col-md-4 control-label" for="level">Level</label> ' +
            '<div class="col-md-4"> ' ;
          radiofield = radiofield+radios;
          radiofield +=
              /*'<label class="radio-inline" for="level-0"> ' +
                '<input name="level" id="level-0" value="beginner" checked="checked" type="radio">' +
                'Beginner ' +
              '</label>' +
              '<label class="radio-inline" for="level-1">' +
                '<input name="level" id="level-1" value="intermediate" type="radio">' +
                'Intermediate' +
              '</label>' +
              '<label class="radio-inline" for="level-2">' +
                '<input name="level" id="level-2" value="advanced" type="radio">' +
                'Advanced ' +
              '</label>' +
              '<label class="radio-inline" for="level-3">' +
                '<input name="level" id="level-3" value="ninja" type="radio">' +
                'Ninja' +
              '</label>' +*/
              '</div>' +
            '</div>';
        var endform =
          '<div class="form-group"> ' +
            '<div class="col-md-12"> ' +
            '<button type="submit" id="submit" name="submit" class="btn btn-primary">Send</button> ' +
            '</div> ' +
          '</div>' +
          '<input id="token" value="'+token+'" name="token" type="hidden">' +
          '<input id="secret" value="'+secret+'" name="secret" type="hidden">' +
          '</fieldset>' +
          '</form>';
				// some logic
        var form = '';
        if ( fields.select || fields.radio ) {
          form = initform+selectfield+radiofield+endform;
        }
        $( this.element ).prepend(form);
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
