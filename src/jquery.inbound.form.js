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
          select: ["PR","SC","SP","RS"],
          radio: ["Iniciante","Intermediário","Avançado","Ninja"]
        }
			};
    var body = $('body');
    var options ="";
    var radios = "";
    function str2slug(str) {
      var rep = '_';
      str = str.toLowerCase()
        .replace(/\s+/g, rep) // replace whitespace
      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç";
      var to   = "aaaaeeeeiiiioooouuuunc";
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(
          new RegExp(from.charAt(i), 'g'),
          to.charAt(i)
        );
      }
      // remove invalid chars
      str = str.replace(new RegExp('[^a-z0-9'+rep+']',"g"), '')
        .replace(/-+/g, rep); // collapse dashes;
      return str;
    }
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
        if (this.settings !== this._defaults) {
          this.buiderform( this.settings.fields, this.settings.token, this.settings.secret, this.settings.modal  );
        } else {
          this.buiderform( this._defaults.fields, this._defaults.token, this._defaults.secret, this._defaults.modal  );
        }

			},
      buiderform: function( fields, token, secret, modal ) {
        for (var item in fields.select) {
          options += "<option value='"+fields.select[ item ]+"'>"+fields.select[ item ]+"</option>";
        }
        for (var i in fields.radio) {
          var value = fields.radio[i];
          value = str2slug(value);
          radios +=
            "<label class='radio-inline' for='level-"+ i +"'><input name='level' id='level-"+ i +"' value='"+ value +"' type='radio'>" + fields.radio[i] + "</label>" ;
        }
        var initform =
          "<form class='form-horizontal'>" +
          "<fieldset>" +
            "<div class='form-group'>" +
              "<label for='name'>Name</label> " +
              "<input id='name' name='name' placeholder='Name' class='form-control' required='' type='text'> " +
              "<span class='help-block'>Please, insert your name</span> " +
            "</div>" +
            "<div class='form-group'> " +
              "<label for='email'>E-mail</label> " +
                "<input id='email' name='email' placeholder='E-mail' class='form-control input-md' required='' type='email'>" +
                "<span class='help-block'>Please, insert your e-mail</span> " +
            "</div>";
        var selectfield =
          "<div class='form-group'>" +
            "<label for='state'>State</label> " +
              "<select id='state' name='state' class='form-control'>";
                selectfield = selectfield+options;
                selectfield +=
              "</select>" +
          "</div>";
        var radiofield =
          "<div class='form-group'> " +
            "<label for='level'>Level</label> " +
            "<div class=''> ";
          radiofield = radiofield+radios;
          radiofield +=
              "</div>" +
            "</div>";
        var endform =
          "<div class='form-group'> " +
            "<div class='text-center'> " +
            "<button type='submit' id='submit' name='submit' class='btn btn-primary'>Send</button> " +
            "</div> " +
          "</div>" +
          "<input id='token' value='"+token+"' name='token' type='hidden'>" +
          "<input id='secret' value='"+secret+"' name='secret' type='hidden'>" +
          "</fieldset>" +
          "</form>";
          "<div =";
				// some logic
        var form = "";
        form = initform+endform;
        if ( fields.select || fields.radio ) {
          form = initform+selectfield+radiofield+endform;
        }
        var initmodal =
          "<div class='modal fade' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'> " +
              "<div class='modal-header'> " +
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button> " +
                "<h4 class='modal-title'>Inbound Form</h4> " +
              "</div>" +
          "<div class='modal-body'>";
        var endmodal = "</div></div></div></div>";
        if (modal) {
          form = initmodal+form+endmodal;
          if ($(this.element).is('div')) {
            $(this.element).replaceWith('<a class="btn btn-info" data-toggle="modal" data-target="modal" href="#">Quero receber materiais por email</a>');
          }
          $(this.element).attr('data-toggle','modal').attr('data-target','.modal');
          body.append(form);
        } else {
          $(this.element).addClass('container').append(form);
        }
        
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
