document.ready(function () {
	const amenities = {};
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

    $.get('http://0.0.0.0:5001/api/v1/places_search/', (data) => {
        $(".places").empty();
        data.forEach((place) => {
            const article =
                `<article>
                        <div class="title">
                            <h2>${place.name}</h2>
                        </div>
                        <div class="price_by_night">
                            ${place.price_by_night}
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.max_guest} Guests
                            </div>
                            <div class="number_rooms">
                                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.number_rooms} Bedrooms
                            </div>
                            <div class="number_bathrooms">
                                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.number_bathrooms} Bathroom
                            </div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`;
                $(".places").append(article);
    });
}).fail(function (xhr, status, error) {
        console.error('Error:', error);
});

	// get status of API
	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});
});
