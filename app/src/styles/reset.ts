import css from 'styled-jsx/css'

export default css.global`
	*, *::before, *::after {
		box-sizing: border-box;
	}

	* {
		margin: 0;
	}

	html, body, #__next {
		height: 100%;
		
	}

	html {
		-webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom */
	}

	body {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}

	img, picture, video, canvas, svg {
		display: block;
		max-width: 100%;
	}

	input, button, textarea, select {
		font: inherit;
	}

	p, h1, h2, h3, h4, h5, h6 {
		overflow-wrap: break-word;
	}

	#root, #__next {
		isolation: isolate;
	}
`