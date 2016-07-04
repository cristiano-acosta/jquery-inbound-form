#[jQuery Inbound Form Plugin](http://cristiano-acosta.github.io/jquery-inbound-form/)

jQuery Inbound Form  is a simple form generator with JSON API for make Marketing Inbound actions, created by [Cristiano Acosta](https://twitter.com/acostacristiano).
To get started, check out http://cristiano-acosta.github.io/jquery-inbound-form/!

## Table of contents

* [How to Use?](#how-to-use?)
* [Options and Methods](#options-and-methods)
* [Downloading](#downloading)
* [Copyright and license](#copyright-and-license)


## How to Use?

jQuery Inbound Form depends on jQuery. Include them both in end of your HTML code:

```html
<script src="$pathto/jquery.js" type="text/javascript"></script>
<script src="jquery.inbound.form.js" type="text/javascript"></script>
```

### Simple Form

You must alter your HTML code inserting this simple code: 

```html
<div id="integration_form"> </div>
```

And this generate a form. 

Look this demo: [Simple Form](https://github.com/cristiano-acosta/jquery-inbound-form/blob/master/demo/index.html) 

### Modal Form

For jQuery Inbound Form depends bootstrap,  include them both in end of your HTML code:

```html
<script src="$pathto/bootstrap.min.js" type="text/javascript"></script>
```

And insert this simple code:

```html
<a id="integration_form" href="#">Quero receber materiais por email</a>
```

And this generate a form inside a modal

Look this demo: [Modal Form](https://github.com/cristiano-acosta/jquery-inbound-form/blob/master/demo/modal-form.html)

### Other 

Call to plugin use jquery like:

```js
$("#integration_form").inboundform();
```

And this make a form with bootstrap style (optional)

Look this demo:  [Other](https://github.com/cristiano-acosta/jquery-inbound-form/blob/master/demo/other.html)

## Options and Methods

### Options 

```js
	options = { 
		'token':'62bb61431348e22850828a5829c4373faafe29c1',  // API Token  
		'secret':'51a266c2844ccd5cac83d88de88d82d05358aa51', // API Secret 
		'modal':true, // define if make modal. Default: false. Requeri Bootstrap modal javascript 
		'fields':{ // make a extra field. Default: none
			'estado':['PR','SC','SP','RS'], 
			'nível':['Iniciante','Intermediário','Avançado','Ninja']
		} 
	}
```

### API

The options for this generator work as service to generate a JSON endpoint to insert on data base the values. This healp to integrate others API. 

#### .inboundform({options})


#####  token
Type: number (seconds)

Default: 62bb61431348e22850828a5829c4373faafe29c1

Useful when the site .

##### secret 

Type: 

Default: 51a266c2844ccd5cac83d88de88d82d05358aa51

##### modal

Type: bolean

Default: false

This option generete form inside a bootstrap modal.

##### fields

Type: array

Default: { 'radio':['radio'], select:['option',]    }

This option make adtional fields. For defaut the generator has 2 input: name and e-mail, for insert more fields to edit this option.


You can use ``\`` to escape characters that shouldn't be used as separators
(or parts thereof). For instance, ``foo\==bar`` will become a data key/value
pair (``foo=`` and ``bar``) instead of a URL parameter.

Often it is necessary to quote the values, e.g. ``foo='bar baz'``.


## Downloading
Several quick start options are available:

* [Download the latest release](https://github.com/cristiano-acosta/jquery-inbound-form.git).
* Clone the repo: `git clone https://github.com/cristiano-acosta/jquery-inbound-form.git`.

* Install with [Bower](http://bower.io): 
```sh
$ bower install jquery-inbound-form
```


* Install with [npm](https://www.npmjs.com): 
```sh
$ npm install jquery-inbound-form
```




## Copyright and license

All code licensed under the [GNU GENERAL PUBLIC LICENSE](http://fsf.org/). All images licensed under [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/deed.en_US). In other words you are basically free to do whatever you want. Just don't remove my name from the source.