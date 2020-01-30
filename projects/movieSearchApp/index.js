
const autoCompleteConfig = ({
 	renderOption(movie) {
 		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
 		return `
 		        <img src="${imgSrc}" />

				${movie.Title} (${movie.Year})
				`;
 	},
 	
 	inputValue(movie){
 		return movie.Title;
 	},
 	async fetchData(searchTerm){
		const response = await axios.get('http://www.omdbapi.com/', {
			params : {
				apikey : '2508c96f',
				s : searchTerm
			}
		});
		if(response.data.Error){
		return [];
		}
		return (response.data.Search);
   }
 });


createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie){
 		document.querySelector('.tutorial').classList.add('is-hidden');
 		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
 	}
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie){
 		document.querySelector('.tutorial').classList.add('is-hidden');
 		onMovieSelect(movie, onMovieSelect(movie, document.querySelector('#right-summary'), 'right'));
 	}
});
<<<<<<< HEAD
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
=======

const onMovieSelect = async movie => {
>>>>>>> 6fb73eb599a32c8eead56c37cf3ec8b4c2829ee4
    const response = await axios.get('http://www.omdbapi.com/', {
	params : {
		apikey : '2508c96f',
		i : movie.imdbID
		}
	});
<<<<<<< HEAD
	summaryElement.innerHTML = movieTemplate(response.data);
	if(side === 'left'){
		leftMovie = response.data;
	}
	else{
		rightMovie = response.data;
	}
	if(leftMovie && rightMovie){
		runComparison();
	}
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};
const movieTemplate = movieDetail => {
	  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );
	const metascore = parseInt(movieDetail.MetaScore);
	const imdbRating = parseFloat(movieDetail.imdbRating);
	const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g,''));
	let count = 0;
	const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
		if(isNaN(word)){
			return prev;
		}
		else{
			count = count + value;
		}
	}, 0);
=======

};const movieTemplate = movieDetail => {
>>>>>>> 6fb73eb599a32c8eead56c37cf3ec8b4c2829ee4
	return `<article class="media">
				<figure class="media-left">
					<p class="image">
						<img src="${movieDetail.Poster}"/>
					</p>
				</figure>
				<div class="dropdown-content">
					<div class="content">
						<h1>${movieDetail.Title}</h1>
						<h4>${movieDetail.Genre}</h4>
						<p>${movieDetail.Plot}</p>
					</div>
				</div>
			</article>
			<article data-value=${dollars} class="notification is-primary" >
				<p class="title">${movieDetail.Awards}</p>
				<p class="subtitle">Awards</p>
			</article>
			<article data-value=${dollars} class="notification is-primary" >
				<p class="title">${movieDetail.BoxOffice}</p>
				<p class="subtitle">BoxOffice</p>
			</article>
			<article data-value=${metascore}class="notification is-primary" >
				<p class="title">${movieDetail.MetaScore}</p>
				<p class="subtitle">MetaScore</p>
			</article>
			<article data-value=${imdbRating} class="notification is-primary" >
				<p class="title">${movieDetail.imdbRating}</p>
				<p class="subtitle">imdbRating</p>
			</article>
			<article data-value=${imdbVotes} class="notification is-primary" >
				<p class="title">${movieDetail.imdbVotes}</p>
				<p class="subtitle">IMDB Votes</p>
			</article>
					`;

};
