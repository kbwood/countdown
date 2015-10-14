/* http://keith-wood.name/countdown.html
 * Ukrainian initialisation for the jQuery countdown extension
 * Written by Goloborodko M misha.gm@gmail.com (2009), corrections by Iгор Kоновал */
(function($) {
	$.countdown.regionalOptions['uk'] = {
		labels: ['Років', 'Місяців', 'Тижнів', 'Днів', 'Годин', 'Хвилин', 'Секунд'],
		labels1: ['Рік', 'Місяць', 'Тиждень', 'День', 'Година', 'Хвилина', 'Секунда'],
		labels2: ['Роки', 'Місяці', 'Тижні', 'Дні', 'Години', 'Хвилини', 'Секунди'],
		compactLabels: ['r', 'm', 't', 'd'],
		whichLabels: function(amount) {
			return amount !=0 ? (amount%10==1&&amount%100!=11?1:amount%10>=2&&amount%10<=4&&(amount%100<10||amount%100>=20)?2:0) : 0;
		},
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['uk']);
})(jQuery);
