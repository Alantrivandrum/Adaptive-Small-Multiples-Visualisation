let scale = d3.scaleLinear().domain([0, 100]).range([0, 500]);

let axis = d3.axisBottom(scale);

function updateScaleDomain() {
	let min = Math.random() * 100;
	let max = min + Math.random() * 100;
	scale.domain([min, max]);
	update();
}

function update() {
	d3.select('svg g')
		.transition()
		.call(axis);
}

update();
