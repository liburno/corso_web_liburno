# Corso Web: ~5. pubblicazione~ 
:a:tito

Lo scopo del presente capitolo è quello di portare il nostro server verso l'esterno con un indirizzo e un dns pubblico.

### DNS pubblico.

Il primo passo per un DNS pubblico è cercare un dominio valido (un bel nome) e registrarlo con un gestore di domini che abbia queste caratteristiche:

- costi poco
- permetta la gestione dei dns;
- permetta, una volta registrato il sito di creare n sottodomini.

La mia scelta per questo è stata [godaddy](www.godaddy.com), dove posso registrare un dominio per meno di 10€ l'anno. Il sito richiede una carta di credito e propone il pagamento per 2 anni rinnovabile automaticamente. Preferisco i domini `.com`, ma in realtà posso fare come mi pare. Individuato il dominio che mi interessa procedo alla registrazione, senza nessun optional tra quelli proposti. 

Ora, se non ho particolari esigenze potrò facilmente pubblicare come sottodomini di questo indirizzo tutti i server che vorrò utilizzare

Io ho registrato il dominio di questo sito "CROSWIL" per cui sono in grado di gestire sia il sito
- www.croswil.com

sia tutti i sottodomini nella forma:
- [xxx].crosswil.com

nel mio caso, avendo già utilizzato altri sottodomini in questo dominio  scelgo un nuovo nome: `test.croswil.com`. Vado nella pagina di gestone dei DNS del sito e aggiungo una riga:

Opzione | Valore
-|-
Tipo|`CNAME`
Host|`test`
value|`ec2-xx-xx-xx-xx.eu-central-1.compute.amazonaws.com`
ttl|`1 ora`

Provo a spiegarei questi valori: 
- `CNAME` ci da la possibilità di identificare il sito con l'indirizzo pubblico che aws mette a disposizione. Nella console di AWS questo indirizzo è evidente, ed è indicato come l'indirizzo pubblico del sistema.
- `test` è il nome del sottodominio che porterà l'accesso a test.croswil.com
- `value` è il valore dell'indirizzo che mette a disposizione aws
- `ttl` indica dopo quando si potrà avere a disposizione. Generalmente una volta scritto e salvato il record è quasi immediatamente disponibile e ci lascia praticamente tempo di eseguire tutte le procedure successive.


### NGINX

Installiamo **nginx** per una maggior controllo sul nostro server. 

Si tratta di un prodotto che può fare tante cose, ma sarà utilizzato principalmente come semplice proxy per reindirizzare il le richieste esterne verso le applicazioni nodejs.

Per capire un po' di che si tratta possiamo considerare nginx il competitor di **Apache**, il server web storico di linux e **iis**, quello di Windows, pur essendo a volte usato anche in unione con questi.

La pagina [wiki](https://it.wikipedia.org/wiki/Nginx) ne da in qualche modo una descrizione più precisa: "è un web server/reverse proxy leggero ad alte prestazioni". Per lo scopo di questo tutorial diremo solo che sarà lo strumento in cui in remoto porteremo il nostro sito dalla porta 3000, a un indirizzo http o https pubblico.

Le operazioni di seguito vanno eseguite da un terminale sul server `R65` . Per prima cosa installiamo il pacchetto.


```bash
  # sul server R65
  sudo apt-get install nginx
```

Procediamo poi con la configurazione. Editiamo il file:

```bash
  sudo nano /etc/nginx/sites-available/default
```

e inseriamo le parti evidenziate. Il file continene diverse righe di commento e istruzione alla configurazione che possiamo tenere o cancellare. 

Dopo aver rimosso le righe non commentate: configuriamo nginx come proxy:

```
server {
  server_name test.croswil.com;
  location / {
      proxy_pass http://localhost:3000;  
  }
  listen 80;
  listen [::]:80;
}
```

e salviamo. Abbiamo sostanzialmente detto che tutte le richieste che arrivano dall'esterno sulla porta 80 (HTTP) per il sito test.croswil.com, siano indirizzate a http://localhost:3000. Sarebbe possibile creare il sito anche come subfolder, impostando una location diversa da `/`, ma preferisco utilizzare i sottodomini.

Salviamo il file e sulla bash digitiamo il comando:

```bash
   sudo /etc/init.d/nginx start # start,stop,reload
```
Questo comando avvia il server nginx. Al posto di start possono essere date le opzioni di stop per fermarlo e di reload per farlo ripartire dopo qualche modifica alla configurazione.

Assicuriamoci di avere il server node in esecuzione e a questo punto siamo in grado di interrogarlo dall'esterno con l'indirizzo 

http://test.croswil.com


### certificati

Il nostro server ora funziona con http, ma vogliamo utilizzare https, per questo servono dei certificati. GoDaddy proponeva di acquistare i certificati del sito ma noi abbiamo declinato perchè è possibile ottenere i certificati https gratuitamente e in modo semplice.

Installiamo pertanto [certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx). Le istruzioni per l'installazione sono nel sito e prendiamo quello per il nostro sistema operativo (ubuntu 18.04), in caso sono le stesse anche per il raspberry con raspbian.

Da bash scriviamo:

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update

```

Con questo abbiamo collegato i repository universe e certbot a quelli conosciuti da linux. procediamo quindi con l'installazione dei pacchetti.

```bash
    sudo apt-get install certbot python-certbot-nginx
```

e quindi provvediamo a certificare il sito. per altri server utilizzeremo solo i comandi da qui in poi.

```
sudo certbot --nginx
```

La prima volta certbot chiede un indirizzo di email valido per comunicare eventuali scadenze per i rinnovi, e una seria di conferme per la privacy. 

Poi fa vedere una lista dei siti registrati sul server e scegliamo quello quello che ci interessa. Come ultima domanda ci chiede se vogliamo reindirizzare tutte le richieste http su https. confermiamo con l'opzione (2)

> certbot ha anche modificato automaticamente la configurazione che avevamo scritto nel file di configurazione nginx proviamo a vederla con il comando `sudo nano /etc/nginx/sites-available/default`.



### riavvio automatico e per manutenzione

Voglio creare uno script che mi aiuti a riavviare automaticamente il server in caso di interruzione e manutenzione.

in caso di riavvio in questo momento dovremo attivare la console e rieseguire il comando `node server &`. inoltre, se dovessimo modificare il server stesso dovremo avere un modo semplice per fare ripartire il tutto.

ci avvaliamo pertanto dell'utility `certbot`

Prima però creiamo un file batch di riavvio. nella cartella ~/sites editiamo restartnode

```bash
cd ~/sites
nano restartnode
```

e scriviamo

```bash
#!/bin/bash

cd ~/sites/test
node server &           # 3000 test.liburno.com
```

dopo aver salvato il file ne cambiamo gli attributi e lo proviamo:

```bash
cd ~/sites           # sposta sulla directory se non c'era già
chmod +x restartnode # cambia gli attributi del file in esecuzione

# ogni volta che devo riavviare manualmente i server
sudo pkill node      # cancella tutti i processi node 
./restartnode        # .. e li riavvia.
```

Per me, risulta molto comodo avere questo file batch di riavvio, soprattutto quando i progetti si moltiplicano e devo ricordare a che porte sono legati uno per uno. Il batch fa in questo modo un doppio servizio. Riavvia contemporaneamete tutti i progetti node e tiene traccia delle porte e degli indirizzi assegnati ad ognuno. su una macchina dove tengo 20/30 siti diversi (progetti node) questo file è impagabile.

Con `sudo pkill node` interrompiamo immediatamete tutti i processi node in questo momento in esecuzione sulla macchina. E' un po' brutale come metodo, ma secondo me adeguato alla manutenzione. È un po come se facessi un reboot, ma solo di node.

L'ultimo passo è istruire il sistema che al riavvio vogliamo eseguire `./restartnode`

dalla bash scriviamo:

```bash
crontab -e
```

e anche qui, dopo aver rimosso, se lo vogliamo un po di righe di commenti, inseriamo la riga

```
@reboot sh -c "cd ~/sites; ./restartnode"
```

dopo aver salvato proviamo a riavviare il sistema. a riavvio effettuato dovremo poter vedere che il sistema ha riavviato anche il server node 

```bash
ps -e | grep node
```

o, più semplicemente, andiamo sul sito pubblico e vediamo se ancora risponde.

> In questo capitolo abbiamo visto tutti i passi per rendere un server disponibile all'esterno, creando un dns pubblico, utilizzando nginx per il redirect da una porta privata a quella pubblica, abbiamo impostato un certificato HTTPS, e per finire abbiamo automatizzato il riavvio del server. 

>Se non abbiamo bisogno di modificare il server, questo da qui in poi funziona automaticamente e, in caso in interruzioni non programmate si riavvia automaticamente.

>Abbiamo trascurato il raspberry, perchè la procedura per accedere a un ip pubblico con dal normale router di casa è un po' più complessa, utilizzando Dynamic Dns. Questo richiede che il router di casa (e il provider), abbiano previsto questa possibilità.


