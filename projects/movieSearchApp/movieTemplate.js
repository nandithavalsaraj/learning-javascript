const movieTemplate = movieDetail => {
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
			<article class="notification is-primary" >
				<p class="title">${movieDetail.Awards}</p>
				<p class="subtitle">Awards</p>
			</article>
			<article class="notification is-primary" >
				<p class="title">${movieDetail.BoxOffice}</p>
				<p class="subtitle">BoxOffice</p>
			</article>
			<article class="notification is-primary" >
				<p class="title">${movieDetail.MetaScore}</p>
				<p class="subtitle">MetaScore</p>
			</article>
			<article class="notification is-primary" >
				<p class="title">${movieDetail.imdbRating}</p>
				<p class="subtitle">imdbRating</p>
			</article>
			<article class="notification is-primary" >
				<p class="title">${movieDetail.imdbVotes}</p>
				<p class="subtitle">IMDB Votes</p>
			</article>
					`;
};