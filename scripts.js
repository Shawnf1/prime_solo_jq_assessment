/**
 * Created by Shawn on 8/19/15.
 */
var gCounter = 0;// number of times button has been clicked on this page load
var gDeleted = 0;// number of lines that have been deleted

// create elements for page: div, 2x buttons, span for changing text
var $div = $('<div>');
var $span = $('<span>', {'class': 'js-lines', 'data-count': 0, 'data-line': 0, 'data-random': 0});

// create the button elements to be used in div's
var $color = $('<button>', {'class': 'js-color'}).text('Change Color');
var $remove = $('<button>', {'class': 'js-remove'}).text('Remove');
$div.append($color).append($remove).append($span);

$(document).ready(function ()
{
	//console.log('Ready');
	$('#Main_div').on('click', '#Generate_btn', function (e)
	{
		e.preventDefault();

		// clone div element created at start, find the span and modify the attributes and text, then append it to the DOM
		$newDiv = $div.clone();
		$newDiv.find('.js-lines').text('Line #'+ gCounter +', generate has been clicked 0 times since this was created. '+
			'Current color is #FFFFFF and you\'ve randomized the color 0 times.');
		$newDiv.find('.js-lines').attr('data-line', gCounter);
		$(this).parent().append($newDiv);

		// each time generate is clicked, go through the span's and update the click count for each one
		$('.js-lines').each(function()
		{
			var count = parseInt($(this).attr('data-count'));
			var line = parseInt($(this).attr('data-line'));
			var color = $(this).css('background-color');
			var random = $(this).attr('data-random');
			$(this).text('Line #'+ line +', generate has been clicked '+ count +' times since this was created. Current color is '+ color
				+' and you\'ve randomized the color '+ random +' times.');
			count++;
			$(this).attr('data-count', count);
		});
		gCounter++;

		// modify the counter at the top
		$('#Generated_spn').text(gCounter);
	});

	$('#Main_div').on('click', '.js-color', function (e)
	{
		e.preventDefault();
		var $parent = $(this).parent();
		var $span = $parent.find('.js-lines');
		var color;
		// get random number to choose class or complete random - such high random since many more random colors than set colors
		var seed = getRandomInt(0, 20)
		{
			switch(seed)
			{
				case 0:
					color = "red";
					$parent.attr('class', 'red');
					break;
				case 1:
					color = "orange";
					$parent.attr('class', 'orange');
					break;
				case 2:
					color = "yellow";
					$parent.attr('class', 'yellow');
					break;
				case 3:
					color = "green";
					$parent.attr('class', 'green');
					break;
				case 4:
					color = "blue";
					$parent.attr('class', 'blue');
					break;
				case 5:
					color = "purple";
					$parent.attr('class', 'purple');
					break;
				default:
					// create new random color
					var chance = new Chance();
					color = chance.color();
					$parent.css({'background-color': color});
					break;
			}
		}


		// grab data attributes from span to regenerate the message
		var count = parseInt($span.attr('data-count'));
		var line = parseInt($span.attr('data-line'));
		var random = parseInt($span.attr('data-random'));
		random++;

		$parent.find('.js-lines').text('Line #'+ line +', generate has been clicked '+ count +' times since this was created. Current color is '+ color
			+' and you\'ve randomized the color '+ random +' times.');
		$span.attr('data-random', random);
	});

	$('#Main_div').on('click', '.js-remove', function (e)
	{
		e.preventDefault();
		$(this).parent().remove();
		gDeleted++;
		$('#Deleted_spn').text(gDeleted);
	});
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}