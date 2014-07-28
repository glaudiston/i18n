/**
 * @return the string for the country in lang var
 */
var i18n=function(key){
	if ( !i18n[i18n.LANG] || !i18n[i18n.LANG][key] ){
		console.warn("i18n missing for ["+i18n.LANG+"]["+key+"]")
		return key;
	} else
		return i18n[i18n.LANG][key];
}

i18n.set=function(o, propName){
	if ( o[propName] ) {
		var k="i18n_"+propName+"_key";
		if ( !o[k] ) o[k] = o[propName];
		o[propName]=i18n(o[k]);
	}
}

i18n.changeLanguage=function(options){
	if ( !options ) {
		options = {};
	}
	if ( !options.language ) {
		// Restore default user language
		options.language=getCookie("lang");
	}
	i18n.LANG=options.language;
	setCookie("lang",i18n.LANG);
	$("i18n, div[i18n], span[i18n], label[i18n], option[i18n], select[i18n] option", options.object ).each(function(){
		i18n.set( this, "innerHTML");
	})
	$("*[i18n], select[i18n] > optgroup ", options.object ).each(function(){
		i18n.set( this, "title" );
		i18n.set( this, "label" );
	})
	$("*[i18n-value]", options.object ).each(function(){
		i18n.set( this, value );
	})
}

