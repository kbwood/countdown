/* http://keith-wood.name/countdown.html
 * Georgian initialisation for the jQuery countdown extension
 * Written by Veaceslav Grimalschi grimalschi@yandex.ru (2019) */
(function($) {
	$.countdown.regionalOptions['kz'] = {
        labels: ['Жыл', 'Ай', 'Апта', 'Күн', 'Сағат', 'Минут', 'Секунд'],
		compactLabels: ['ж', 'а', 'а', 'к'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['kz']);
})(jQuery);
