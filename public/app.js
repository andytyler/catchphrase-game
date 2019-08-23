var coverArea = document.getElementById('coverArea')
var totalCoverBoxes = 100
var imageNumber = 1
var startDelay = 5
var rateOfDecay = 2

var images = []
let img = document.getElementById('catchphraseImage')


async function setUpPage() {
	const response = await fetch('https://ibnibvvcs7.execute-api.eu-west-1.amazonaws.com/Prod/hello/', {})
	const json = await response.json()
	images = await json.catchphrases

	img.setAttribute('src', images[0])
}

setUpPage()

for (i = 0; i < totalCoverBoxes; i++) {
	console.log('adding a coverbox')

	let coverBox = document.createElement('div')
	coverBox.addEventListener('click', removeBox, false)
	coverBox.className = 'coverBoxClass'
	coverArea.appendChild(coverBox)
}

function changeImage() {
	var allCovers = document.getElementsByClassName('coverBoxClass')
	for (i = 0; i < allCovers.length; i++) {
		allCovers[i].classList.toggle('coverBoxClassHidden', false)
	}
	img.setAttribute('src', images[imageNumber])
	imageNumber++
	console.log('change image called')

	removeRandomBoxs(startDelay)
}

function clearAllBoxes() {
	var allCovers = document.getElementsByClassName('coverBoxClass')

	var allVisibleCovers = Array.from(allCovers).filter(
		element => !element.classList.contains('coverBoxClassHidden')
	)
	allVisibleCovers.forEach(box => {
		box.classList.toggle('coverBoxClassHidden', true)
	})
}

function removeRandomBoxs(delay) {
	console.log('DELAY**:', delay)

	var allCovers = document.getElementsByClassName('coverBoxClass')

	var allVisibleCovers = Array.from(allCovers).filter(
		element => !element.classList.contains('coverBoxClassHidden')
	)
	console.log('la covers', allVisibleCovers)
	let randomBoxNum = Math.floor(
		Math.random() * Math.floor(allVisibleCovers.length)
	)
	console.log(allVisibleCovers[randomBoxNum])
	if (allVisibleCovers.length > 0) {
		allVisibleCovers[randomBoxNum].classList.toggle(
			'coverBoxClassHidden',
			true
		)
	}
	if (allVisibleCovers.length > 1) {
		setTimeout(removeRandomBoxs, delay, delay + rateOfDecay)
	}
}

function removeBox(event) {
	event.target.classList.toggle('coverBoxClassHidden', true)
}
