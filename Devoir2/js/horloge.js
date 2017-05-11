// Préparation des dossiers necessaires
(function() {
      window.onload = function(){
        
         class Horloge {

            constructor(json) {
              this.audioElement = document.createElement("audio");
              this.audioElement.loop = true;
              this.audioElement.autoplay = true;
              document.getElementsByTagName("body")[0].appendChild(this.audioElement);

              this.action = json.son;
              this.heureElement = document.getElementById(json.id);
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
              this.heureElement.innerText = this.HeureCourrante;
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
              this.audioElement.src = this.alarme[index].path; 
            }

            Arreter() { 
              this.audioElement.src = ""; 
              this.heureAlarme = undefined;
            }

          }
         
         // Lire donnée de musique. 
            (function(json) {
              var horloge = new Horloge(json);
                       
              setInterval(function(){
                horloge.AfficherEtAlarmer();
              },1000);
         
              
              document.getElementById("btn_ajouterAlarme").addEventListener("click", function(){
                if(this.innerText === "Ajouter une alarme")
                {
                              
                  var e = document.getElementById("select_alarmeHeures");
                  heure =  e.options[e.selectedIndex].value
                  e = document.getElementById("select_alarmeMinutes");
                  minute = e.options[e.selectedIndex].value
                  e = document.getElementById("select_alarmeSecondes");
                  seconde =  e.options[e.selectedIndex].value;
                  
                  if(heure>0 || minute>0 ||seconde>0) {
                    document.querySelector("#alarme h1").innerText = horloge.ProgrammerNouvelleAlarme(parseInt(heure),
                                                                            parseInt(minute),
                                                                            parseInt(seconde));

                    this.innerText = "Arrêter";
                   }
                  else 
                    alert("Choisir le temps à faire l'alarme.");
                }
                else { 
                  horloge.Arreter();
                  this.innerText = "Ajouter une alarme";
                }
              });// end  document.getElementById("btn_ajouterAlarme").addEventListener(...)
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

       }; // end window.onload
        
})(); // end global function 








