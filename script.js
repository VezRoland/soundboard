let sounds

document.onkeydown = ({ keyCode }) => {
	const elem = document.querySelector(`.sound[keycode="${keyCode}"]`)
	if (elem) triggerEvent(elem, 'mousedown')
}

document.onkeyup = ({ keyCode }) => {
	const elem = document.querySelector(`.sound[keycode="${keyCode}"]`)
	if (elem) triggerEvent(elem, 'mouseup')
}

const createSoundElem = ({ key, letter, sound, url }) => {
	const soundElem = document.createElement('button')
	soundElem.classList = 'sound relative w-full aspect-square flex flex-col justify-center gap-2 border border-zinc-700 hover:border-zinc-500 focus:border-zinc-500 focus:outline-none rounded-lg bg-zinc-800/[65%] transition duration-250 group'
	soundElem.setAttribute('keycode', key)

	const soundElemHighlight = document.createElement('div')
	soundElemHighlight.className = '-z-20 absolute top-5 w-full h-full opacity-0 blur-xl bg-indigo-600/[35%] transition duration-250'

	const soundElemLetter = document.createElement('span')
	soundElemLetter.textContent = letter
	soundElemLetter.className = 'text-2xl font-semibold'

	const soundElemSound = document.createElement('span')
	soundElemSound.textContent = sound
	soundElemSound.className = 'text-zinc-400 group-hover:text-indigo-400 transition-color duration-200'

	soundElem.onmousedown = () => {
		const soundElemAudio = new Audio(url)
		soundElemAudio.play()
		soundElemHighlight.classList.replace('opacity-0', 'opacity-100')
	}

	soundElem.onkeydown = ({ code }) => {
		if (!['Enter', 'Space'].includes(code)) return
		const soundElemAudio = new Audio(url)
		soundElemAudio.play()
		soundElemHighlight.classList.replace('opacity-0', 'opacity-100')
	}

	soundElem.onmouseup = () => soundElemHighlight.classList.replace('opacity-100', 'opacity-0')
	soundElem.onkeyup = () => soundElemHighlight.classList.replace('opacity-100', 'opacity-0')

	soundElem.append(soundElemLetter, soundElemSound, soundElemHighlight)
	return soundElem
}

const render = (elem) => document.querySelector('.sounds').appendChild(elem)

const getData = async (url) => {
	const response = await fetch(url)
	return await response.json()
}

function triggerEvent(el, type) {
	if (!('createEvent' in document)) return
		const e = document.createEvent('HTMLEvents')
		e.initEvent(type, false, true)
		el.dispatchEvent(e)
}

getData('https://raw.githubusercontent.com/mkatay/json-drums/main/drums')
	.then(data => {
		data.map(elem => render(createSoundElem(elem)))
	})