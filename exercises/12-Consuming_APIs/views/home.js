module.exports = function(user) {
	return (
`
<!DOCTYPE html>
<html>
	<head>
		<title>GitHub Profile for ${user.username}</title>
		<link rel="stylesheet" type="text/css" href="../css/main.css">
		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	</head>
	<body>
	  	<main class="gh-wrapper">
	  		<h1 class="gh-title">GitHub Grabber</h1>
	    	<article class="gh-card">
		      	<section class="gh-inner-wrapper">
		        	<section class="gh-col">
		          		<img class="gh-avatar" src="${user.avatarUrl}" />
		          		<section class="gh-name-wrapper">
		            		<i class="gh-github fa fa-github" aria-hidden="true"></i>
		            		<h2 class="gh-name">${user.name}</h2>
		          		</section>
		          	<h2 class="gh-username"><a class="gh-username-link" href="${user.profileUrl}">${user.username}</a></h2>
		        	</section>
		        	<section class="gh-col">
			          	${
			          		user.bio !== null ?
			          		`
		          		<h3 class="gh-key">Bio</h3>
		          		<p class="gh-value">${user.bio}</p>
		          			` :
		          			''
			          	}
			          	${
			          		user.location !== null ?
			          		`
			          	<h3 class="gh-key">Location</h3>
			          	<p class="gh-value">${user.location}</p>
			          		` :
			          		''
			          	}
			          	<h3 class="gh-key">Repositories</h3>
			          	<p class="gh-value">${user.repos}</p>
			          	<h3 class="gh-key">Followers</h3>
			          	<p class="gh-value">${user.followers}</p>
			          	<h3 class="gh-key">Following</h3>
			          	<p class="gh-value">${user.following}</p>
		        	</section>
		      	</section>
	    	</article>
	  	</main>
	</body>
</html>
`
	);
}
