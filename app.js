var coverArea = document.getElementById('coverArea')
var totalCoverBoxes = 12

var images = [
	'https://www.iaexperiment.com/wp-content/uploads/2016/08/Foot-in-the-door-02.png',
	'https://www.heinzmarketing.com/wp-content/uploads/2017/08/A-watched-pot-never-boils.jpg',
	'https://thumbs.dreamstime.com/z/as-dead-as-dodo-1489991.jpg',
	'https://100-pics.net/images/answers/en/whatphrase/whatphrase_32729_168456.gif',
	'https://www.rd.com/wp-content/uploads/2017/10/this-is-why-there-are-13-in-a-baker-s-dozen_179437478_stevemart-1024x683.jpg',
	'https://americancultureconsultants.com/wp-content/uploads/2017/08/bird-hand-cartoon-1080x675.jpg',
	'https://13degreez.files.wordpress.com/2012/12/rock-and-a-hard-place-resized-600.png',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-I9aLHTLOMuHF9ZNd08K8wTRDNDTy969ktAx8s4deh26bCHMSA',
	'https://cdn2.vectorstock.com/i/1000x1000/33/46/saying-raining-cats-and-dogs-cartoon-vector-16803346.jpg',
	'https://media.photoblog.com/photos5/96736-1237849384-5-l.jpg',
	'https://i.imgur.com/uGjyeQT.jpg',
	'http://idiomic.com/wp-content/uploads/2016/12/idiomic_pickle_600.jpg',
	'https://f4.bcbits.com/img/a3782539710_10.jpg',
	'https://keystoneelderlaw.com/wp-content/uploads/2018/03/nest-egg.jpg'
]

let img = document.getElementById('catchphraseImage')
img.setAttribute(
	'src',
	'https://vignette.wikia.nocookie.net/logopedia/images/9/9b/Catchphrase_%283%29.jpg/revision/latest?cb=20140727190104'
)

// cycle to next bg image and reset all cover boxes again
var imageNumber = 0
function changeImage() {
	var allCovers = document.getElementsByClassName('coverBoxClass')
	for (i = 0; i < allCovers.length; i++) {
		allCovers[i].classList.toggle('coverBoxClassHidden', false)
	}
	img.setAttribute('src', images[imageNumber])
	imageNumber++
	document.dispatchEvent(new CustomEvent('removeBoxes', {}))
}

document.addEventListener('removeBoxes', (ev) => {
	for (i = 0; i < totalCoverBoxes; i++) {
		removeRandomBox()
	}
	console.log(ev)
})

// remove box randomly
function removeRandomBox() {
	var allCovers = document.getElementsByClassName('coverBoxClass')
	allCovers = Array.from(allCovers).filter(
		element => !element.classList.contains('coverBoxClassHidden')
	)
	let randomBoxNum = Math.floor(Math.random() * Math.floor(allCovers.length))
	allCovers[randomBoxNum].classList.toggle('coverBoxClassHidden', true)
}

//creating the coverboxes
for (i = 0; i < totalCoverBoxes; i++) {
	let coverBox = document.createElement('div')
	coverBox.addEventListener('click', removeBox, false)
	coverBox.className = 'coverBoxClass'
	coverArea.appendChild(coverBox)
}

function removeBox(event) {
	event.target.classList.toggle('coverBoxClassHidden', true)
}
