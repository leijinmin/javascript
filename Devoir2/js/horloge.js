// Préparation des dossiers necessaires
(function() {
  // Ajouter jquery dans le contexte
  var script = document.createElement('script'),
      sibling = document.getElementsByTagName('script')[0]; 
      parent = sibling.parentElement;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
      script.type = 'text/javascript';
      parent.insertBefore(script,sibling); 

      window.onload = function(){
        
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
              else console.log("Alarme à : " + this.HeureAChaine(this.heureAlarme));
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
         
         // Lire donnée de musique. 
         // Mais pour tirer les données sauvegardées sur le disque, 
         // on a besoin d'exécuter le programme sur le serveur.
         // $.getJSON( "data2.json", function(json) {  

            (function(json) {
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
          })({
                "son":true,
                "id":"span_horloge",
                "alarme":
                [
                  {"nom":"relaxing_alarm_sky", "path":"mp3/relaxing_alarm_sky.mp3"},
                  {"nom":"morning_alarm", "path":"mp3/morning_alarm.mp3"},
                  {"nom":"mountain_stream", "path":"mp3/mountain_stream.mp3"},
                  {"nom":"piano_beat_mix", "path":"mp3/piano_beat_mix.mp3"}
                ]
            }); // end function(json)
        
        //  });// end $.getJSON(...)   

       }; // end window.onload
        
})(); // end global function 








