import '../css/App.css';
import { Link, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { algoFilter, algoList, algoMap } from '../AlgoList';
import AboutScreen from './AboutScreen';
import Footer from '../components/Footer';
import Header from '../components/Header';

/* Side Panel Buttons */
const allCategories = ['All', ...new Set(algoFilter.map(item => item.category))];


function SideButton({ button, filter }) {
	return (
		<div className="Side-Buttons">
			{button.map((cat, i) => {
				return (
					<button type="button" key={i} onClick={() => filter(cat)} className="btn">
						{cat}
					</button>
				);
			})}
		</div>
	);
}

/* Buttons for DSA pages */
function SearchFilter({ filteredAlgoList }) {
	return filteredAlgoList.length ? (
		filteredAlgoList.map(
			(name, idx) =>
				algoMap[name] && (
					<Link to={`/${name}`} key={idx} style={{ textDecoration: 'none' }}>
						<button
							className="button"
							style={
								algoMap[name][0] === 'Bogo Sort' ||
								algoMap[name][0] === 'LVA' ||
								algoMap[name][0] === 'Non-Linear Probing'
									? {
											background:
												'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)',
											color: 'white',
											filter: 'none',
									  }
									: {}
							}
						>
							<div className="algo-container">
								<div className="algo-name">{algoMap[name][0]}</div>
								{algoMap[name][0] && (
									<div className="algo-picture">
										<img
											alt={algoMap[name][0]}
											src={`./algo_buttons/${algoMap[name][0]}.png`}
											onError = {(e) => {
												const currentSrc = e.target.src;
												if (currentSrc.endsWith('.png')) {
													e.target.src = `./algo_buttons/${algoMap[name][0]}.gif`;
												} else if (currentSrc.endsWith('.gif')) {
													e.target.style.display = 'none';
												}
											}}
										/>
									</div>
								)}
							</div>
						</button>
					</Link>
				),
		)
	) : (
		<span className="no-results">No results found. Please try a different search term.</span>
	);
}

/* Survey for Finals */
// eslint-disable-next-line no-unused-vars
function FinalsBanner() {
	return (
		<div className="banner-container">
			<div className="banner">
				<span role="img" aria-label="nerd">
					🤓
				</span>
				<span> Studying for the final? </span>
				<a href="https://forms.gle/j9iMhFi8drjf2PU86" target="_blank" rel="noreferrer">
					Tell us how we can improve!
				</a>
			</div>
		</div>
	);
}

const HomeScreen = ({ theme, toggleTheme }) => {
	/* Search Bar Functionality */
	const [dsaFilter, setDsaFilter] = useState('');
	const [filterList, setFilteredList] = useState(algoList);

	const filteredAlgoList = filterList.filter(name => {
		if (dsaFilter) {
			return (
				algoMap[name] &&
				(name.toLowerCase().includes(dsaFilter.toLowerCase()) ||
					algoMap[name][0].toLowerCase().includes(dsaFilter.toLowerCase()))
			);
		}
		return true;
	});

	// const relatedSearchesList = useMemo(() => {
	// 	const relatedSet = new Set();

	// 	if (dsaFilter) {
	// 		filteredAlgoList.forEach(name => {
	// 			const related = relatedSearches[name];
	// 			related.forEach(algo => {
	// 				if (!filteredAlgoList.includes(algo)) {
	// 					relatedSet.add(algo);
	// 				}
	// 			});
	// 		});
	// 	}

	// 	return ['Related Pages', ...Array.from(relatedSet)];
	// }, [filteredAlgoList, dsaFilter]);

	/* Side Panel Functionality */
	const [sideButtons] = useState(allCategories);

	const sidefilter = button => {
		if (button === 'All') {
			setFilteredList(algoList);
			return;
		}

		const filteredData = algoFilter
			.filter(item => item.category === button)
			.map(item => item.id);
		setFilteredList(filteredData);
	};

	return (
		<div className="container">
			<Header theme={theme} toggleTheme={toggleTheme} />
			<div className="content">
				<Routes>
					<Route
						path="*"
						element={
							<>
								{/* <FinalsBanner></FinalsBanner> */}
								<div className="outer-flex">
									{/* Side Navigator*/}
									<div className="side-panel">
										{/* Search Bar */}
										<input
											className="dsa-filter"
											placeholder="Search..."
											type="search"
											onChange={e => setDsaFilter(e.target.value)}
										/>
										<SideButton button={sideButtons} filter={sidefilter} />
									</div>

									<div className="inner-flex">
										<SearchFilter filteredAlgoList={filteredAlgoList} />
									</div>
								</div>
							</>
						}
					/>
					<Route path="/about" element={<AboutScreen />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default HomeScreen;