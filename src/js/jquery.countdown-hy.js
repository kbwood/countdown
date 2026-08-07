/* http://keith-wood.name/countdown.html
 * Armenian initialisation for the jQuery countdown extension
 * Written by Artur Martirosyan. (artur{at}zoom.am) October 2011.
 * Edited By Arsen Hovhannisyan. (arsen.hovhannisyan.1991@gmail.am) Jul 2019. */
(function($) {
	'use strict';
	$.countdown.regionalOptions.am = {
		labels: ['Տարի','Ամիս','Շաբաթ','Օր','Ժամ','Րոպե','Վայրկյան'],
		labels1: ['Տարի','Ամիս','Շաբաթ','Օր','Ժամ','Րոպե','Վայրկյան'],
        labels2: ['Տարի','Ամիս','Շաբաթ','Օր','Ժամ','Րոպե','Վայրկյան'],
        compactLabels: ['տ','ա','շ','օ'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.am);
})(jQuery);
