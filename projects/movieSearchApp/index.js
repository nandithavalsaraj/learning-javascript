
 createAutoComplete ({
 	root : document.querySelector('.autocomplete'),
 	renderOption(movie) {
 		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
 		return `<img src="${imgSrc}" />
				${movie.Title} (${movie.Year})
				`;
 	},
 	onOptionSelect(movie){
 		onMovieSelect(movie);
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

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
	params : {
		apikey : '2508c96f',
		i : movie.imdbID
		}
	});
	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};
