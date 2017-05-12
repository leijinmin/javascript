/*
	id                                      name            value
	#formulaire				formulaire
	#input_energieParPanneaux		epp
	#input_nombreDePanneaux			ndp
	#input_totalEnergie			teg
	#input_tv				tv
	#input_radio				radio
	#input_pompe				pompe
	#input_eclairage			eclairage
	#output_energieConsomme                 tec
	#output_bilan                           bilan
        #button_calculer			calculer
	#radio_opt		                opt_radio 	NbPanneauxSolaires
	#radio_opt		                opt_radio 	EnergiePanneau
	#button_optimiser			optimiser

*/
(function() {
  // Ajouter jquery dans le contexte
  var script = document.createElement('script'),
      sibling = document.getElementsByTagName('script')[0]; 
      parent = sibling.parentElement;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
      script.type = 'text/javascript';
      parent.insertBefore(script,sibling); 


      window.onload = function(){
      	class EnergieSolaire {

            constructor(energieParPanneau,nbPanneau,energieTelevision,energieRadio,energiePompe,energieEclairage) {
              this.EnergieParPanneau = energieParPanneau;
              this.NbPanneau = nbPanneau;
              this.EnergieTelevision = energieTelevision;
              this.EnergieRadio = energieRadio;
              this.EnergiePompe = energiePompe;
              this.EnergieEclairage = energieEclairage;  
              this.calculerEnergieGeneree();
        	    this.calculerEnergieConsommee();
        	   this.calculerBilanEnergie();                           
            }

            calculerEnergieGeneree() {
            	this.TotalEnergie = parseFloat(this.EnergieParPanneau) * 
            						          parseFloat(this.NbPanneau);
            }
            calculerEnergieConsommee() {
            	this.EnergieConsomme = parseFloat(this.EnergieTelevision) + 
            						             parseFloat(this.EnergieRadio) + 
            						             parseFloat(this.EnergiePompe) + 
            						             parseFloat(this.EnergieEclairage);
            }
            calculerBilanEnergie() {
				      this.EnergieBilan = this.TotalEnergie - this.EnergieConsomme;
            }
            optimiserNbPanneaux() {
            	this.NbPanneau = Math.ceil(this.EnergieConsomme / this.EnergieParPanneau);
            	this.calculerEnergieGeneree();
            	this.calculerBilanEnergie();
            }

            optimiserEnergieParPanneau() {
            	this.EnergieParPanneau = Math.ceil(this.EnergieConsomme / this.NbPanneau);
              	this.calculerEnergieGeneree();
            	  this.calculerBilanEnergie();          	
            }

        }
        // Statistic
        var energieSolaire,
        	  afficherResultat = function() {
        		$("#input_energieParPanneaux").val(energieSolaire.EnergieParPanneau);
        		$("#input_nombreDePanneaux").val(energieSolaire.NbPanneau);        		
				    $("#input_totalEnergie").val(energieSolaire.TotalEnergie);
	        	$("#output_energieConsomme").val(energieSolaire.EnergieConsomme);
	        	$("#output_bilan").val(energieSolaire.EnergieBilan);
        	},
        	valideFloat = function(val) {
        		return isNaN(parseFloat(val))? false : true;       		
        	};

        $("#button_calculer").click(function() {
        	var energieParPanneaux = $("#input_energieParPanneaux").val(),
        		  nombreDePanneaux = $("#input_nombreDePanneaux").val(),
        		  tv = $("#input_tv").val(),
        		  radio = $("#input_radio").val(),
        		  pompe = $("#input_pompe").val(),
        		  eclairage = $("#input_eclairage").val();

        	if (valideFloat(energieParPanneaux) && 
        	    valideFloat(tv) &&
        	    valideFloat(radio) &&
        	    valideFloat(pompe) &&
        	    valideFloat(eclairage)) {
        		  energieSolaire = new EnergieSolaire(energieParPanneaux,
        											nombreDePanneaux,
        											tv,
        											radio,
        											pompe,
        											eclairage);
        		  afficherResultat();
        	}
        	else       		
        		alert("Assurez-vous que toutes les entrées sont en format correct!")
        });
        // Optimization
        $("#button_optimiser").click(function() {
        	if($("input[name='opt_radio']:checked").val() === "NbPanneauxSolaires")
        		energieSolaire.optimiserNbPanneaux();
        	else
        		energieSolaire.optimiserEnergieParPanneau();

        	afficherResultat();
        });

        // Prevent from form submitting
        $("#formulaire").submit(function () {
    		return false;
		});

      };	// end window.onload
  })();	// end global function 