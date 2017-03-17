function TP1(description){
	if(description === undefined || Object.keys(description) < 10) {
		this.baseDeQuestions = {
				'Colombie-Britannique' : "Victoria",
				'Alberta'	: "Edmonton",
				'Saskatchewan' : "Regina",		
				'Manitoba' : "Winnipeg",
				'Ontario' : "Toronto",		
				'Québec' : "Québec",		
				'Terre-Neuve-et-Labrador' : "St. John's",		
				'Nouveau-Brunswick' : "Fredericton",		
				'Nouvelle-Écosse' : "Halifax",		
				'Île-du-Prince-Édouard' : "Charlottetown",		
				'Nunavut' : "Iqaluit",		
				'Territoires du Nord-Ouest' : "Yellowknife",		
				'Yukon' : "Whitehorse"		
		};
	}
	else {
		this.baseDeQuestions = description;
	}
	this.numeroDeQuiz = this.getLongeurQuestions();
	this.resultats = {};
	this.points = 0;
	this.erreursMaximale = 3;	
};


if(TP1.prototype.getLongeurQuestions === undefined){
	TP1.prototype.getLongeurQuestions = function(){
		// Obtenir la longeur de la liste des questions disponibles
		var longeur = Object.keys(this.baseDeQuestions).length;

		return longeur;	
	};
}
if(TP1.prototype.setNumeroDeQuiz === undefined){
	TP1.prototype.setNumeroDeQuiz = function(){
		// Affecter le numéro des question à poser
		var longeurQuestions = this.getLongeurQuestions(),
			reponse = parseInt(prompt("Nombres maximum de questions","Entrez la valeur entre 1 et " + longeurQuestions));

		while(!Number.isInteger(reponse) || reponse < 1 ||  reponse > longeurQuestions) {
			reponse = parseInt(prompt("L'entrée n'est pas correcte! Nombres maximum de questions","Entrez la valeur entre 1 et " + longeurQuestions));
		}
		this.numeroDeQuiz = reponse;
	};
}
if(TP1.prototype.getQuestions === undefined){
	TP1.prototype.getQuestions = function(nombre) {
		// Tirer les questions à poser
		var parent = this,
			maxIndex = this.numeroDeQuiz, 		  // Le numéro des questions à poser
			gamme = this.getLongeurQuestions();   // La gamme d'index que l'on peut utiliser

			aleatoires = function() {
			// Obtenir un tableau de indices qui sont aléatoires
			var indices = new Array(),
				index;

			if(nombre !== undefined) maxIndex = nombre; 

			for(var i=0;i<maxIndex;i++) {
				while(indices.includes(index = Math.floor(Math.random() * gamme))) {} // Recréer une aléatoire si ça existe déja
				indices.push(index);
			}
			return indices;
		};
		return aleatoires().map(function(index) {
			// Tirer les objets (questions-réponse) en fonction des indices aléatoires
			var question = {};
			question[Object.keys(parent.baseDeQuestions)[index]] = Object.values(parent.baseDeQuestions)[index];
			return question;
		});	
	};
}
if(TP1.prototype.debuterJeu === undefined){
	TP1.prototype.debuterJeu = function(){
		// Débuter le quiz
		var questions,							// Questions à poser
			erreurs = 0, 						// Numéro des errures faites
			reponseUsager, 						// Réponse de l'usager
			element, 							// L'objet de Question-Réponse 
			question,							// Question à demander
			reponse,							// Réponse correcte
			resultats = new Array(),			// Resultats
			msg;								// Message

		this.setNumeroDeQuiz();					// Initializer le numéro des questions à poser si ça n'est pas fait 

        questions = this.getQuestions();		// Tirer les questions
		this.points = 0;						// Initialize les points

		while((erreurs<this.erreursMaximale) && (questions.length>0))
		{
			element = questions.pop();
			question = Object.keys(element)[0];
			reponse = Object.values(element)[0];
			reponseUsager = prompt((this.numeroDeQuiz-questions.length)  + ". Quelle la capital de "+ question + "?");
			msg = "\nErreurs: ";
			if (reponseUsager.trim().toLowerCase() === reponse.trim().toLowerCase()){
				this.points += 3;
				alert("Bonne Réponse!" + msg + erreurs);
			}		
			else {
				this.points -=1;
				erreurs += 1;
				alert("Mauvaise Réponse!" + msg + erreurs);
			}
			resultats.push({'question': question, 'reponseUsager' : reponseUsager, 'reponseCorrecte' : reponse})
		}
		this.points = this.points>0? this.points : 0; 
		this.resultats = resultats;
	};
}
var tp1 = new TP1({
				'Colombie-Britannique' : "Victoria",
				'Alberta'	: "Edmonton",
				'Saskatchewan' : "Regina",		
				'Manitoba' : "Winnipeg",
				'Ontario' : "Toronto",		
				'Québec' : "Québec",		
				'Terre-Neuve-et-Labrador' : "St. John's",		
				'Nouveau-Brunswick' : "Fredericton",		
				'Nouvelle-Écosse' : "Halifax",		
				'Île-du-Prince-Édouard' : "Charlottetown"});
tp1.debuterJeu();
console.log("Points: " + tp1.points + "\n");
tp1.resultats.forEach(function(obj) {
console.log('---------------------------------------------' +
		   '\nQuestion: '+ obj['question'] +
 		  '\nRéponse de l\'usager: '+ obj['reponseUsager'] +
 		  '\nRéponse correcte: '+ obj['reponseCorrecte'])})



