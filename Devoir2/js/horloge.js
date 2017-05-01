// Préparation des dossiers necessaires
(function() {
  // Ajouter jquery dans le contexte
  var script = document.createElement('script'),
      sibling = document.getElementsByTagName('script')[0]; 
      parent = sibling.parentElement;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
      script.type = 'text/javascript';
      parent.insertBefore(script,sibling); 

      $(document).ready(function(){
        
         class Horloge {

            constructor(json) {
              this.action = json.son;
              this.element = $("#"+json.id);
              $("body").append("<audio loop autoplay></audio>");
              this.alarme = json.alarme;
              this.on = function(eventType,fn) {
                if(eventType === "alarme" && fn !== undefined)
                  fn();
              };
            }
            // Retourner l'heure à chaine et définir l'heure courrante
            get HeureCourrante() {
              this.heureCourrante = new Date();
              return this.HeureAChaine(this.heureCourrante);
            }

            ProgrammerNouvelleAlarme(heure,minute,seconde) {
              this.heureAlarme = new Date(this.heureCourrante);
              this.heureAlarme.setHours(this.heureAlarme.getHours() + heure,
                                        this.heureAlarme.getMinutes() + minute,
                                        this.heureAlarme.getSeconds() + seconde,0);
              return this.HeureAChaine(this.heureAlarme);
            }

            HeureAChaine(heure) {
              return this.formaterHeure(heure.getHours())  + " : " +
                     this.formaterHeure(heure.getMinutes())+ " : " +
                     this.formaterHeure(heure.getSeconds());
            }

            formaterHeure(i) { 
              return i<10 ? "0" + i : i;
            }

            // Afficher l'heure et faire l'alarme
            AfficherEtAlarmer() {
              this.element.text(this.HeureCourrante);
              if (this.heureAlarme !== undefined && 
                      this.HeureAChaine(this.heureCourrante) === this.HeureAChaine(this.heureAlarme))
                this.on("alarme", this.faireAlarme(this.action));                  
             
            }

            faireAlarme(sonner) {              
              if(sonner) this.jouerAlarme();
              else console.log("Alarme: " + this.HeureAChaine(this.heureAlarme));
              this.heureAlarme = undefined; 
            }

            jouerAlarme() {
              var index = Math.floor(Math.random() * this.alarme.length); 
              $("audio").attr("src",this.alarme[index].path);
            }

            Arreter() { 
              $("audio").attr("src",""); 
              this.heureAlarme = undefined;
            }

          }
         
         // Lire donnée de musique
          $.getJSON( "data2.json", function(json) {

            var horloge = new Horloge(json);

                     
            setInterval(function(){
              horloge.AfficherEtAlarmer();
            },1000);
       
            $('#btn_ajouterAlarme').click(function(){
              if($(this).html() === "Ajouter une alarme")
              {
                            
                heure = $("#select_alarmeHeures option:selected").text();
                minute = $("#select_alarmeMinutes option:selected").text();
                seconde = $("#select_alarmeSecondes option:selected").text();
                
                if(heure>0 || minute>0 ||seconde>0) {
                    $("#alarme h1").html(horloge.ProgrammerNouvelleAlarme(parseInt(heure),
                                                                         parseInt(minute),
                                                                         parseInt(seconde)));
                    $(this).html("Arrêter");
                 }
                else 
                  alert("Choisir le temps à faire l'alarme.");
              }
              else { 
                horloge.Arreter();
                $(this).html("Ajouter une alarme");
              }
            });// end $('#btn_ajouterAlarme').click(...)

          });// end $.getJSON(...)   

      }); // end $(document).ready
        
})(); // end global function 








