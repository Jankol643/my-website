(function($) {
	"use strict";
	console.log("main js called");
	function init() {
		initUI();
		initPriceSlider();
		initPriceFilter();
	}

	init();

	function initUI() {
			// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		let $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		let $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	let zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	}


	/////////////////////////////////////////

	function initPriceSlider() {

	// Input number
	$('.input-number').each(function() {
		let $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			let value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			let value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

		let priceInputMax = document.getElementsByClassName('price-max')[0],
		priceInputMin = document.getElementsByClassName('price-min')[0];

priceInputMax.addEventListener('change', function(){
	updatePriceSlider($(this).parent() , this.value)
});

priceInputMin.addEventListener('change', function(){
	updatePriceSlider($(this).parent() , this.value)
});

function updatePriceSlider(elem , value) {
	if ( elem.hasClass('price-min') ) {
		console.log('min')
		priceSlider.noUiSlider.set([value, null]);
	} else if ( elem.hasClass('price-max')) {
		console.log('max')
		priceSlider.noUiSlider.set([null, value]);
	}
}

// Price Slider
let priceSlider = document.getElementsByClassName('price-slider');
if (!priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [1, 999],
		connect: true,
		step: 1,
		range: {
			'min': 1,
			'max': 999
		}
	});

	priceSlider.noUiSlider.on('update', function( values, handle ) {
		let value = values[handle];
		handle ? priceInputMax.value = value : priceInputMin.value = value
	});

	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const filters = getSelectedFilters();
    // Perform filtering logic based on selected filters
    console.log(filters);
  });
});

function getSelectedFilters() {
  const selectedFilters = {};
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const groupName = checkbox.getAttribute('name');
      const value = checkbox.value;
      if (!selectedFilters[groupName]) {
        selectedFilters[groupName] = [];
      }
      selectedFilters[groupName].push(value);
    }
  });
  return selectedFilters;
}

const priceRangeInput = document.querySelector('#price-range');
const priceChart = document.querySelector('#price-chart');
const showChartCheckbox = document.querySelector('#show-chart');

priceRangeInput.addEventListener('input', () => {
  const value = priceRangeInput.value;
  const percentage = ((value - priceRangeInput.min) / (priceRangeInput.max - priceRangeInput.min)) * 100;
  priceRangeInput.style.background = `linear-gradient(to right, red 0%, red ${percentage}%, #f5f5f5 ${percentage}%, #f5f5f5 100%)`;
});

showChartCheckbox.addEventListener('change', () => {
  if (showChartCheckbox.checked) {
    priceChart.style.display = 'block';
  } else {
    priceChart.style.display = 'none';
  }
});

}

	}

	function initPriceFilter() {
		let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range-fill");

// Function to validate range and update the fill color on slider
function validateRange() {
  let minPrice = parseInt(inputElements[0].value);
  let maxPrice = parseInt(inputElements[1].value);

  if (minPrice > maxPrice) {
    let tempValue = maxPrice;
    maxPrice = minPrice;
    minPrice = tempValue;
  }

  const minPercentage = ((minPrice - 10) / 490) * 100;
  const maxPercentage = ((maxPrice - 10) / 490) * 100;

  rangeFill.style.left = minPercentage + "%";
  rangeFill.style.width = maxPercentage - minPercentage + "%";

  minValue.innerHTML = "$" + minPrice;
  maxValue.innerHTML = "$" + maxPrice;
}

const inputElements = document.querySelectorAll("input");

// Add an event listener to each input element
inputElements.forEach((element) => {
  element.addEventListener("input", validateRange);
});

// Initial call to validateRange
validateRange();
	}

		//update cart
		function addToWishlist(p_id) {
			alert("Item added to wishlist");
			//TODO: multiple wishlists
			//TODO: multiple items at once
		}
	

})(jQuery);
