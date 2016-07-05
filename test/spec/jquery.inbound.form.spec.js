( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.module( "jQuery Inbound Form", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {

		assert.equal( typeof $.fn.inboundform, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.inboundform, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.inboundform().on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.inboundform();
		assert.ok(
			$fixture.data( "plugin_inboundform" ),
			"has cached it into a jQuery data"
		);
	} );

	QUnit.test( "enable custom config", function( assert ) {
		$fixture.inboundform( {
      token: "62bb61431348e22850828a5829c4373faafe29c1",
      secret: "51a266c2844ccd5cac83d88de88d82d05358aa51",
      modal: false,
      fields: {
        select: ["TEST", "SC", "SP", "RS"],
        radio: ["Iniciante", "Intermediário", "Avançado", "Ninja"]
      }
		} );

		var pluginData = $fixture.data( "plugin_inboundform" );

		assert.deepEqual(
			pluginData.settings,
			{
        token: "62bb61431348e22850828a5829c4373faafe29c1",
        secret: "51a266c2844ccd5cac83d88de88d82d05358aa51",
        modal: false,
        fields: {
          select: ["TEST", "SC", "SP", "RS"],
          radio: ["Iniciante", "Intermediário", "Avançado", "Ninja"]
        }
			},
			"extend plugin settings"
		);

	} );

	QUnit.test( "changes the element text", function( assert ) {
		$fixture.inboundform();

		assert.equal( $fixture.text(), "jQuery Inbound Form" );
	} );

	QUnit.test(
		"has #yourOtherFunction working as expected",
		function( assert ) {
			$fixture.inboundform();

			var instance = $fixture.data( "plugin_inboundform" ),
				expectedText = "foobar";

			instance._BuiderForm( expectedText );
			assert.equal( $fixture.text(), expectedText );
		}
	);

}( jQuery, QUnit ) );
