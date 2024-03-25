import React, { useRef, useState } from 'react';
import blobSound from './bark.mp3'; // Import the sound file

const Blob = () => {
	const [showTextBubble, setShowTextBubble] = useState(false);
	const [tipIndex, setTipIndex] = useState(0);
	const [shouldPlaySound, setShouldPlaySound] = useState(false);
	
	const imgRef = useRef(null); // Create a ref for the image element
	const blobTips = [
        "Welcome to CS 1332's visualization tool!",
        "Click a data structure or algorithm to go to its visualization page!",
        "Pause the animation and Step Forward/Back to explore operations.",
        "Reference the pseudo-code to see how each step is implemented.",
        "Click the top-right icons to change the pseudo-code or see more info.",
        "Some pages have additional settings and modes. Play around!",
		"Keep clicking me for a surprise!",
		"...",
		"",
    ];

	const handleClick = () => {
		setShowTextBubble(!showTextBubble);
		if (showTextBubble) {
			setTipIndex((tipIndex + 1) % blobTips.length);
			imgRef.current.classList.remove('blobLogo-animate');
		}
		if (!blobTips[tipIndex]) {
			if (imgRef.current) {
				imgRef.current.src = imgRef.current.src.replace('favicon', 'jack');
				imgRef.current.classList.add('blobLogo-animate');
			}
			setTipIndex((tipIndex + 1) % blobTips.length);
			setShowTextBubble(false);
			setShouldPlaySound(true);
		}
	};

	return (
		<div onMouseDown={handleClick}>
            {shouldPlaySound && <audio src={blobSound} autoPlay onEnded={() => setShouldPlaySound(false)} />}
			{showTextBubble && (
				<div id="text-bubble">
					<div>{blobTips[tipIndex]}</div>
				</div>
			)}
			<img src="./favicon.png" alt="" className="blobLogo"  id="blobLogo" ref={imgRef} />
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 500 500"
				width="100%"
				height="100%"
				id="blobSvg"
				transform="rotate(65)"
				style={{ opacity: '1', cursor: 'grab' }}
			>
				{' '}
				<defs>
					{' '}
					<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
						{' '}
						<stop offset="0%" style={{ stopColor: '#ff5f6d' }}></stop>{' '}
						<stop offset="100%" style={{ stopColor: '#ffc371' }}></stop>{' '}
					</linearGradient>{' '}
				</defs>{' '}
				<path id="blob" fill="url(#gradient)" style={{ opacity: '1' }}>
					<animate
						attributeName="d"
						dur="9500ms"
						repeatCount="indefinite"
						values="M439.43806,316.51312Q432.44085,383.02623,370.39398,407.14258Q308.3471,431.25893,240.13979,459.78516Q171.93248,488.31139,132.30301,426.26451Q92.67355,364.21763,63.21484,307.10882Q33.75613,250,44.06194,178.90151Q54.36774,107.80301,118.67355,75.31613Q182.97935,42.82924,240.60882,72.66602Q298.23828,102.50279,368.10882,107.87054Q437.97935,113.23828,442.20731,181.61914Q446.43527,250,439.43806,316.51312Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M453.70516,317.0107Q433.36186,384.02139,362.52423,381.146Q291.6866,378.27061,242.8433,399.93801Q194,421.60541,117.08118,412.14317Q40.16237,402.68093,64.29201,326.34046Q88.42165,250,109.0107,206.32693Q129.59975,162.65387,148.64317,78.76495Q167.6866,-5.12397,241.8433,20.74072Q316,46.60541,350.8433,99.17023Q385.6866,151.73505,429.86753,200.86753Q474.04846,250,453.70516,317.0107Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M439.43806,316.51312Q432.44085,383.02623,370.39398,407.14258Q308.3471,431.25893,240.13979,459.78516Q171.93248,488.31139,132.30301,426.26451Q92.67355,364.21763,63.21484,307.10882Q33.75613,250,44.06194,178.90151Q54.36774,107.80301,118.67355,75.31613Q182.97935,42.82924,240.60882,72.66602Q298.23828,102.50279,368.10882,107.87054Q437.97935,113.23828,442.20731,181.61914Q446.43527,250,439.43806,316.51312Z"
					></animate>
				</path>
			</svg>
		</div>
	);
};

export default Blob;
