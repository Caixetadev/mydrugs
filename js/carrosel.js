class Carrousel{
	constructor(obj){
		this.imgs = obj.imgs || []
		this.carrAtual = 0
		this.el = obj.el || null
		this.style = obj.style || `{}`
		this.getContainer()
		document.querySelector(`body`).style = `padding: 0; margin: 0;`
		document.querySelector(`head`).outerHTML = document.querySelector(`head`).innerHTML + `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />`
	}
	getContainer(){
		this.el ? this.container = document.querySelector(this.el) : console.error(`Erro ao achar container`)
		this.mountCarrousel()
	}
	voltarAoComecoCarrousel(){
		const styleImageBlock = `
				left: 17%;
				width: auto;
				height: 500px;
				max-height: 500px;
				object-fit: cover;
				position: absolute;
				display: block;
			`
		const styleImageNone = `
				width: 100%;
				height: 100%;
				max-height: 500px;
				object-fit: cover;
				position: absolute;
			display: none;
			`
		document.querySelectorAll(`.carrouselContainer img`).forEach((item, i) => {
			i == 0 ? (() => {
				item.style = styleImageBlock
			})() : (() => {
				item.style = styleImageNone
			})()
		})
		this.carrAtual = 0
	}
	voltarAoUltimoCarrousel(){
		const styleImageBlock = `
				width: auto;
				left: 17%;
				height: 500px;
				max-height: 500px;
				object-fit: cover;
				position: absolute;
				display: block;
			`
		const styleImageNone = `
				width: 100%;
				height: 100%;
				max-height: 500px;
				object-fit: cover;
				position: absolute;
			display: none;
			`
		document.querySelectorAll(`.carrouselContainer img`).forEach((item, i) => {
			i == this.carrMax ? (() => {
				item.style = styleImageBlock
			})() : (() => {
				item.style = styleImageNone
			})()
		})
		this.carrAtual = this.carrMax
	}
	getImageCarrousel(){
		const styleImage = `
			width: auto;
			left: 17%;
			height: 500px;
			object-fit: cover;
			position: absolute;
		`
		let auxImage = ""
		this.imgs.forEach((imagem, i) => {
			auxImage += `<img 
			style="${styleImage} ${i == 0 ? 'display: block' : 'display: none'}" 
			src="${imagem}"/>`
		})
		if(this.imgs.length > 0)[
			this.carrMax = this.imgs.length - 1
		]
		return auxImage
	}
	mountCarrousel(){
		const styleContainer = `
			width: 100vw;
			height: 100%;
			height: 500px;
		`
		let imagensCarrousel = this.getImageCarrousel()
		this.container.outerHTML = `
			<div style="${styleContainer}" class="container carrouselContainer"> 
			${imagensCarrousel}
			<div 
			id="left"
			style="position: absolute; top: 400px; left: 0px; color: #fff; margin-left: 7vw; font-size: 23px; cursor: pointer;padding: 20px">
				<i class="fas fa-chevron-left"></i>
			</div>
			<div 
			id="right"
			style="position: absolute; top: 400px; right: 0px; color: #fff; margin-right: 7vw; font-size: 23px; cursor: pointer; float: right; padding: 20px">
				<i class="fas fa-chevron-right"></i>
			</div>
			</div>
		`
		const styleImageBlock = `
				width: auto;
				left: 17%;
				height: 500px;
				max-height: 500px;
				object-fit: cover;
				position: absolute;
				display: block;
			`
		const styleImageNone = `
				width: 100%;
				height: 100%;
				max-height: 500px;
				object-fit: cover;
				position: absolute;
			display: none;
			`
		document.querySelector(`.carrouselContainer #right`).addEventListener(`click`, () => {
			let proximo = this.carrAtual + 1
			if(document.querySelectorAll(`.carrouselContainer img`)[proximo]){
				document.querySelectorAll(`.carrouselContainer img`)[this.carrAtual].style = styleImageNone
				document.querySelectorAll(`.carrouselContainer img`)[proximo].style = styleImageBlock
				this.carrAtual += 1
			} else{
				this.voltarAoComecoCarrousel()
			}
		})
		document.querySelector(`.carrouselContainer #left`).addEventListener(`click`, () => {
			let anterior = this.carrAtual - 1
			if(document.querySelectorAll(`.carrouselContainer img`)[anterior]){
				document.querySelectorAll(`.carrouselContainer img`)[this.carrAtual].style = styleImageNone
				document.querySelectorAll(`.carrouselContainer img`)[anterior].style = styleImageBlock
				this.carrAtual -= 1
			} else{
				this.voltarAoUltimoCarrousel()
			}
		})
		// document.querySelector(`.carrouselContainer #right`).removeAttribute("id")
		// document.querySelector(`.carrouselContainer #left`).removeAttribute("id")
	}
}

